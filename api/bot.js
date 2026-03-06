export const maxDuration = 60;

export default async function handler(req, res) {
    // 1. Izin Keamanan
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ jawaban: 'Hanya menerima POST' });

    // 2. Ambil Data dari Web Acode Anda
    const apiKey = process.env.KUNCI_RAHASIA_AI;
    const pertanyaanUser = req.body.pertanyaan;
    const modeAI = req.body.mode; 
    const aturanDariFirebase = req.body.aturanRahasia || ""; // Menangkap memori permanen

    if (!apiKey) return res.status(500).json({ jawaban: 'Error: Kunci rahasia belum terpasang di Vercel!' });

    // 3. Suntikkan Kepribadian & Memori Inti
    let instruksiRahasia = "";
    if (modeAI === 'instan') {
        instruksiRahasia = "Kamu adalah Funixx AI. Jawablah langsung ke intinya dan singkat.";
    } else {
        instruksiRahasia = "Kamu adalah ahli logika dan programmer senior. Berpikirlah secara detail dan mendalam.";
    }

    // Gabungkan dengan aturan permanen jika ada
    if (aturanDariFirebase !== "") {
        instruksiRahasia += "\n\nPENTING! Ikuti aturan permanen dari pengguna berikut ini dengan ketat:\n" + aturanDariFirebase;
    }

    try {
        // 4. Hubungi Gemini AI
        const urlGemini = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const responAI = await fetch(urlGemini, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: instruksiRahasia }] },
                contents: [{ parts: [{ text: pertanyaanUser }] }]
            })
        });

        const dataAI = await responAI.json();

        // 5. Kembalikan Jawaban
        if (dataAI.candidates && dataAI.candidates.length > 0) {
            res.status(200).json({ jawaban: dataAI.candidates[0].content.parts[0].text });
        } else if (dataAI.error) {
            res.status(500).json({ jawaban: `Google API Error: ${dataAI.error.message}` });
        } else {
            res.status(500).json({ jawaban: `Error tidak dikenal: ${JSON.stringify(dataAI)}` });
        }

    } catch (error) {
        res.status(500).json({ jawaban: `Vercel Error: ${error.message}` });
    }
}
