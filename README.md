# 🤖 Asisten-AI-ku

> **Asisten Kecerdasan Buatan Berbahasa Indonesia yang Cerdas, Cepat, dan Mudah Digunakan**

<p align="center">
  <a href="https://asisten-ai-ku.vercel.app">🌐 Live Demo</a> •
  <a href="#-fitur">Fitur</a> •
  <a href="#-instalasi">Instalasi</a> •
  <a href="#-kontribusi">Kontribusi</a> •
  <a href="#-lisensi">Lisensi</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Bahasa-Indonesia-red?style=for-the-badge" alt="Bahasa">
  <img src="https://img.shields.io/badge/AI-Gemini_2.5_Flash-purple?style=for-the-badge" alt="AI Engine">
</p>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Instalasi & Setup](#-instalasi--setup)
- [Struktur Proyek](#-struktur-proyek)
- [Penggunaan](#-penggunaan)
- [Kontribusi](#-kontribusi)
- [Roadmap](#-roadmap)
- [Lisensi](#-lisensi)
- [Kontak](#-kontak)

---

## 🧠 Tentang Proyek

**Asisten-AI-ku** adalah aplikasi web chatbot AI berbahasa Indonesia yang dibangun dengan Google Gemini 2.5 Flash API. Proyek ini dirancang untuk:

### 🇮🇩 Untuk Pengguna Indonesia
- Menyediakan asisten AI yang memahami konteks budaya dan bahasa Indonesia
- Antarmuka yang intuitif dan ramah pengguna, bahkan untuk pemula teknologi
- Respons yang relevan dengan kebutuhan lokal

### 🌍 Untuk Developer
- Template open-source untuk membangun chatbot AI dengan arsitektur serverless
- Contoh implementasi praktis Google Gemini API dengan custom system instructions
- Dasar yang solid untuk dikembangkan menjadi proyek yang lebih kompleks

> 💡 **Visi:** Mendemokratisasi akses ke teknologi AI dengan membuat tools yang mudah digunakan, dimodifikasi, dan di-deploy oleh siapa saja.

---

## ✨ Fitur

### 🎯 Untuk Pengguna Akhir

| Fitur | Deskripsi |
|-------|-----------|
| ⚡ **Mode Instan** | Jawaban cepat & ringkas (maks. 3 kalimat) untuk pertanyaan sederhana |
| 🤔 **Mode Thinking** | Analisis mendalam dengan penalaran terstruktur untuk topik kompleks |
| 🎨 **UI Modern** | Dark theme dengan desain kapsul, animasi halus, dan UX yang nyaman |
| 📱 **Responsive** | Tampilan optimal di desktop, tablet, dan mobile |
| 🔐 **Privasi** | Tidak menyimpan riwayat chat secara permanen di server |

### 🔧 Untuk Developer

| Fitur | Deskripsi |
|-------|-----------|
| 🚀 **Serverless Architecture** | Backend berjalan di Vercel Functions, scalable & hemat biaya |
| 🔌 **API Modular** | Endpoint API terpisah memudahkan integrasi dengan platform lain |
| 📦 **Easy Deployment** | Siap deploy ke Vercel dalam 1 klik |
| 🌐 **CORS Configured** | Siap digunakan dengan frontend dari domain berbeda |
| 📝 **System Instructions** | Prompt engineering yang dapat dikustomisasi |

---

## 🛠️ Tech Stack

```
Frontend:
├── HTML5 + CSS3 (Custom Properties)
├── Vanilla JavaScript (ES6+)
├── Marked.js (Markdown rendering)

Backend:
├── Vercel Serverless Functions (Node.js)
├── Google Gemini 2.5 Flash API
├── CORS middleware

Deployment & Tools:
├── Vercel (Hosting & CI/CD)
├── Git & GitHub (Version Control)
├── dotenv (Environment Variables)
```

---

## 🌐 Demo

Coba langsung di browser Anda:

👉 **[asisten-ai-ku.vercel.app](https://asisten-ai-ku.vercel.app)**

---

## 🚀 Instalasi & Setup

### Prasyarat
- Node.js 18.x atau lebih baru
- Akun Vercel (untuk deployment)
- API Key Google Gemini (dapatkan di [Google AI Studio](https://aistudio.google.com/))

### Langkah 1: Clone Repositori
```bash
git clone https://github.com/devilblade28-commits/Asisten-AI-ku.git
cd Asisten-AI-ku
```

### Langkah 2: Instal Dependensi
```bash
npm install
```

### Langkah 3: Konfigurasi Environment Variables
Buat file `.env` di root proyek:
```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### Langkah 4: Jalankan secara Lokal
```bash
# Development mode
npm run dev

# Production mode
npm start
```
Akses di: `http://localhost:3000`

### Langkah 5: Deploy ke Vercel (Opsional)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📁 Struktur Proyek

```
Asisten-AI-ku/
├── index.html              # Halaman utama frontend
├── style.css               # Styling & animasi UI
├── script.js               # Logika frontend & interaksi API
├── package.json            # Dependensi & scripts
├── vercel.json             # Konfigurasi Vercel & routing
├── api/
│   └── gemini.js           # Handler untuk Google Gemini API
├── README.md               # Dokumentasi ini
├── LICENSE                 # Lisensi MIT
├── CONTRIBUTING.md         # Panduan kontribusi
└── .env.example            # Template environment variables
```

---

## 💬 Penggunaan

### Mengganti Mode Chat
1. **Mode Instan**: Klik tombol "⚡ Instan" untuk jawaban cepat
2. **Mode Thinking**: Klik tombol "🤔 Thinking" untuk analisis mendalam

### Kustomisasi System Prompt
Edit file `api/gemini.js` pada bagian `systemInstruction`:
```javascript
const systemInstruction = {
  role: "system",
  parts: [{
    text: `Anda adalah asisten AI yang membantu pengguna berbahasa Indonesia. 
    Gaya komunikasi: ${mode === 'thinking' ? 'detail dan analitis' : 'singkat dan langsung'}.`
  }]
};
```

### Integrasi dengan Platform Lain
Endpoint API tersedia di: `/api/gemini`

```javascript
const response = await fetch('/api/gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "Halo, apa kabar?",
    mode: "instant"
  })
});
const data = await response.json();
console.log(data.reply);
```

---

## 🤝 Kontribusi

Kami sangat menyambut kontribusi dari siapa saja! 🎉

### Cara Berkontribusi:
1. **Fork** repositori ini
2. Buat branch fitur: `git checkout -b fitur/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambahkan fitur X'`
4. Push ke branch: `git push origin fitur/nama-fitur`
5. Buka **Pull Request**

### Ide Kontribusi yang Dicari:
- [ ] 🌍 Tambahkan dukungan multi-bahasa
- [ ] 💬 Integrasi dengan WhatsApp/Telegram Bot
- [ ] 🎨 Tambahkan tema light mode
- [ ] 🔍 Fitur pencarian riwayat chat
- [ ] 🧪 Tambahkan unit tests

> 📖 Baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap

---

## 🗺️ Roadmap

### ✅ Q1 2026 (Selesai)
- [x] Implementasi dasar chatbot dengan Gemini API
- [x] UI/UX modern dengan 2 mode interaksi
- [x] Deployment ke Vercel

### 🎯 Q2 2026 (Dalam Pengembangan)
- [ ] Fitur export chat ke PDF/Markdown
- [ ] Custom instructions per user
- [ ] Voice input/output (Web Speech API)

### 🔮 Q3-Q4 2026 (Rencana)
- [ ] Integrasi dengan platform messaging
- [ ] Plugin system untuk ekstensi fungsionalitas
- [ ] Dokumentasi lengkap EN & ID

---

## 📜 Lisensi

Distribusikan di bawah lisensi **MIT**. Lihat file [`LICENSE`](LICENSE) untuk informasi lengkap.

```
MIT License
Copyright (c) 2026 devilblade28-commits
```

---

## 📬 Kontak

**Pengembang Utama:**  
👤 devilblade28-commits  
🔗 [GitHub Profile](https://github.com/devilblade28-commits)

**Dukungan & Diskusi:**  
- 🐛 [Laporkan Bug](https://github.com/devilblade28-commits/Asisten-AI-ku/issues)
- 💡 [Ajukan Fitur](https://github.com/devilblade28-commits/Asisten-AI-ku/issues)
- 💬 [Diskusi Umum](https://github.com/devilblade28-commits/Asisten-AI-ku/discussions)

---

<p align="center">
  <sub>Dibuat dengan ❤️ untuk komunitas developer Indonesia</sub><br>
  <sub>🚀 "Setiap kode besar dimulai dari satu commit"</sub>
</p>

<p align="center">
  <a href="#-asisten-ai-ku">⬆️ Kembali ke Atas</a>
</p>

---
