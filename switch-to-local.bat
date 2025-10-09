@echo off
echo Switching back to Local Storage Authentication...
copy index.html index-firebase-backup.html
copy index-local-backup.html index.html
echo.
echo ✅ Switched back to Local Storage Authentication!
echo.
echo This version uses localStorage and works immediately.
echo.
pause