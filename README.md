# 🎂 Interactive Birthday Wishing Card Web Application

A plug-and-play, **zero-backend, mobile-first** interactive Birthday Wishing Card web app built with **React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Web Audio API**.

---

## ✨ Features & Zero-Setup Architecture

### 1. Customization Portal (`/`)
- **Recipient & Sender Details**: Recipient name, birthday date, and sender sign-off.
- **Heartfelt Personal Letter**: Multi-line stationery letter with paragraph formatting and decorative drop-caps.
- **4 Memory Photos & Captions**:
  - Drag-and-drop or file upload with automatic client-side HTML5 `<canvas>` compression (max width 320px, JPEG/WebP quality 0.65).
  - Preloaded with 4 cute pastel vector SVG illustrations (Starlit Night, Mountain Road Trip, Cozy Cafe, Blooming Friendship Flowers) so anyone can share instantly without uploading anything.
  - Handwritten captions in `Caveat` font.
- **Synthesized Music-Box Audio Toggle**: Background music generated in real-time via the Web Audio API.
- **Zero-Backend Shareable Links**:
  - Compresses the full card JSON payload into the URL hash using `lz-string` (`compressToEncodedURIComponent`).
  - Generates a shareable URL (e.g. `/#/wish#data=<compressed_payload>`) fitting in under 1-3 KB.
  - One-click **Copy Link** with toast feedback.
  - One-click **Share on WhatsApp** (`https://wa.me/?text=...`).
  - **Live Preview Card** mode.

---

### 2. Interactive Birthday Experience (`/wish`)
An 8-scene storybook journey rendered in a `100dvh` mobile frame:
1. **Scene 1: The Sealed Envelope**: Soft cream-blush gradient, cream floral envelope, pink heart wax seal, animated flap opening, sliding recipient card, peek-a-boo plushies (teddy & bunny), and music-box melody activation on first gesture.
2. **Scene 2: The Dark Room**: Midnight-navy starry sky (`#14182E`), crescent moon, sleepy teddy bear in nightcap, and a glowing golden button that triggers a warm radial light-flood illumination.
3. **Scene 3: The Birthday Reveal**: Pastel striped wallpaper, hanging bunting flags, floating pastel balloons, cheering party teddy, wrapped gift box, and personalized date badge.
4. **Scene 4: Interactive Cake Cutting**: 3-tier pastel cake with flickering candles and central dashed cut line. Drag/swipe down with glowing trail or tap fallback: splits the cake in half revealing colorful rainbow sponge and cream layers, with a celebratory multi-colored confetti burst!
5. **Scene 5: Make a Wish**: Glowing radial halo, teddy bear holding paws together in wish/prayer, animated star shimmer, and soothing transition to the memory gallery.
6. **Scene 6: Memory Polaroid Gallery**: 2x2 scrapbook grid with washi tape accents, soft tilted angles, handwritten captions, and lightbox modal enlargement.
7. **Scene 7: The Personal Letter**: Luxury stationery paper texture card with decorative rose-pink drop-cap, scrollable body, and sender sign-off.
8. **Scene 8: Final Celebration**: Pastel pink gradient, cheerful teddy holding a pink balloon, gentle falling confetti, "Replay the surprise ↺" button, and "Make your own card ✨" button.

---

## 🛠 Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Animations & Gestures**: Framer Motion
- **Confetti**: Canvas-Confetti
- **Icons**: Lucide React
- **URL Compression**: LZ-String
- **Audio**: Web Audio API (real-time synthesizer)
- **Typography**: Google Fonts (`Playfair Display`, `Plus Jakarta Sans`, `Caveat`)

---

## 🚀 Running the Project

```bash
# Navigate to project directory
cd /Users/user/.gemini/antigravity/scratch/birthday-wishing-card

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.
