@echo off
echo ===============================================
echo Testing Firebase Authentication Integration
echo ===============================================
echo.

echo Checking which pages have Firebase authentication...
echo.

findstr /M "firebase-app.js" *.html > firebase_pages.tmp
echo Pages with Firebase Auth:
type firebase_pages.tmp
echo.

findstr /M "bukuSakuUser" *.html > localStorage_pages.tmp
echo Pages still using localStorage (should be empty):
type localStorage_pages.tmp
echo.

del firebase_pages.tmp localStorage_pages.tmp 2>nul

echo ===============================================
echo Test Complete
echo ===============================================
pause