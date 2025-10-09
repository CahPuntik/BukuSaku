@echo off
echo Switching to Firebase Authentication...
copy index.html index-local-backup.html
copy index-firebase.html index.html
echo.
echo ✅ Switched to Firebase Authentication!
echo.
echo Next steps:
echo 1. Enable Authentication in Firebase Console
echo 2. Go to: https://console.firebase.google.com/project/buku-saku-instruktur/authentication
echo 3. Click "Get started" → "Sign-in method" → "Email/Password" → Enable
echo 4. Test registration and login
echo.
pause