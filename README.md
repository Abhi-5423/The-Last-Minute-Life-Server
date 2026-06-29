# Last Minute Life API

Backend-only REST API for the Last Minute Life gaming server website.

## Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Helmet, CORS, and rate limiting
- Swagger/OpenAPI documentation
- Winston and Morgan logging

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example` and set secure values.

3. Start the API:

```bash
npm run dev
```

In development, `MONGODB_REQUIRED=false` lets the API boot even if local MongoDB is not running, which is useful for checking `/health` and `/api-docs`. Database-backed routes still need MongoDB.

## API

- Health check: `GET /health`
- Swagger docs: `GET /api-docs`
- API root: `/api`

Admin-only write routes require a JWT for a user whose `role` is `admin`.

To create the first admin, set `ADMIN_USERNAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `.env`, then run:

```bash
npm run create-admin
```

## Deploy To Render

This repo includes `render.yaml` for Render Blueprint deploys.

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
