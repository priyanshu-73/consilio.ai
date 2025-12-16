# 🤖 Consilio.ai

### AI-Powered Meeting Assistant Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![tRPC](https://img.shields.io/badge/tRPC-11-2596BE?style=flat&logo=trpc)](https://trpc.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat&logo=postgresql)](https://neon.tech/)

**Create AI agents that join your meetings, listen, and provide intelligent summaries**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [API](#-api-documentation)

</div>

---

## 📖 About

Consilio.ai is a next-generation meeting assistant platform that enables you to create custom AI agents to participate in your video meetings. Each agent can be configured with specific instructions, join video calls in real-time, and automatically generate comprehensive meeting summaries powered by GPT-4.

### ✨ Key Features

- 🤖 **Custom AI Agents** - Create and manage multiple AI assistants with personalized instructions
- 🎥 **Real-time Video Meetings** - Powered by Stream.io for high-quality, low-latency video calls
- 🎙️ **Automatic Transcription** - Live transcription with speaker identification
- 📝 **AI-Powered Summaries** - GPT-4 generates comprehensive meeting notes and action items
- ⚡ **Background Processing** - Inngest handles transcript processing asynchronously
- 🔐 **Secure Authentication** - Multiple auth providers (Email/Password, GitHub, Google)
- 📊 **Meeting Management** - Track meeting status, view recordings, and access transcripts

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend
- **API Layer**: [tRPC 11](https://trpc.io/) - End-to-end typesafe APIs
- **Authentication**: [Better-Auth](https://www.better-auth.com/) with Drizzle adapter
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)

### AI & Media
- **Video SDK**: [Stream.io Video](https://getstream.io/video/) - Real-time video infrastructure
- **AI Model**: [OpenAI GPT-4](https://openai.com/) via Inngest Agent Kit
- **Background Jobs**: [Inngest](https://www.inngest.com/) - Durable workflow engine

### Developer Experience
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)
- **Package Manager**: npm

---

## 🏗️ Architecture

```mermaid
graph TD
    A[User] -->|Authentication| B[Better-Auth]
    B -->|Session| C[Next.js App]
    
    C -->|tRPC Calls| D[tRPC Router]
    D -->|Query/Mutation| E[PostgreSQL DB]
    
    C -->|Create Agent| F[Agents Module]
    F -->|Store| E
    
    C -->|Create Meeting| G[Meetings Module]
    G -->|Setup Call| H[Stream.io Video]
    H -->|Webhook Events| I[Webhook Handler]
    
    I -->|Transcription Ready| J[Inngest]
    J -->|Fetch Transcript| H
    J -->|Process with GPT-4| K[OpenAI API]
    K -->|Generate Summary| J
    J -->|Save Summary| E
    
    C -->|Join Call| L[Call Module]
    L -->|Real-time Video| H
    H -->|Agent Joins| M[AI Agent Avatar]
    
    style C fill:#fff,stroke:#333,stroke-width:2px
    style H fill:#005fff,stroke:#003d99,stroke-width:2px,color:#fff
    style K fill:#74aa9c,stroke:#528475,stroke-width:2px
    style E fill:#336791,stroke:#254566,stroke-width:2px,color:#fff
```

### Meeting Lifecycle

1. **Creation**: User creates a meeting and selects an AI agent
2. **Setup**: Stream.io call is initialized with transcription enabled
3. **Active**: Participants join, AI agent joins with avatar
4. **Transcription**: Stream.io transcribes audio with speaker identification
5. **Completion**: Call ends, webhook triggers Inngest workflow
6. **Processing**: Inngest fetches transcript, sends to GPT-4 for summarization
7. **Summary**: AI-generated summary saved to database

---

## 📊 Database Schema

```mermaid
erDiagram
    user ||--o{ agents : creates
    user ||--o{ meetings : hosts
    agents ||--o{ meetings : participates_in
    
    user {
        text id PK
        text name
        text email UK
        boolean emailVerified
        text image
        timestamp createdAt
        timestamp updatedAt
    }
    
    agents {
        text id PK
        text name
        text userId FK
        text instructions
        timestamp createdAt
        timestamp updatedAt
    }
    
    meetings {
        text id PK
        text name
        text userId FK
        text agentId FK
        enum status
        timestamp startedAt
        timestamp endedAt
        text transcriptUrl
        text summary
        text recordingUrl
        timestamp createdAt
        timestamp updatedAt
    }
```

**Meeting Status**: `upcoming` → `active` → `processing` → `completed` / `cancelled`

---

## 🚦 Getting Started

### Prerequisites

- **Node.js** 20+ and npm
- **PostgreSQL** database (recommended: [Neon](https://neon.tech/) for serverless PostgreSQL)
- API Keys for:
  - [Stream.io](https://getstream.io/)
  - [OpenAI](https://platform.openai.com/)
  - [Inngest](https://www.inngest.com/)
  - [GitHub OAuth](https://github.com/settings/developers) (optional)
  - [Google OAuth](https://console.cloud.google.com/) (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/consilio.ai.git
   cd consilio.ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host/database"
   
   # Better-Auth
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   
   # GitHub OAuth (optional)
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Stream.io Video
   NEXT_PUBLIC_STREAM_VIDEO_KEY="your-stream-api-key"
   STREAM_VIDEO_SECRET_KEY="your-stream-secret-key"
   
   # OpenAI
   OPENAI_API_KEY="your-openai-api-key"
   
   # Inngest
   INNGEST_EVENT_KEY="your-inngest-event-key"
   INNGEST_SIGNING_KEY="your-inngest-signing-key"
   ```

4. **Set up the database**
   ```bash
   # Push database schema
   npm run db:push
   
   # (Optional) Open Drizzle Studio to view your database
   npm run db:studio
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development with Webhooks

To test Stream.io webhooks locally, you'll need to expose your local server:

```bash
npm run dev:webhook
```

This uses ngrok to create a public URL for webhook testing.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code linting |
| `npm run db:push` | Push Drizzle schema changes to database |
| `npm run db:studio` | Open Drizzle Studio GUI for database management |
| `npm run dev:webhook` | Start ngrok tunnel for webhook development |

---

## 📁 Project Structure

```
consilio.ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages (sign-in, sign-up)
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── call/              # Video call pages
│   │   └── api/               # API routes (tRPC, webhooks, auth)
│   │
│   ├── components/            # Reusable UI components (shadcn/ui)
│   │
│   ├── modules/               # Feature modules
│   │   ├── agents/           # Agent creation and management
│   │   ├── auth/             # Authentication UI and logic
│   │   ├── call/             # Video call interface
│   │   ├── dashboard/        # Dashboard layout and navigation
│   │   ├── home/             # Home page components
│   │   └── meetings/         # Meeting management and display
│   │
│   ├── db/                    # Database configuration
│   │   ├── schema.ts         # Drizzle ORM schema definitions
│   │   └── index.ts          # Database client instance
│   │
│   ├── trpc/                  # tRPC configuration
│   │   ├── routers/          # tRPC route handlers
│   │   ├── client.ts         # Client-side tRPC setup
│   │   ├── server.ts         # Server-side tRPC setup
│   │   └── init.ts           # tRPC context and middleware
│   │
│   ├── inngest/               # Background job functions
│   │   ├── client.ts         # Inngest client
│   │   └── function.ts       # Meeting processing workflow
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # Better-Auth configuration
│   │   ├── auth-client.ts    # Better-Auth client setup
│   │   ├── stream-video.ts   # Stream.io client
│   │   └── avatar.ts         # Avatar generation utilities
│   │
│   └── hooks/                 # Custom React hooks
│
├── public/                    # Static assets
├── drizzle/                   # Database migrations (generated)
├── drizzle.config.ts         # Drizzle Kit configuration
└── package.json              # Project dependencies and scripts
```

---

## 🔌 API Documentation

### tRPC Endpoints

#### Agents

- **`agents.create`** - Create a new AI agent
  ```typescript
  input: { name: string, instructions: string }
  output: Agent
  ```

- **`agents.update`** - Update an existing agent
  ```typescript
  input: { id: string, name: string, instructions: string }
  output: Agent
  ```

- **`agents.delete`** - Delete an agent
  ```typescript
  input: { id: string }
  output: Agent
  ```

- **`agents.getOne`** - Get a single agent by ID
  ```typescript
  input: { id: string }
  output: Agent & { meetingCount: number }
  ```

- **`agents.getMany`** - List all agents (paginated)
  ```typescript
  input: { page?: number, pageSize?: number, search?: string }
  output: { items: Agent[], total: number, totalPages: number }
  ```

#### Meetings

- **`meetings.create`** - Create a new meeting
  ```typescript
  input: { name: string, agentId: string }
  output: Meeting
  ```

- **`meetings.update`** - Update meeting details
  ```typescript
  input: { id: string, name: string, agentId: string }
  output: Meeting
  ```

- **`meetings.remove`** - Delete a meeting
  ```typescript
  input: { id: string }
  output: Meeting
  ```

- **`meetings.getOne`** - Get meeting with details
  ```typescript
  input: { id: string }
  output: Meeting & { agent: Agent, duration: number }
  ```

- **`meetings.getMany`** - List meetings (paginated, filterable)
  ```typescript
  input: { 
    page?: number, 
    pageSize?: number, 
    search?: string,
    status?: MeetingStatus,
    agentId?: string
  }
  output: { items: Meeting[], total: number, totalPages: number }
  ```

- **`meetings.getTranscript`** - Get meeting transcript with speakers
  ```typescript
  input: { id: string }
  output: TranscriptItem[]
  ```

- **`meetings.generateToken`** - Generate Stream.io user token
  ```typescript
  input: void
  output: string
  ```

---

## 🎯 Key Features Deep Dive

### 1. AI Agent Creation

Create custom AI agents with specific instructions. Each agent:
- Has a unique avatar generated using DiceBear
- Can be assigned to multiple meetings
- Follows custom instructions during interactions
- Appears as a participant in video calls

### 2. Meeting Management

Full lifecycle management:
- **Create**: Set up meetings with selected AI agent
- **Schedule**: Track upcoming meetings
- **Active**: Join real-time video calls
- **Processing**: Automatic transcription and AI analysis
- **Completed**: Access recordings, transcripts, and AI summaries

### 3. Real-time Video Calls

Powered by Stream.io Video SDK:
- High-quality, low-latency video
- Screen sharing capabilities
- Audio/video controls
- AI agent avatar representation
- Automatic recording

### 4. Intelligent Transcription

- Real-time speech-to-text
- Speaker identification (users and AI agents)
- Timestamp tracking
- Searchable transcript viewer

### 5. AI-Powered Summaries

GPT-4 analyzes transcripts to generate:
- Meeting overview
- Key discussion points organized by topic
- Action items and decisions
- Timestamp references
- Structured markdown output

---

## 🚀 Deployment

### Recommended Platform: Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Import your repository in the [Vercel Dashboard](https://vercel.com/new)
   - Configure environment variables
   - Deploy

3. **Set up webhooks**
   - Update Stream.io webhook URL to your production domain
   - Configure Inngest for production environment

### Environment Variables

Ensure all environment variables from `.env.local` are configured in your deployment platform.

### Database Migrations

After deployment, push your database schema:
```bash
npm run db:push
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Style

- Follow TypeScript best practices
- Use ESLint for code linting
- Keep components focused and reusable
- Write meaningful commit messages

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:
- [Next.js](https://nextjs.org/) - React framework
- [Stream.io](https://getstream.io/) - Video infrastructure
- [OpenAI](https://openai.com/) - AI language models
- [Inngest](https://www.inngest.com/) - Background job processing
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Better-Auth](https://www.better-auth.com/) - Authentication

---

<div align="center">

**Made with ❤️ by the Consilio.ai team**

[Report Bug](https://github.com/yourusername/consilio.ai/issues) • [Request Feature](https://github.com/yourusername/consilio.ai/issues)

</div>
