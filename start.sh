#!/bin/sh
set -e

# Start the backend service
cd backend
npm start &

# Start the frontend service
cd ../frontend
npm run preview
