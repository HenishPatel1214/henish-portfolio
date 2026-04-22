# Henish Patel Portfolio

A production-ready portfolio website built with **React + Vite**, **Tailwind CSS**, and **Framer Motion**, designed for software engineering, AI/data systems, and technical recruiter visibility.

## Live Focus

This portfolio is optimized to present:
- Systems-level software engineering depth
- Data + AI project impact
- Metrics-driven experience storytelling
- Professional, modern, motion-first UI design

## Tech Stack

- React 19 (Vite)
- Tailwind CSS 3
- Framer Motion
- Lucide React (icons)
- GitHub Pages deployment (Actions + optional manual deploy)

## Project Structure

```text
.
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.svg
│   ├── social-preview.svg
│   └── resume/Henish_Patel_Resume.pdf
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx
│   │   ├── AnimatedSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── SectionTitle.jsx
│   │   └── SkillsSection.jsx
│   ├── data/portfolioData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

### Option A (Recommended): GitHub Actions

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` and deployment runs automatically via `.github/workflows/deploy.yml`.

### Option B: Manual Deploy with `gh-pages`

```bash
npm run deploy
```

This publishes the `dist/` folder to a `gh-pages` branch.

## Personalization Checklist

- Update content in `src/data/portfolioData.js`.
- Replace `public/resume/Henish_Patel_Resume.pdf` with your current resume.
- If you create project-specific repos, update project links in `src/data/portfolioData.js`.
- If desired, update OG metadata in `index.html` with your final production URL.

## SEO + Performance Notes

- Includes foundational meta tags (title, description, OG/Twitter cards).
- Uses lightweight animation patterns with viewport-triggered reveals.
- Uses static deployment-friendly architecture for fast GitHub Pages hosting.

## License

Personal portfolio template for Henish Patel.
