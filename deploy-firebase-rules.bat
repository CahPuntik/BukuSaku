@echo off
echo ========================================
echo 🚀 Deploy Firebase Rules
echo ========================================
echo.
echo Project: buku-saku-instruktur
echo.

echo 📁 Checking if Firebase CLI is installed...
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI not found!
    echo Please install Firebase CLI:
    echo npm install -g firebase-tools
    echo.
    pause
    exit /b 1
)

echo ✅ Firebase CLI found
echo.

echo 🔐 Login to Firebase...
firebase login

echo.
echo 📂 Initializing Firebase project...
firebase use buku-saku-instruktur

echo.
echo 📋 Deploying Firestore rules...
firebase deploy --only firestore:rules

echo.
echo 🗄️ Deploying Storage rules...
firebase deploy --only storage

echo.
echo ✅ Deployment completed!
echo.
echo 🧪 You can now test the upload at:
echo file:///d:/Folder%%20Coding/Buku%%20saku/test-firebase-storage.html
echo.
pause