export default async function handler(req, res) {
    // 1. Pastikan hanya menerima permintaan POST dari frontend
    if (req.method !== 'POST') {
        return res.status(405).json({ pesan: 'Hanya menerima POST' });
    }

    // 2. MENGAMBIL KUNCI RAHASIA DARI BRANKAS VERCEL
    // Kode ini tidak akan terlihat oleh publik
    const apiKey = process.env.KUNCI_RAHASIA_AI; 

    // 3. Mengambil pertanyaan yang diketik user dari Acode
    const pertanyaanUser = req.body.pertanyaan;

    try {
        // Di sinilah nanti Anda menaruh kode fetch() untuk menghubungi Google AI Studio
        // menggunakan variabel 'apiKey' di atas.
        
        // Untuk contoh ini, kita buat balasan simulasi:
        const balasanAI = `Server Vercel menerima pertanyaan Anda: "${pertanyaanUser}". Kunci rahasia aman!`;

        // 4. Mengirim jawaban kembali ke Acode
        res.status(200).json({ jawaban: balasanAI });

    } catch (error) {
        res.status(500).json({ pesan: 'Terjadi kesalahan di server' });
    }
}
