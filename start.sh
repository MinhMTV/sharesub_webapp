#!/bin/sh

REPO_URL="https://github.com/MinhMTV/sharesub_webapp.git"
FOLDER="sharesub_webapp"

# Wenn Ordner existiert, aber KEIN gültiges Git-Repo → löschen
if [ -d "$FOLDER" ] && [ ! -d "$FOLDER/.git" ]; then
  echo "⚠️ Ordner existiert ohne Git – wird gelöscht..."
  rm -rf "$FOLDER"
fi

# Wenn Repo bereits vorhanden, nur pullen
if [ -d "$FOLDER/.git" ]; then
  echo "🔄 Pulling latest changes..."
  cd "$FOLDER" && git pull
else
  echo "📥 Cloning fresh copy..."
  git clone "$REPO_URL" "$FOLDER"
  cd "$FOLDER"
fi

echo "📦 Installing dependencies..."
npm install || { echo "❌ npm install fehlgeschlagen!"; exit 1; }

echo "⚙️ Building webapp..."
npm run build || { echo "❌ Build fehlgeschlagen!"; exit 1; }

echo "✅ Build erfolgreich. Bereit für Deployment via NGINX-Volume (/app/sharesub_webapp/dist)"
tail -f /dev/null