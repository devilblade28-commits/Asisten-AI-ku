export const maxDuration = 60;

export default async function handler(req, res) {
    // === 1. SURAT IZIN CORS ===
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

    // === 3. AMBIL PERTANYAAN, MODE & KUNCI RAHASIA ===
    const apiKey = process.env.KUNCI_RAHASIA_AI;
    const pertanyaanUser = req.body.pertanyaan;
    const modeAI = req.body.mode; // Menangkap pilihan mode dari HTML Acode

    if (!apiKey) {
        return res.status(500).json({ jawaban: 'Error: Kunci rahasia belum terpasang di Vercel!' });
    }

    // === 4. SIAPKAN KEPRIBADIAN (SYSTEM INSTRUCTION) ===
    let instruksiRahasia = "";
    if (modeAI === 'instan') {
        instruksiRahasia = "Kamu adalah asisten super cepat. Jawablah langsung ke intinya, sangat singkat, padat, dan tidak lebih dari 3 kalimat. Hindari penjelasan panjang.";
    } else {
        instruksiRahasia = "Kamu adalah ahli logika dan programmer senior. Berpikirlah selangkah demi selangkah. Jelaskan alur pemikiranmu secara mendalam, rinci, dan terstruktur sebelum memberikan jawaban akhir.";
    }

    try {
        // === 5. MENGHUBUNGI GOOGLE AI STUDIO (GEMINI 2.5 FLASH) ===
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

        const dataAI = await responAI.json();

        // === 6. MENGIRIM JAWABAN KEMBALI KE ACODE ===
        if (dataAI.candidates && dataAI.candidates.length > 0) {
            const teksBalasan = dataAI.candidates[0].content.parts[0].text;
            res.status(200).json({ jawaban: teksBalasan });
        } else if (dataAI.error) {
            res.status(500).json({ jawaban: `Google API Error: ${dataAI.error.message}` });
        } else {
            res.status(500).json({ jawaban: `Error tidak dikenal: ${JSON.stringify(dataAI)}` });
        }

    } catch (error) {
        res.status(500).json({ jawaban: `Vercel Error: ${error.message}` });
    }
}
