# AI-Era Coding Interview Platform

An AI-powered coding interview practice platform with real-time code execution and AI assistance.

## Features

### Core Functionality
- **Code Editor**: Monaco Editor with support for Python, JavaScript, Java, C++, and Go
- **Code Execution**: Real-time code execution via Judge0 API
- **Session Recording**: Track all code changes, submissions, and AI interactions
- **Session Playback**: Review your problem-solving journey
- **Problem Library**: Curated coding problems across multiple categories and difficulties

### AI-Powered Features
- **AI Chat Assistant**: Get help from Claude Sonnet 4 while solving problems
- **Code Review**: Receive detailed feedback on code quality, bugs, and optimizations
- **Progressive Hints**: 4-level hint system that guides without spoiling solutions
- **Complexity Analysis**: Detailed time and space complexity explanations
- **Alternative Solutions**: Learn different approaches to solve the same problem

### Analytics Dashboard
- **Performance Tracking**: Monitor your progress over time
- **Difficulty Analysis**: Performance breakdown across Easy, Medium, and Hard
- **Category Insights**: Identify strengths and weak areas by problem category
- **AI Usage Statistics**: Track your AI assistant usage patterns
- **Weak Areas Identification**: Get personalized recommendations for improvement

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

## API Endpoints

### Core APIs
- `GET /api/problems` - List all problems
- `GET /api/problems/[id]` - Get problem details
- `POST /api/sessions` - Create practice session
- `POST /api/submit` - Submit code for execution

### AI Feature APIs
- `POST /api/ai/chat` - Chat with AI assistant (streaming)
- `POST /api/ai/review` - Get detailed code review
- `POST /api/ai/hint` - Request progressive hints (levels 1-4)
- `POST /api/ai/complexity` - Analyze time/space complexity
- `POST /api/ai/alternatives` - Get alternative solution approaches

### Analytics
- `GET /api/analytics` - Get comprehensive performance analytics

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
