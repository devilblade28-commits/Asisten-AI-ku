# 🤝 Panduan Kontribusi - Asisten-AI-ku

Terima kasih atas ketertarikan Anda untuk berkontribusi pada **Asisten-AI-ku**! 🎉
Setiap bantuan, sekecil apapun, sangat berarti untuk pengembangan proyek ini.

## 📋 Daftar Isi
- [Cara Berkontribusi](#-cara-berkontribusi)
- [Standar Kode](#-standar-kode)
- [Pull Request Process](#-pull-request-process)
- [Laporan Bug & Fitur](#-laporan-bug--fitur)

## 🚀 Cara Berkontribusi

### 1. Fork & Clone
```bash
# Fork repositori ini melalui tombol "Fork" di GitHub
# Kemudian clone fork Anda:
git clone https://github.com/USERNAME-ANDA/Asisten-AI-ku.git
cd Asisten-AI-ku
```

### 2. Buat Branch Fitur
Gunakan nama branch yang deskriptif:
```bash
git checkout -b fitur/tambah-fitur-baru
# atau
git checkout -b fix/perbaiki-bug-xyz
```

### 3. Lakukan Perubahan & Commit
- Pastikan kode Anda berjalan tanpa error
- Gunakan [Conventional Commits](https://www.conventionalcommits.org/):
```bash
git commit -m "feat: tambahkan mode dark theme"
git commit -m "fix: perbaiki error pada API handler"
```

### 4. Push & Buat Pull Request
```bash
git push origin fitur/tambah-fitur-baru
```
Kemudian buka **Pull Request** di repositori utama dan jelaskan perubahan yang Anda buat.

## 💻 Standar Kode

### JavaScript/Frontend
- Gunakan ES6+ syntax
- Hindari `var`, gunakan `const` atau `let`
- Tambahkan komentar untuk logika yang kompleks
- Pastikan tidak ada `console.log` yang tertinggal di production code

### Styling
- Gunakan CSS Variables untuk konsistensi tema
- Pastikan desain responsive di mobile & desktop

### Backend (Vercel Functions)
- Handle error dengan try-catch yang tepat
- Jangan hardcode API key (gunakan environment variables)

## ✅ Checklist Sebelum Pull Request
- [ ] Kode sudah diuji secara lokal
- [ ] Tidak ada console.log/debugger yang tertinggal
- [ ] Perubahan didokumentasikan (README/komentar)
- [ ] Commit message mengikuti format konvensional
- [ ] Branch sudah di-rebase dengan main terbaru

## 🐛 Laporan Bug & Request Fitur

### Melaporkan Bug
1. Cek [Issues](https://github.com/devilblade28-commits/Asisten-AI-ku/issues) apakah bug sudah dilaporkan
2. Jika belum, buka Issue baru dengan template:
   - **Deskripsi**: Jelaskan bug secara detail
   - **Langkah Reproduksi**: Cara memunculkan bug
   - **Expected Behavior**: Seharusnya apa yang terjadi
   - **Environment**: Browser, OS, dll

### Request Fitur Baru
1. Diskusikan dulu di [Discussions](https://github.com/devilblade28-commits/Asisten-AI-ku/discussions) atau Issues
2. Jelaskan use case dan manfaat fitur tersebut
3. Jika disetujui, silakan implementasikan dan kirim PR!

## 📬 Pertanyaan?
Jangan ragu untuk:
- Tag `@devilblade28-commits` di Issue/PR
- Buka Discussion untuk tanya-jawab umum
- Kontak via GitHub DM untuk hal privat

> 💡 **Tips**: Kontribusi kecil seperti memperbaiki typo, menambah dokumentasi, atau melaporkan bug pun sangat dihargai! 🙏

Terima kasih telah membuat **Asisten-AI-ku** lebih baik! ❤️🇮🇩
