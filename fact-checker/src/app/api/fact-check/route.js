import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { search } from 'duck-duck-scrape';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Extract text from PDF buffer using pdf2json (pure Node.js, no canvas/DOM deps)
async function extractTextFromPDF(buffer) {
  const PDFParser = require('pdf2json');
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);
    pdfParser.on('pdfParser_dataError', (err) => reject(err.parserError));
    pdfParser.on('pdfParser_dataReady', () => {
      resolve(pdfParser.getRawTextContent());
    });
    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const geminiKey = formData.get('geminiKey') || process.env.GEMINI_API_KEY;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!geminiKey) {
      return NextResponse.json({ error: 'Gemini API Key missing. Please provide a Google Gemini API Key.' }, { status: 400 });
    }

    // Read PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const text = await extractTextFromPDF(buffer);

    // Use OpenAI client with Gemini API via OpenAI compatibility layer
    const openai = new OpenAI({
      apiKey: geminiKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
    });
    const modelName = 'gemini-2.5-flash';

    // 1. Extract Claims
    const extractPrompt = `
You are a factual claim extractor. Read the following text extracted from a PDF and identify all objective claims that can be fact-checked. 
Focus on statistics, dates, financial figures, technical numbers, and definitive statements.
Return ONLY a JSON array of strings, where each string is a distinct claim. Do not include markdown blocks.
Limit to top 5 most important claims to save time.

Text:
${text.substring(0, 5000)}
`;

    const extractResponse = await openai.chat.completions.create({
      model: modelName,
      messages: [{ role: 'user', content: extractPrompt }],
      response_format: { type: 'json_object' }
    });

    let claims = [];
    try {
      let content = extractResponse.choices[0].message.content;
      content = content.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(content);
      claims = Array.isArray(parsed) ? parsed : (parsed.claims || Object.values(parsed));
    } catch (e) {
      console.error('Failed to parse claims:', e);
      return NextResponse.json({ error: 'Failed to extract claims from document.' }, { status: 500 });
    }

    // 2. Verify Claims via Web Search
    const results = [];
    for (const claim of claims) {
      try {
        const searchResults = await search(claim, { safeSearch: 'moderate' });

        let searchContext = '';
        let url = '';
        if (searchResults && searchResults.results && searchResults.results.length > 0) {
          const topResults = searchResults.results.slice(0, 3);
          searchContext = topResults.map(r => `Source (${r.url}): ${r.description}`).join('\n\n');
          url = topResults[0].url;
        } else {
          searchContext = 'No web search results found for this claim.';
        }

        // 3. Evaluate Claim vs Search Context
        const evalPrompt = `
You are an expert fact-checker. You are given a CLAIM extracted from a document, and web SEARCH_RESULTS related to that claim.
Your task is to determine if the claim is 'Verified', 'Inaccurate', or 'False'.
- Verified: The search results contain evidence supporting the claim.
- Inaccurate: The search results show the claim is outdated, partially wrong, or exaggerated.
- False: The search results directly contradict the claim, or there is absolutely no evidence.

CLAIM: "${claim}"

SEARCH_RESULTS:
${searchContext}

Return ONLY a JSON object with the following structure:
{
  "status": "Verified" | "Inaccurate" | "False",
  "rationale": "A 1-2 sentence explanation of your decision based on the search results."
}
`;

        const evalResponse = await openai.chat.completions.create({
          model: modelName,
          messages: [{ role: 'user', content: evalPrompt }],
          response_format: { type: 'json_object' }
        });

        let evalResult;
        try {
          let content = evalResponse.choices[0].message.content;
          content = content.replace(/```json/g, '').replace(/```/g, '').trim();
          evalResult = JSON.parse(content);
        } catch (e) {
          evalResult = { status: 'Inaccurate', rationale: 'Could not parse evaluation.' };
        }

        results.push({
          claim,
          status: evalResult.status,
          rationale: evalResult.rationale,
          url: url || 'No source found'
        });

      } catch (err) {
        console.error('Error processing claim:', claim, err);
        results.push({
          claim,
          status: 'Error',
          rationale: 'Failed to verify due to a server error.',
          url: ''
        });
      }
    }

    return NextResponse.json({ results });

  } catch (error) {
    console.error('Fact-check API Error:', error);
    return NextResponse.json({ error: error.message || 'An error occurred during fact-checking' }, { status: 500 });
  }
}
