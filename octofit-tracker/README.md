# OctoFit Tracker

A modern multi-tier fitness tracking application built with GitHub Copilot Agent Mode.

## Architecture

- **Frontend**: React 19 with Vite (Port 5173)
- **Backend**: Node.js + Express + TypeScript (Port 8000)
- **Database**: MongoDB (Port 27017)

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 Vite application
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/           # Express + TypeScript API server
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── README.md
```

## Setup Instructions

### Frontend Setup
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

To use the Codespaces-hosted backend API, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend uses this variable to build API URLs like:
`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`

### Backend Setup
```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```
The backend API will be available at `http://localhost:8000`

### MongoDB Setup
Ensure MongoDB is running on `mongodb://localhost:27017`

## Features

- React 19 with Vite for fast development and builds
- Express.js REST API with TypeScript support
- MongoDB integration with Mongoose ODM
- CORS enabled for frontend-backend communication
- Environment configuration support

## Development

- Frontend hot reload enabled
- Backend watches TypeScript files for changes
- Both services run independently on their configured ports
