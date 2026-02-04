# AI-Era Coding Interview Platform

An AI-powered coding interview practice platform with real-time code execution and AI assistance.

## Features

- **Code Editor**: Monaco Editor with support for Python, JavaScript, Java, C++, and Go
- **Code Execution**: Real-time code execution via Judge0 API
- **AI Assistance**: Integrated OpenAI GPT-4 and Claude 3.5 for coding help
- **Session Recording**: Track all code changes, submissions, and AI interactions
- **Session Playback**: Review your problem-solving journey
- **25-30 Problems**: Curated coding problems across Easy, Medium, and Hard difficulties

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: shadcn/ui, Tailwind CSS
- **Editor**: Monaco Editor
- **Database**: PostgreSQL + Prisma ORM
- **Code Execution**: Judge0 RapidAPI
- **AI**: OpenAI SDK + Anthropic SDK

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Judge0 RapidAPI key
- OpenAI API key
- Anthropic API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/vaibhavr4/aicodehub.git
cd aicodehub
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a \`.env.local\` file with:
\`\`\`
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_interview_platform"
JUDGE0_RAPID_API_KEY="your_key_here"
OPENAI_API_KEY="your_key_here"
ANTHROPIC_API_KEY="your_key_here"
\`\`\`

4. Start PostgreSQL:
\`\`\`bash
docker-compose up -d
\`\`\`

5. Set up the database:
\`\`\`bash
npm run db:push
npm run db:seed
\`\`\`

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
ai-interview-platform/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── problems/          # Problem pages
│   └── sessions/          # Session playback
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── editor/           # Monaco editor
│   ├── ai/               # AI chat interface
│   └── problem/          # Problem display
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Database client
│   ├── judge0.ts         # Judge0 API client
│   └── ai/               # AI clients
├── prisma/               # Database schema and migrations
└── types/                # TypeScript type definitions
\`\`\`

## Database Commands

- \`npm run db:push\` - Push schema to database
- \`npm run db:seed\` - Seed database with problems
- \`npm run db:studio\` - Open Prisma Studio

## Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## License

MIT
