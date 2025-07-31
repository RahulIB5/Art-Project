
# 🖼️ PrimeReact Artworks Table — Vite + TypeScript

An interactive data table built with **React (Vite + TypeScript)** and **PrimeReact**, using server-side pagination and persistent row selection across pages.

## 🔍 Features

- ✅ **Server-side pagination** from Art Institute of Chicago's open API
- ✅ **Checkbox row selection**, including:
  - Individual selection
  - Select all rows on the page
  - Persist selection across pages
- ✅ **Select N artworks** using an input + button
- ✅ **Custom selection banner** displaying selected artworks
- ✅ **Skeleton loading UI** for smooth user experience

---

## 📦 Tech Stack

- **Frontend**: React + Vite + TypeScript
- **UI Library**: [PrimeReact](https://primereact.org/)
- **HTTP**: Fetch API
- **API**: [`https://api.artic.edu/api/v1/artworks`](https://api.artic.edu/api/v1/artworks)

---

## 🚀 Live Demo

🔗 [Deployed App](https://artt-project.netlify.app/)  

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/RahulIB5/Art-Project
cd Art-Project
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

## 📂 Folder Structure

```
src/
├── components/
│   ├── ArtworksTable.tsx
│   └── SelectedArtworksBanner.tsx
├── types/
│   └── artwork.ts
├── utils/
│   └── api.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 📜 License

This project is built for learning and assignment purposes. No license attached.

---