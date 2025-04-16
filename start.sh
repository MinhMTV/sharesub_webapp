#!/bin/sh

REPO_URL="https://github.com/MinhMTV/sharesub_webapp.git"
FOLDER="sharesub_webapp"

# Ordner ohne .git = löschen
if [ -d "$FOLDER" ] && [ ! -d "$FOLDER/.git" ]; then
  echo "⚠️ Ordner existiert ohne Git – wird gelöscht..."
  rm -rf "$FOLDER"
fi

# Pull oder Clone
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

echo "🚀 Starte Webserver auf Port 80..."
npx serve -s dist -l 80