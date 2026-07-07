# Second Brain AI — Backend

## Setup

1. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Create a `.env` file in the root with:
   \`\`\`
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   ANTHROPIC_API_KEY=your_anthropic_key
   OPENAI_API_KEY=your_openai_key
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
   SESSION_SECRET=
   FRONTEND_URL=http://localhost:3000
   EMAIL_HOST=
   EMAIL_PORT=
   EMAIL_USER=
   EMAIL_PASS=
   \`\`\`

3. Run in development:
   \`\`\`
   npm run dev
   \`\`\`

## API Routes

### Auth (`/api/auth`)
- `POST /signup` — create account
- `POST /login` — email/password login
- `POST /refresh` — get new access token via refresh cookie
- `POST /logout` — clear refresh token
- `GET /google`, `GET /github` — OAuth login
- `GET /google/callback`, `GET /github/callback` — OAuth redirect handlers

### Libraries (`/api/libraries`) — requires auth
- `POST /` — create library
- `GET /` — list libraries
- `DELETE /:id` — delete library

### Items (`/api/items`) — requires auth
- `POST /` — manually save item
- `POST /ai-save` — save item with AI categorization
- `GET /?page=&limit=&libraryId=` — list items (paginated)
- `GET /:id` — get single item
- `DELETE /:id` — delete item
- `PATCH /:id/pin` — toggle pin

### Search (`/api/search`) — requires auth
- `POST /` — semantic search
- `GET /history` — recent searches

### Chat (`/api/chat`) — requires auth
- `POST /` — ask a question (RAG over saved items)
- `GET /` — list conversation threads
- `GET /:conversationId` — get full conversation

### Dashboard (`/api/dashboard`) — requires auth
- `GET /` — summary stats

### Admin (`/api/admin`) — requires auth + admin role
- `POST /trigger-digest` — manually send weekly digest
- `POST /trigger-reminder` — manually send forgotten-saves reminder

## Making a user an admin
\`\`\`
node src/scripts/makeAdmin.js someone@example.com
\`\`\`

## Scheduled Jobs
- Weekly digest: every Monday 9:00 AM
- Forgotten saves reminder: every day 10:00 AM