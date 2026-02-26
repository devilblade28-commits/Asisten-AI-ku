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
        
            // 3. Ambil pertanyaan DAN mode dari HTML
    const pertanyaanUser = req.body.pertanyaan;
    const modeAI = req.body.mode; // 'instan' atau 'thinking'

    // 4. Siapkan Instruksi Rahasia berdasarkan pilihan
    let instruksiRahasia = "";
    if (modeAI === 'instan') {
        instruksiRahasia = "Kamu adalah asisten super cepat. Jawablah langsung ke intinya, sangat singkat, padat, dan tidak lebih dari 3 kalimat. Hindari penjelasan panjang.";
    } else {
        instruksiRahasia = "Kamu adalah ahli logika dan programmer senior. Berpikirlah selangkah demi selangkah. Jelaskan alur pemikiranmu secara mendalam, rinci, dan terstruktur sebelum memberikan jawaban akhir.";
    }

    try {
        const urlGemini = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const responAI = await fetch(urlGemini, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // Memasukkan Instruksi Rahasia ke otak AI
                systemInstruction: {
                    parts: [{ text: instruksiRahasia }]
                },
                contents: [{
                    parts: [{ text: pertanyaanUser }]
                }]
            })
        });
        
        // ... (Sisa kode ke bawahnya tetap sama seperti sebelumnya) ...
