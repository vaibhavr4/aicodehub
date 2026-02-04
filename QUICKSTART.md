# Quick Start Guide

Get the AI Interview Platform running in 5 minutes!

## Prerequisites Check

Before starting, verify you have:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Docker Desktop installed and running
- [ ] Git installed

## 1. Clone & Install (2 minutes)

\`\`\`bash
# Clone repository
git clone https://github.com/vaibhavr4/aicodehub.git
cd aicodehub

# Install dependencies
npm install
\`\`\`

## 2. Configure API Keys (1 minute)

Create `.env.local` file:

\`\`\`env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_interview_platform"
JUDGE0_RAPID_API_KEY="your_key"      # Get from rapidapi.com/judge0
OPENAI_API_KEY="sk-..."              # Get from platform.openai.com
ANTHROPIC_API_KEY="sk-ant-..."       # Get from console.anthropic.com
\`\`\`

**Don't have API keys yet?** See [SETUP.md](SETUP.md) for instructions.

## 3. Start Database (30 seconds)

\`\`\`bash
# Start PostgreSQL
docker-compose up -d

# Verify it's running
docker ps
\`\`\`

## 4. Setup Database (1 minute)

\`\`\`bash
# Create tables
npm run db:push

# Add 5 sample problems
npm run db:seed
\`\`\`

## 5. Run Application (30 seconds)

\`\`\`bash
npm run dev
\`\`\`

Open **http://localhost:3000** in your browser! 🎉

## Test the Platform

1. Click **"Browse Problems"**
2. Select **"Two Sum"**
3. Try the editor:
   - Change language (Python → JavaScript)
   - Write some code
   - Click **"Submit"** to run tests
4. Try the AI:
   - Ask: *"How do I approach this problem?"*
   - See streaming response from GPT-4

## Troubleshooting

**Database won't start?**
\`\`\`bash
docker-compose down
docker-compose up -d
\`\`\`

**Port 5432 in use?**
- Stop other PostgreSQL instances
- Or change port in `docker-compose.yml`

**API errors?**
- Check your API keys in `.env.local`
- Ensure billing is set up for OpenAI/Anthropic

## What's Included?

- ✅ 5 coding problems (Easy difficulty)
- ✅ Monaco code editor
- ✅ 5 programming languages
- ✅ Real-time code execution
- ✅ AI assistant (GPT-4 + Claude)
- ✅ Session recording & playback

## Next Steps

- 📖 Read [README.md](README.md) for full features
- 🔧 See [SETUP.md](SETUP.md) for detailed setup
- 📊 Check [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for architecture

## Quick Commands

\`\`\`bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Update database schema
npm run db:seed          # Seed problems
npm run db:studio        # Open Prisma Studio (port 5555)

# Docker
docker-compose up -d     # Start PostgreSQL
docker-compose down      # Stop PostgreSQL
docker-compose logs      # View logs
\`\`\`

## Need Help?

- Check [SETUP.md](SETUP.md) for detailed instructions
- Review [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)
- Open an issue on GitHub

Happy coding! 🚀
