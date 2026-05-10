# Fact-Check Agent ("Truth Layer")

This is an automated fact-checking web application built with Next.js, React, and TailwindCSS. It extracts claims from a PDF document, searches the live web for evidence, and categorizes each claim as Verified, Inaccurate, or False.

## Local Setup

1. Make sure you have Node.js installed.
2. Clone this repository and navigate to this folder.
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Create a \`.env.local\` file in the root of the project with your AI API Key:
   \`\`\`env
   OPENAI_API_KEY="sk-..."
   GEMINI_API_KEY="AIzaSy..."
   \`\`\`
   *(Alternatively, you can input your API key directly in the web UI).*
5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel (Mandatory)

To meet the requirement of a live, deployed URL:

1. Push this entire project folder to a repository on your GitHub account.
2. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
3. Click "Add New..." -> "Project".
4. Import your GitHub repository.
5. In the Environment Variables section, you can add \`OPENAI_API_KEY\` or \`GEMINI_API_KEY\` if you want to hardcode it, or leave it blank to require users to enter it in the UI.
6. Click "Deploy".
7. Once deployed, Vercel will provide you with a live URL (e.g., \`https://fact-check-agent.vercel.app\`).

## How it Works
1. **Extraction:** \`pdf-parse\` reads the text. The LLM extracts the top claims.
2. **Verification:** \`duck-duck-scrape\` searches the web for live context.
3. **Evaluation:** The LLM cross-references the web results and outputs a rationale and status.
