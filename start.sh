#!/bin/sh

# Klonen oder Pull vom Repo
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

# Optional: statischer Server zum Testen (z. B. mit vite preview)
# echo "🚀 Starting preview server on port 80"
# npx serve -s dist -l 80

# Oder einfach laufend halten für NGINX-Volume-Mount
echo "✅ Build erfolgreich. Bereit für Deployment via NGINX-Volume (/app/sharesub_webapp/dist)"
tail -f /dev/null