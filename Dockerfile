FROM node:20-alpine

WORKDIR /app

# Git und Abhängigkeiten
RUN apk add --no-cache git

# Start-Skript kopieren
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]