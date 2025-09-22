# Buku Saku - PWA Application

Aplikasi web Progressive Web App (PWA) untuk manajemen aktivitas harian dan timeframe dengan fitur offline.

## ✨ Fitur Utama

- **Daily Activity Tracker**: Pencatatan aktivitas harian dengan kolom TC, ID, MD, PD, TR, L, S dan total otomatis
- **Timeframe Management**: Manajemen jadwal training dan timeframe
- **Responsive Design**: Tampilan optimal untuk desktop dan mobile
- **Offline Support**: Berfungsi tanpa koneksi internet dengan service worker
- **Excel Export**: Export data ke format Excel (.xlsx)
- **Data Sync**: Sinkronisasi data dengan Google Apps Script
- **PWA Features**: Dapat diinstall sebagai aplikasi native

## 🚀 Teknologi

- **Frontend**: HTML5, CSS3, Bootstrap 5.3.2, JavaScript
- **Backend**: Google Apps Script API
- **PWA**: Service Worker, Web App Manifest
- **Export**: SheetJS untuk export Excel
- **Storage**: localStorage untuk offline storage

## 📱 Halaman Aplikasi

- `dashboard.html` - Dashboard utama dengan navigasi
- `daily.html` - Tracker aktivitas harian
- `timeframe.html` - Manajemen timeframe
- `rostercuti2.html` - Manajemen roster cuti
- `prosedur2.html` - Prosedur dan panduan
- `preposttest.html` - Pre/post test
- `administrasi.html` - Administrasi
- `index.html` - Halaman login

## 🛠️ Instalasi dan Penggunaan

1. Clone repository ini
2. Buka `dashboard.html` di browser
3. Atau deploy ke hosting web (GitHub Pages, Netlify, dll)

### Untuk Development:

1. Clone repo: `git clone [url-repo]`
2. Buka folder project
3. Jalankan dengan live server atau buka langsung di browser

## 🌐 PWA Installation

Aplikasi ini dapat diinstall sebagai PWA:
1. Buka di browser mobile/desktop
2. Klik "Add to Home Screen" atau "Install App"
3. Aplikasi akan tersedia seperti aplikasi native

## 📊 Google Apps Script Integration

Aplikasi ini terintegrasi dengan Google Apps Script untuk penyimpanan data:
- Endpoint API untuk CRUD operations
- Automatic data synchronization
- Offline fallback dengan localStorage

## 📄 Lisensi

MIT License - Bebas digunakan dan dimodifikasi

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan buat issue atau pull request.

---

Dikembangkan dengan ❤️ untuk kemudahan manajemen aktivitas harian