const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();

// Title Slide
const slide1 = pptx.addSlide();
slide1.addText("Generative Engine Optimization (GEO)", { x: 1, y: 1, w: 8, h: 1, fontSize: 36, bold: true, color: "363636", align: "center" });
slide1.addText("Product Strategy, Market Comparison, and Monetization Roadmap", { x: 1, y: 2, w: 8, h: 1, fontSize: 20, color: "666666", align: "center" });
slide1.addText("An Analytics Platform for the AI Search Era", { x: 1, y: 3, w: 8, h: 1, fontSize: 16, color: "0088CC", align: "center" });

// Slide 2: GEO Product Features
const slide2 = pptx.addSlide();
slide2.addText("GEO Product Features", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "363636" });
slide2.addText([
    { text: "1. Brand Visibility Analytics: ", options: { bold: true } },
    { text: "Measure how often your brand is recommended by LLMs (ChatGPT, Gemini, Claude)." }
], { x: 0.5, y: 1.5, w: 9, h: 0.5, fontSize: 16 });
slide2.addText([
    { text: "2. Hallucination Tracking: ", options: { bold: true } },
    { text: "Identify instances where LLMs state inaccurate information about your products." }
], { x: 0.5, y: 2.2, w: 9, h: 0.5, fontSize: 16 });
slide2.addText([
    { text: "3. Share of Voice (SOV) Metrics: ", options: { bold: true } },
    { text: "Compare your AI search presence against competitors." }
], { x: 0.5, y: 2.9, w: 9, h: 0.5, fontSize: 16 });
slide2.addText([
    { text: "4. Optimization Insights: ", options: { bold: true } },
    { text: "Actionable recommendations on how to adjust content (e.g., adding citations, structuring data) to improve LLM retrieval." }
], { x: 0.5, y: 3.6, w: 9, h: 1.0, fontSize: 16 });

// Slide 3: Market Tool Comparison
const slide3 = pptx.addSlide();
slide3.addText("Market Tool Comparison", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "363636" });

const tableData = [
    [
        { text: "Feature", options: { bold: true, fill: "F2F2F2" } },
        { text: "Our GEO Platform", options: { bold: true, fill: "D9EAD3" } },
        { text: "Traditional SEO (e.g., Ahrefs/SEMrush)", options: { bold: true, fill: "FCE5CD" } },
        { text: "Early GEO Competitors", options: { bold: true, fill: "FCE5CD" } }
    ],
    ["Search Type Focus", "Generative LLMs (ChatGPT, Gemini)", "Traditional Search Engines (Google)", "Niche LLM focus"],
    ["Metric Standard", "LLM Citation Rate, Sentiment", "Keyword Volume, Backlinks", "Basic Mention Count"],
    ["Hallucination Check", "Advanced Contextual Validation", "N/A", "Limited to keyword matching"],
    ["Actionable Insights", "Content Formatting for RAG systems", "HTML Tags, Page Speed", "Varies"]
];
slide3.addTable(tableData, { x: 0.5, y: 1.5, w: 9, colW: [2, 2.5, 2.5, 2], border: { type: "solid", color: "BFBFBF", pt: 1 }, fontSize: 12 });

// Slide 4: Short-term Roadmap (3 Months)
const slide4 = pptx.addSlide();
slide4.addText("Short-term Roadmap (Next 3 Months)", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "363636" });
slide4.addText([
    { text: "Month 1: Foundation & Data Ingestion\n", options: { bold: true, bullet: true } },
    { text: "- Integrate APIs for ChatGPT, Gemini, and Perplexity.\n- Build initial dashboard for tracking brand mentions." },
    { text: "\nMonth 2: Core Analytics Engine\n", options: { bold: true, bullet: true } },
    { text: "- Develop Sentiment Analysis and Citation Rate algorithms.\n- Launch beta testing with 10 design partners." },
    { text: "\nMonth 3: Insights & Reporting\n", options: { bold: true, bullet: true } },
    { text: "- Implement automated weekly reporting for brands.\n- Release initial 'Optimization Recommendations' module." }
], { x: 0.5, y: 1.5, w: 9, h: 3, fontSize: 16 });

// Slide 5: Long-term Roadmap (Up to 1 Year)
const slide5 = pptx.addSlide();
slide5.addText("Long-term Roadmap (Up to 1 Year)", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "363636" });
slide5.addText([
    { text: "Q2: Platform Expansion\n", options: { bold: true, bullet: true } },
    { text: "- Support for visual search LLMs and multi-modal models.\n- Public launch and onboarding automation." },
    { text: "\nQ3: Advanced RAG Optimization Tools\n", options: { bold: true, bullet: true } },
    { text: "- 'What-if' simulation engine: predict how content changes impact LLM outputs.\n- API access for enterprise customers." },
    { text: "\nQ4: AI-Driven Auto-Correction\n", options: { bold: true, bullet: true } },
    { text: "- Direct integration with CMS platforms to suggest real-time changes.\n- Comprehensive 'Truth Layer' for hallucination flagging." }
], { x: 0.5, y: 1.5, w: 9, h: 3, fontSize: 16 });

// Slide 6: Monetization Strategy
const slide6 = pptx.addSlide();
slide6.addText("Monetization Strategy", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28, bold: true, color: "363636" });
slide6.addText([
    { text: "1. Freemium Tier: ", options: { bold: true } },
    { text: "Basic brand mention tracking on a single LLM to drive adoption." }
], { x: 0.5, y: 1.5, w: 9, h: 0.5, fontSize: 16 });
slide6.addText([
    { text: "2. Pro Tier ($99 - $299/mo): ", options: { bold: true } },
    { text: "Multi-LLM tracking, sentiment analysis, and standard optimization insights." }
], { x: 0.5, y: 2.2, w: 9, h: 0.5, fontSize: 16 });
slide6.addText([
    { text: "3. Enterprise Tier (Custom Pricing): ", options: { bold: true } },
    { text: "API access, custom RAG simulations, and dedicated support. Targeted at large agencies and Fortune 500 brands." }
], { x: 0.5, y: 2.9, w: 9, h: 0.5, fontSize: 16 });
slide6.addText([
    { text: "4. Data Licensing: ", options: { bold: true } },
    { text: "Selling aggregated, anonymized trends on LLM search behavior to marketing research firms." }
], { x: 0.5, y: 3.6, w: 9, h: 0.5, fontSize: 16 });


// Save Presentation
pptx.writeFile({ fileName: "GEO_Strategy.pptx" }).then(() => {
    console.log("Created Presentation: GEO_Strategy.pptx");
});
