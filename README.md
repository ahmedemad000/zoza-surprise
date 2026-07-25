# Zoza's Birthday Surprise 🌹✨

A fully redesigned, romantic multi-section birthday surprise. React + Vite + Tailwind CSS v4 + Framer Motion + canvas-confetti.

## What's in it now
1. **Envelope** — a starry, wax-seal envelope with her name, tap to open.
2. **Hero** — her name "Zoza" in glowing gold/rose shimmer text.
3. **The Letter** — an expanded two-part message, lines fade in as you scroll, ending on "you are the best girl in the world."
4. **Timeline** — "Two weeks, so far": a vertical story of your two weeks (currently placeholder days — edit these!).
5. **Best Moments** — a mixed photo *and video* gallery, tap any tile to open it full-screen in a lightbox.
6. **Finale** — a cake with a candle. She can blow into her mic (real detection!) or just tap the flame → confetti burst → a signed closing note with your name.
7. Floating hearts/petals/sparkles ambient background throughout, and a background music toggle.

## ⚠️ About her photos/videos
I can't pull anything from Instagram or TikTok directly — both block automated access, and I don't scrape someone's personal content even with good intent behind it. You'll need to save the photos/clips yourself (screenshot, save, or download from her posts/DMs) and drop them in.

## 1. Add her real photos & videos
- Photos go in `public/gallery/` — replace `1.jpg` through `8.jpg`, keep the same filenames.
- Videos go in `public/videos/` — replace `1.mp4` and `2.mp4`, keep the same filenames. Keep clips short (5–15 seconds) and under ~15MB each so they load fast on her phone.
- Open `src/components/MomentsGallery.jsx` and edit the `moments` array: captions, which files are `'photo'` vs `'video'`, and the `poster` image shown before a video is tapped (usually just a frame from that video, or any photo).
- Add more entries to the array if you want more than 8 tiles — same shape, any filenames.

## 2. Edit the timeline
Open `src/components/Timeline.jsx` and edit the `moments` array — swap in what actually happened on those days together.

## 3. Edit the letter
`src/components/MessageSection.jsx` — the `linesOne` and `linesTwo` arrays are the message text.

## 4. Sign your name
Open `src/App.jsx` and change:
```js
const SIGNATURE = 'Your Name'; // 👈 replace with your actual name
```

## 5. Background music
Floating button (bottom-right) plays `public/music.mp3` — currently a silent placeholder. Replace it with a real track (your own, or something royalty-free), same filename.

## Font
Headlines now use **Playfair Display** — a bold, high-legibility serif (much easier to read at a glance than a novelty display face). Body text stays in Cormorant Garamond, and all text sizes were bumped up throughout for readability on phones.

## 6. Run it locally
```bash
npm install
npm run dev
```

## 7. Build for production
```bash
npm run build
```
Creates a static `dist/` folder.

## 8. Put it online (free)
**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify (no CLI, drag & drop):**
1. `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder in
4. You get a live HTTPS URL instantly

**Important:** the mic-blow feature only works over HTTPS (a browser security rule) — Vercel/Netlify both serve HTTPS automatically, so you're covered as long as you deploy there.

## 9. Generate the QR code
Once deployed, turn the live URL into a QR code at https://www.qr-code-generator.com or https://qrcode.tec-it.com (free, no signup). Send her the QR image.

If you paste me the final URL, I can generate and hand you the QR image directly here too.
