export default async function handler(req, res) {
    // === SURAT IZIN CORS (TAMBAHAN BARU) ===
    res.setHeader('Access-Control-Allow-Origin', '*'); // Mengizinkan Acode mengaksesnya
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Menjawab sapaan awal dari browser (Preflight request)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    // =======================================

    // 1. Pastikan hanya menerima permintaan POST
    if (req.method !== 'POST') {
        return res.status(405).json({ pesan: 'Hanya menerima POST' });
    }

    // 2. Kunci rahasia dari Vercel
    const apiKey = process.env.KUNCI_RAHASIA_AI; 

    // 3. Mengambil pertanyaan
    const pertanyaanUser = req.body.pertanyaan;

    try {
        const balasanAI = `Server Vercel menerima pertanyaan Anda: "${pertanyaanUser}". Koneksi SUKSES!`;
        
        // 4. Mengirim jawaban kembali
        res.status(200).json({ jawaban: balasanAI });

    } catch (error) {
        res.status(500).json({ pesan: 'Terjadi kesalahan di server' });
    }
}
