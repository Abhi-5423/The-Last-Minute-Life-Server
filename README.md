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
