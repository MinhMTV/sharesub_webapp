FROM node:20-alpine

WORKDIR /app

# Git und Serve installieren
RUN apk add --no-cache git
RUN npm install -g serve

# Startskript kopieren
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]