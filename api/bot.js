export const maxDuration = 60;

export default async function handler(req, res) {
    // 1. Izin CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ jawaban: 'Hanya menerima POST' });

    // 2. Ambil Kunci Rahasia
    const apiKey = process.env.KUNCI_RAHASIA_AI;
    const pertanyaanUser = req.body.pertanyaan;

    if (!apiKey) return res.status(500).json({ jawaban: 'Error: Kunci rahasia belum terpasang di Vercel!' });

    try {
        // 3. Menghubungi Google AI
        const urlGemini = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${apiKey}`;

        const responAI = await fetch(urlGemini, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: pertanyaanUser }] }]
            })
        });

        const dataAI = await responAI.json();

        // 4. MEMBACA BALASAN (SUKSES ATAU ERROR ASLI DARI GOOGLE)
        if (dataAI.candidates && dataAI.candidates.length > 0) {
            // Jika sukses dijawab AI
            const teksBalasan = dataAI.candidates[0].content.parts[0].text;
            res.status(200).json({ jawaban: teksBalasan });
        } else if (dataAI.error) {
            // JIKA DITOLAK GOOGLE, TAMPILKAN ALASAN ASLINYA:
            res.status(500).json({ jawaban: `Google API Error: ${dataAI.error.message}` });
        } else {
            // Jika bentuk errornya tidak dikenali
            res.status(500).json({ jawaban: `Error tidak dikenal: ${JSON.stringify(dataAI)}` });
        }

    } catch (error) {
        res.status(500).json({ jawaban: `Vercel Error: ${error.message}` });
    }
}
