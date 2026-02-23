export default async function handler(req, res) {
    // === 1. SURAT IZIN CORS (Wajib agar Acode tidak diblokir) ===
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // === 2. PASTIKAN HANYA MENERIMA POST ===
    if (req.method !== 'POST') {
        return res.status(405).json({ jawaban: 'Hanya menerima POST' });
    }

    // === 3. AMBIL PERTANYAAN & KUNCI RAHASIA ===
    const apiKey = process.env.KUNCI_RAHASIA_AI;
    const pertanyaanUser = req.body.pertanyaan;

    // Cek darurat jika kunci tidak terbaca
    if (!apiKey) {
        return res.status(500).json({ jawaban: 'Error: Kunci rahasia belum terpasang di Vercel!' });
    }

    try {
        // === 4. MENGHUBUNGI GOOGLE AI STUDIO (GEMINI 1.5 FLASH) ===
        // Kita menggunakan model 'gemini-2.5-flash' yang sangat cepat dan pintar
        const urlGemini = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const responAI = await fetch(urlGemini, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: pertanyaanUser }]
                }]
            })
        });

        const dataAI = await responAI.json();

        // === 5. MENGIRIM JAWABAN KEMBALI KE ACODE ===
        // Mengekstrak teks balasan dari format struktur Google API
        if (dataAI.candidates && dataAI.candidates.length > 0) {
            const teksBalasan = dataAI.candidates[0].content.parts[0].text;
            res.status(200).json({ jawaban: teksBalasan });
        } else {
            res.status(500).json({ jawaban: 'Gagal mendapatkan balasan yang valid dari AI.' });
        }

    } catch (error) {
        res.status(500).json({ jawaban: `Terjadi kesalahan server: ${error.message}` });
    }
}
