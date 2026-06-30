# Last Minute Life Server

Modern full-stack web application for last-minute decisions, urgent services, and AI-assisted recommendations.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Helmet, CORS, and rate limiting
- Swagger/OpenAPI documentation
- Winston and Morgan logging

## Features

- Responsive landing page with modern navigation and hero section
- AI Assistant page for situations like finding hospitals, hotels, transport, medicine, or food
- Simulated AI recommendations when no API key is configured
- OpenAI-compatible API hook for future model integration
- Ranked recommendations scored by price, distance, rating, and availability
- Dashboard with recent searches, saved recommendations, and favorite services
- Dark/light mode
- Reusable React components and sample JSON data
- Express API with `/api/assistant/services` and `/api/assistant/recommendations`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example` and set secure values.

3. Start the full app:

```bash
npm run dev
```

This starts:

- Next.js frontend: `http://localhost:3000`
- Express API: `http://localhost:5000`

In development, `MONGODB_REQUIRED=false` lets the API boot even if local MongoDB is not running, which is useful for checking `/health`, `/api-docs`, and the sample assistant endpoints. Database-backed routes still need MongoDB.

## Environment Variables

```text
MONGODB_URI=mongodb://127.0.0.1:27017/last_minute_life
MONGODB_REQUIRED=false
JWT_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
AI_API_KEY=
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

If `AI_API_KEY` is empty, the app uses the local simulated scoring engine.

## API

- Health check: `GET /health`
- Swagger docs: `GET /api-docs`
- API root: `/api`
- Sample services: `GET /api/assistant/services`
- AI recommendations: `POST /api/assistant/recommendations`

Admin-only write routes require a JWT for a user whose `role` is `admin`.

To create the first admin, set `ADMIN_USERNAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `.env`, then run:

```bash
npm run create-admin
```

## Deploy To Render

This repo includes `render.yaml` for Render Blueprint deploys of the Express API. Deploy the Next.js frontend as a separate Render static/site service or Vercel app if you want production frontend hosting.

1. Create a MongoDB Atlas database and copy its connection string.
2. In Render, choose **New > Blueprint** and connect this GitHub repo.
3. When Render prompts for `MONGODB_URI`, paste the MongoDB Atlas connection string.
4. Render generates `JWT_SECRET` automatically and deploys with `npm install` and `npm start`.

The deployed service uses `/health` as its health check and serves Swagger docs at `/api-docs`.

### Manual Render Deploy

If you create a Render **Web Service** manually instead of using the Blueprint flow, add these environment variables in **Environment** before deploying:

| Key | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `MONGODB_REQUIRED` | `true` |
| `MONGODB_URI` | Your MongoDB Atlas connection string starting with `mongodb+srv://` |
| `JWT_SECRET` | A long random secret |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | `*` or your frontend URL |
| `RATE_LIMIT_WINDOW_MS` | `900000` |
| `RATE_LIMIT_MAX` | `100` |

Use `npm install` as the build command and `npm start` as the start command.

Example MongoDB Atlas URI format:

```text
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/last_minute_life?retryWrites=true&w=majority
```

Do not use `localhost`, angle brackets, placeholder text, or a URI without `mongodb://` / `mongodb+srv://` on Render.
