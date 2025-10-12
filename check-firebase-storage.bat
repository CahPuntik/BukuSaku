@echo off
echo ===============================================
echo Firebase Storage Configuration Check
echo ===============================================
echo.

echo Current Firebase Storage Configuration:
echo - Project ID: buku-saku-instruktur
echo - Storage Bucket: gs://buku-saku-instruktur.firebasestorage.app
echo - Folder Path: prosedur_files/
echo.

echo CHECKLIST untuk Firebase Storage:
echo.

echo 1. ✅ Storage Rules (pastikan sudah di-deploy):
echo    https://console.firebase.google.com/project/buku-saku-instruktur/storage/rules
echo.

echo 2. ✅ Firestore Rules (pastikan sudah di-deploy):
echo    https://console.firebase.google.com/project/buku-saku-instruktur/firestore/rules
echo.

echo 3. ✅ Storage Bucket exists:
echo    https://console.firebase.google.com/project/buku-saku-instruktur/storage
echo.

echo 4. ✅ Authentication setup:
echo    https://console.firebase.google.com/project/buku-saku-instruktur/authentication
echo.

echo Rules yang harus di-deploy:
echo.
echo STORAGE RULES:
type storage.rules
echo.
echo.
echo FIRESTORE RULES:
type firestore.rules
echo.

echo ===============================================
echo Jika semua sudah benar, test upload file di aplikasi
echo ===============================================

pause

echo Opening Firebase Console...
start https://console.firebase.google.com/project/buku-saku-instruktur/storage