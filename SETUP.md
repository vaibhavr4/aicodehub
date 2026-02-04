# Setup Guide - AI Interview Platform

This guide will help you set up the AI Interview Platform from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **npm** or **yarn** (comes with Node.js)
3. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
4. **Git** - [Download here](https://git-scm.com/)

## API Keys Required

You'll need to sign up for the following services and get API keys:

1. **Judge0 RapidAPI** - For code execution
   - Go to [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)
   - Subscribe to the free tier (50 requests/day) or paid plan
   - Copy your RapidAPI key

2. **OpenAI** - For GPT-4 AI assistance
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Create an account and add payment method
   - Generate an API key from the API keys section

3. **Anthropic** - For Claude AI assistance
   - Go to [Anthropic Console](https://console.anthropic.com/)
   - Create an account
   - Generate an API key

## Installation Steps

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/vaibhavr4/aicodehub.git
cd aicodehub
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

This will install all required packages including:
- Next.js 15
- React 19
- Prisma
- Monaco Editor
- OpenAI SDK
- Anthropic SDK
- shadcn/ui components

### 3. Set Up Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`bash
# Copy the template
cp .env.local.example .env.local
\`\`\`

Edit \`.env.local\` and add your API keys:

\`\`\`
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_interview_platform"
JUDGE0_RAPID_API_KEY="your_rapidapi_key_here"
OPENAI_API_KEY="sk-your_openai_key_here"
ANTHROPIC_API_KEY="sk-ant-your_anthropic_key_here"
\`\`\`

### 4. Start PostgreSQL Database

Make sure Docker Desktop is running, then:

\`\`\`bash
docker-compose up -d
\`\`\`

This will:
- Pull the PostgreSQL 16 Alpine image
- Create a container named \`ai_interview_postgres\`
- Expose port 5432
- Create a volume for persistent data

Verify the database is running:

\`\`\`bash
docker ps
\`\`\`

You should see the \`ai_interview_postgres\` container.

### 5. Set Up the Database Schema

Push the Prisma schema to the database:

\`\`\`bash
npm run db:push
\`\`\`

This creates all tables:
- Problem
- TestCase
- Session
- Submission
- AIInteraction
- SessionEvent

### 6. Seed the Database

Populate the database with initial problems:

\`\`\`bash
npm run db:seed
\`\`\`

This adds 5 starter problems:
1. Two Sum (Easy)
2. Reverse String (Easy)
3. Valid Parentheses (Easy)
4. Binary Search (Easy)
5. FizzBuzz (Easy)

### 7. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at:
- **Frontend**: http://localhost:3000
- **Database**: localhost:5432

### 8. Verify Installation

1. Open http://localhost:3000
2. Click "Browse Problems"
3. Select a problem
4. Try:
   - Changing the programming language
   - Writing code in the editor
   - Submitting code to run tests
   - Asking the AI assistant for help

## Database Management

### View Database with Prisma Studio

\`\`\`bash
npm run db:studio
\`\`\`

Opens Prisma Studio at http://localhost:5555 where you can:
- View all tables
- Edit data
- Run queries

### Reset Database

To reset the database and reseed:

\`\`\`bash
npm run db:push -- --force-reset
npm run db:seed
\`\`\`

### Stop PostgreSQL

\`\`\`bash
docker-compose down
\`\`\`

To also remove the data volume:

\`\`\`bash
docker-compose down -v
\`\`\`

## Troubleshooting

### Docker Issues

**Error: Cannot connect to Docker daemon**
- Make sure Docker Desktop is running
- On Windows, ensure WSL 2 is enabled

**Port 5432 already in use**
- Another PostgreSQL instance is running
- Change the port in \`docker-compose.yml\` and \`.env.local\`

### Database Issues

**Error: Can't reach database server**
- Check if PostgreSQL container is running: \`docker ps\`
- Verify DATABASE_URL in \`.env.local\`
- Try restarting the container: \`docker-compose restart\`

**Prisma schema errors**
- Delete \`node_modules/.prisma\` and run \`npx prisma generate\`

### API Key Issues

**Judge0 errors**
- Verify your RapidAPI key is correct
- Check you haven't exceeded rate limits
- Ensure you're subscribed to Judge0 CE on RapidAPI

**OpenAI/Anthropic errors**
- Check API keys are valid
- Ensure billing is set up
- Verify you have available credits

### Build Issues

**Module not found errors**
- Delete \`node_modules\` and \`package-lock.json\`
- Run \`npm install\` again

**TypeScript errors**
- Run \`npx tsc --noEmit\` to check for type errors
- Ensure all \`@types\` packages are installed

## Next Steps

1. **Add More Problems**: Edit \`prisma/seed.ts\` to add more coding problems
2. **Customize UI**: Modify components in \`components/\`
3. **Deploy**: Follow the deployment guide in README.md

## Getting Help

- Check the main [README.md](README.md) for features and architecture
- Review the plan in the project root
- Open an issue on GitHub

## Development Commands

\`\`\`bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server

# Database
npm run db:push            # Push schema changes
npm run db:seed            # Seed database
npm run db:studio          # Open Prisma Studio

# Code Quality
npm run lint               # Run ESLint
\`\`\`
