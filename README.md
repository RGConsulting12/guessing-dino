# Guessing Dino

A kid-friendly dinosaur guessing game for ages 4–10. Read a museum-style clue, pick the right dinosaur from four choices, and collect stars. Progress stays **on this device only**.

## How it plays

1. **Setup** — choose a name, difficulty (Easy / Medium / Hard), and whether to use read-aloud voice.
2. **Play** — read the description (or tap **Read aloud**).
3. **Guess** — tap one of four dinosaur names.
4. **Continue** — profiles remember stars, completed dinosaurs, and your place in the trail.

## Curriculum

| Difficulty | Levels | Dinosaurs |
|------------|--------|-----------|
| Easy | 3 | 12 famous species |
| Medium | 3 | 12 trickier species |
| Hard | 3 | 12 advanced species |

Descriptions are written for kids using publicly known facts aligned with sources such as the **Smithsonian National Museum of Natural History** and other major natural history museums. Dinosaur photos are bundled from **Wikipedia / Wikimedia Commons** (museum fossils and mounts).

To refresh images: `bash scripts/download-dino-images.sh`

## Local development

```bash
npm install
cp .env.example .env.local   # add OPENAI_API_KEY for voice
npm run dev
```

`npm run dev` runs **Vercel dev** so `/api/speak` (OpenAI TTS) works alongside the Angular app.

UI only (no voice API):

```bash
npm start
```

Open `http://localhost:4200` (or the port Vercel prints).

### OpenAI key

The TTS route reads `OPENAI_API_KEY` from the environment. For local dev, copy your key into `.env.local` (same key as in `~/Documents/Coding/.env` or `projects/contractllc/.env`). **Never commit** `.env.local`.

On Vercel, add `OPENAI_API_KEY` in the project environment settings.

## Deploy on Vercel

Same flow as [curling](https://github.com/RGConsulting12/curlingc) and [silly-blanks](https://github.com/RGConsulting12/silly-blanks):

```bash
npx vercel
npx vercel --prod
```

Or connect **RGConsulting12/guessing-dino** in the Vercel dashboard for automatic deploys on push to `main`.

**Live:** [guessing-dino.vercel.app](https://guessing-dino.vercel.app)

## Sounds & celebration

- Correct guess → success chime + confetti burst
- Wrong guess → silly boop + dino-themed message
- Finish a difficulty trail → fanfare
- Toggle **Sounds** on the home screen (or at setup)

## Privacy

- No accounts, emails, or server-side profile storage.
- Display names and progress live in **browser localStorage** only.
- Voice text is sent to OpenAI only when read-aloud is enabled.

## Repo

- **GitHub:** [RGConsulting12/guessing-dino](https://github.com/RGConsulting12/guessing-dino)
