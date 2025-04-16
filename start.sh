#!/bin/sh

# Wenn Repo bereits vorhanden, nur pullen
if [ -d "sharesub_webapp/.git" ]; then
  echo "🔄 Pulling latest changes..."
  cd sharesub_webapp && git pull
else
  echo "📥 Cloning fresh copy..."
  git clone https://github.com/MinhMTV/sharesub_webapp.git
  cd sharesub_webapp
fi

echo "📦 Installing dependencies..."
npm install

echo "⚙️ Building webapp..."
npm run build

echo "✅ Build erfolgreich. Bereit für Deployment via NGINX-Volume (/app/sharesub_webapp/dist)"
tail -f /dev/null  # Container läuft weiter (du kannst das anpassen)