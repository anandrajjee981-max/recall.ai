# 🧠 Second Brain AI

> Save Once. Find Forever.

Second Brain AI is an intelligent content organization platform that automatically collects, categorizes, and manages everything users save across different platforms using AI.

Instead of manually creating folders like **Shopping**, **Education**, or **Travel**, the system learns from user behavior and dynamically creates personalized libraries.

---

# 🚀 Problem

People save content every day:

- Instagram Posts
- Instagram Reels
- Amazon Products
- YouTube Videos
- LinkedIn Posts
- X (Twitter) Bookmarks
- Browser Bookmarks
- Articles
- PDFs

However, most saved items are never revisited because:

- Everything is scattered
- No intelligent organization
- Manual folders become messy
- Searching saved content is difficult

---

# 💡 Solution

Second Brain AI automatically imports saved content and organizes it using AI.

Workflow:

```
User Saves Content
        │
        ▼
Auto Sync
        │
        ▼
AI Analysis
        │
        ▼
Existing Library?
      /      \
    Yes      No
    │         │
Add Item   Create Library
    │         │
     └────────┘
         ▼
Personal Knowledge Base
```

---

# ✨ Core Features

## Automatic Content Import

The platform collects saved items from supported sources.

Examples:

- Instagram Saved
- Amazon Wishlist
- Browser Extension
- Mobile Share Sheet
- YouTube Watch Later
- Manual URL Save

---

## AI Categorization

AI understands the content instead of relying only on keywords.

Example:

Instagram Save:

```
React Authentication Tutorial
```

↓

```
Education
   └── React
          └── Authentication
```

---

## Dynamic Library Creation (USP)

Unlike traditional bookmark managers, folders are NOT predefined.

Example:

User A

```
Shopping
Fitness
Cars
```

User B

```
Research
Machine Learning
Books
Travel
```

If a category doesn't exist, AI automatically creates it.

---

## Semantic Search

Search naturally.

Examples:

```
Show me that React authentication tutorial.

```

```
Find the shoes I saved last month.

```

```
Show all AI startup posts.

```

---

## AI Summary

Every saved content can have:

- Summary
- Key points
- Tags
- Keywords

---

## Smart Tags

AI generates tags automatically.

Example

```
React
Authentication
JWT
Node.js
Backend
```

---

## Collections

Users can manually pin important collections.

Example

```
Interview Preparation

Startup Ideas

Vacation Planning
```

---

## Dashboard

- Total Saved Items
- Recently Saved
- AI Generated Libraries
- Frequently Viewed
- Search History

---

# 🧠 AI Responsibilities

The AI is responsible for:

- Content Classification
- Library Creation
- Tag Generation
- Duplicate Detection
- Semantic Search
- Content Summarization
- Recommendation Engine (Future)

---

# 🏗 Architecture

```
Frontend
      │
      ▼
API Gateway
      │
      ▼
Backend Server
      │
 ┌────┴────┐
 │         │
 ▼         ▼
Database  AI Service
 │         │
 └────┬────┘
      ▼
Embedding Store
```

---

# 🛠 Tech Stack

## Frontend

- React
- Tailwind CSS
- Redux Toolkit
- React Router
- React Query

---

## Backend

- Node.js
- Express.js
- TypeScript
- REST API

---

## Database

- MongoDB

Stores:

- Users
- Libraries
- Saved Items
- AI Metadata

---

## Authentication

- JWT
- Google OAuth
- GitHub OAuth

---

## AI Stack

### LLM

Possible options:

- OpenAI GPT
- Gemini
- Claude
- Local LLM (Ollama)

---

### Framework

- LangChain

or

- LangGraph (future agent workflows)

---

### Embedding Models

Examples:

- OpenAI Embeddings
- Gemini Embeddings
- BAAI bge
- Nomic Embeddings

---

### Vector Database

Choose one:

- Pinecone
- Qdrant
- Weaviate
- Chroma
- pgvector

Purpose:

Semantic search

---

## Object Storage

For thumbnails/files:

- Cloudinary
- AWS S3

---

# 🤖 AI Pipeline

```
Saved Item

↓

Extract Metadata

↓

Fetch Content

↓

LLM Analysis

↓

Generate Summary

↓

Generate Tags

↓

Check Existing Libraries

↓

If Exists

↓

Insert

Else

↓

Create Library

↓

Save Metadata

↓

Vector Embedding

↓

Ready for Search
```

---

# 🔍 Search Flow

```
User Query

↓

Embedding

↓

Vector Search

↓

Relevant Items

↓

LLM Response

↓

Display Results
```

---

# 📦 Database Collections

```
users
```

```
libraries
```

```
saved_items
```

```
embeddings
```

```
tags
```

```
search_history
```

---

# 📱 Supported Sources (Future)

- Instagram
- Amazon
- YouTube
- LinkedIn
- X
- Reddit
- Chrome Extension
- Firefox Extension
- Edge Extension
- Mobile Share Sheet

---

# 🔒 Security

- JWT Authentication
- OAuth Login
- HTTPS
- Rate Limiting
- Input Validation
- Encryption
- Secure Cookies

---

# 🚀 Future Scope

- AI Chat with Saved Content
- Voice Search
- Automatic Weekly Digest
- Reminder for Forgotten Saves
- Smart Recommendations
- Team Workspaces
- Shared Libraries
- Offline Mode
- Mobile Apps
- Browser Extensions

---

# 🎯 Target Users

- Students
- Developers
- Researchers
- Designers
- Content Creators
- Product Managers
- Entrepreneurs

---

# 📈 Long-Term Vision

Become the personal AI knowledge operating system where every saved piece of information is automatically organized, searchable, and useful instead of being forgotten.