export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { images } = req.body;

  const imageParts = images.map(img => ({
    inline_data: { mime_type: img.mimeType, data: img.imageBase64 }
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              ...imageParts,
              { text: `你是專業的鳥類辨識專家。以上是同一隻鳥從不同角度拍攝的照片，這隻鳥剛發生撞窗意外，可能側躺或羽毛凌亂。請綜合所有照片的特徵（羽毛顏色、嘴喙、腳爪、體型）進行辨識。只回答鳥類中文名稱，若不確定請回答「可能是：名稱（不確定）」，完全無法辨識請回答「無法辨識」。` }
            ]
          }]
        })
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
