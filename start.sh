#!/bin/sh
set -e

SERVICE="${APP_ROLE:-${RAILWAY_SERVICE_NAME:-backend}}"

case "$SERVICE" in
  backend | api | server)
    cd backend
    exec npm start
    ;;
  frontend | web | client)
    cd frontend
    exec npm run preview
    ;;
  *)
    echo "Unknown service role: \"$SERVICE\""
    echo "Set APP_ROLE (backend|frontend) or rename the Railway service to include \"backend\"/\"frontend\"."
    exit 1
    ;;
esac
