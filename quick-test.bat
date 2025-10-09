@echo off
echo ===============================================
echo Quick Fix: Create Test User and Test Pages
echo ===============================================
echo.

echo Creating test user in localStorage...
echo.

echo Opening index.html for testing...
start index.html

echo.
echo INSTRUCTIONS:
echo 1. Browser akan terbuka dengan index.html
echo 2. Buka Browser Console (F12)
echo 3. Copy paste script berikut:
echo.
echo var testUser = {username: "testuser", email: "test@example.com"};
echo localStorage.setItem('bukuSakuUser', JSON.stringify(testUser));
echo console.log("Test user created!");
echo.
echo 4. Setelah itu buka halaman prosedur2.html, rostercuti2.html, dll
echo 5. Halaman tidak akan redirect lagi!
echo.
echo ===============================================

pause