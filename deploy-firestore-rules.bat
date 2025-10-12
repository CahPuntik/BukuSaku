@echo off
echo ===============================================
echo Firebase Firestore Rules Deployment
echo ===============================================
echo.

echo INSTRUCTIONS:
echo 1. Buka Firebase Console: https://console.firebase.google.com/project/buku-saku-instruktur/firestore/rules
echo 2. Copy paste rules berikut ke editor:
echo.
echo.

type firestore.rules

echo.
echo.
echo 3. Klik "Publish" untuk deploy rules
echo 4. Rules akan aktif dalam beberapa menit
echo.
echo Alternative: Install Firebase CLI dan jalankan "firebase deploy --only firestore:rules"
echo.
echo ===============================================

pause