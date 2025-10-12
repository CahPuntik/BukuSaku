# Sistem Cache Prosedur - Buku Saku

## ✨ Fitur Baru

Sistem ini menambahkan **caching otomatis** untuk halaman prosedur agar loading lebih cepat dan data tidak hilang saat menggunakan aplikasi.

## 🚀 Keunggulan

### Performa Loading
- **Local Cache**: Data tersimpan di browser untuk akses instan (~50ms)
- **Firebase Cache**: Backup cache di cloud untuk sync antar device (~300ms)  
- **Google Sheets**: Fallback ke sumber data asli jika cache gagal (~2-3s)

### Keandalan Data
- **Auto Refresh**: Cache otomatis di-refresh setiap 6 jam
- **Manual Refresh**: Tombol refresh untuk update data terbaru
- **Triple Fallback**: Local → Firebase → Google Sheets
- **Data Persistence**: List tidak akan hilang meski ada gangguan koneksi

## 🎯 Cara Kerja

### Pertama Kali Buka
1. Sistem cek cache di browser
2. Jika tidak ada, ambil dari Firebase cache  
3. Jika Firebase kosong, ambil dari Google Sheets
4. Data disimpan ke kedua cache untuk akses berikutnya

### Operasi Edit/Add/Delete
1. Kirim perubahan ke Google Sheets (source of truth)
2. Jika berhasil, refresh cache otomatis
3. Update tampilan dengan data terbaru

### Background Sync
- Jika cache sudah lama (>6 jam), sistem refresh otomatis di background
- User tetap bisa lihat data dari cache lama sambil menunggu data baru

## 🎛️ Kontrol User

### Status Badge
- 🟢 **Local Cache**: Data dari browser (paling cepat)
- 🟢 **Firebase Cache**: Data dari cloud (cepat)  
- 🟡 **Google Sheets (Live)**: Data langsung dari source (lambat)

### Tombol Kontrol
- **🔄 Refresh**: Force reload data terbaru dari Google Sheets
- **🗑️ Clear Cache**: Hapus semua cache dan reload ulang
- **📄 Print**: Print data (fitur lama)

## 📊 Performa

| Sumber Data | Waktu Loading | Keandalan |
|-------------|---------------|-----------|
| Local Cache | ~50ms | ⭐⭐⭐ |
| Firebase Cache | ~300ms | ⭐⭐⭐ |
| Google Sheets | 2-3s | ⭐⭐ |

## 🔧 Technical Details

### Cache Storage
- **Local**: `localStorage` browser dengan TTL 6 jam
- **Firebase**: Collection `prosedur_cache` dengan timestamp
- **Sync**: Auto-sync antar device yang menggunakan Firebase

### Error Handling
- Graceful fallback jika satu layer cache gagal
- Loading indicators yang informatif
- Error messages yang user-friendly
- Retry mechanism otomatis

### Data Consistency
- Google Sheets tetap sebagai single source of truth
- Semua perubahan (add/edit/delete) langsung ke Google Sheets
- Cache di-update setelah operasi berhasil
- Conflict resolution otomatis

## 💡 Tips Penggunaan

1. **Loading Lambat?** → Klik tombol "🔄 Refresh"
2. **Data Tidak Update?** → Klik "🗑️ Clear Cache" 
3. **Offline?** → Data terakhir masih bisa dilihat dari cache browser
4. **Ganti Device?** → Data otomatis sync lewat Firebase cache

## 🔄 Status Indikator

- **Memuat...**: Sedang loading data
- **Local Cache**: Data dari browser (paling cepat)
- **Firebase Cache**: Data dari cloud backup
- **Google Sheets (Live)**: Data real-time dari source

---

**Catatan**: Data asli tetap tersimpan di Google Sheets. Cache hanya untuk mempercepat loading dan memberikan pengalaman yang lebih baik.