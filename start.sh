#!/bin/sh
set -e

# Install Node.js if not present (for Railway container)
if ! command -v node >/dev/null 2>&1; then
    echo "Installing Node.js..."
    apt-get update && apt-get install -y ca-certificates curl gnupg
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
    apt-get update && apt-get install -y nodejs
fi

# Determine which service to run based on Railway service name
SERVICE="${RAILWAY_SERVICE_NAME:-backend}"

echo "Starting service: $SERVICE"

case "$SERVICE" in
    *backend* | *api* | *server*)
        echo "Starting backend service..."
        cd backend
        npm install
        npm start
        ;;
    *frontend* | *web* | *client*)
        echo "Starting frontend service..."
        cd frontend
        npm install
        npm run preview
        ;;
    *)
        echo "Unknown service: $SERVICE"
        echo "Please set RAILWAY_SERVICE_NAME to include 'backend' or 'frontend'"
        exit 1
        ;;
esac
