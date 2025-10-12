@echo off
echo ===============================================
echo Firebase Storage Rules Deployment
echo ===============================================
echo.

echo INSTRUCTIONS untuk deploy Firebase Storage Rules:
echo 1. Buka Firebase Console: https://console.firebase.google.com/project/buku-saku-instruktur/storage/rules
echo 2. Copy paste rules berikut ke editor:
echo.

type storage.rules

echo.
echo 3. Klik "Publish" untuk deploy rules
echo.
echo ===============================================

echo.
echo Juga pastikan Firestore rules sudah di-deploy:
echo https://console.firebase.google.com/project/buku-saku-instruktur/firestore/rules
echo.

pause

start https://console.firebase.google.com/project/buku-saku-instruktur/storage/rules