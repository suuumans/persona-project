# Chai Pe Charcha Frontend

A React-based frontend for having AI-powered conversations with virtual versions of Hitesh Choudhary and Piyush Garg.

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   # Using bun (recommended)
   bun install

   # Using npm
   npm install
   ```

2. Start the development server:
   ```bash
   # Using bun
   bun dev

   # Using npm
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Axios for API calls

## ⚙️ Configuration

The app expects a backend service running at `http://localhost:5001`. You can modify this in `src/App.jsx` if needed:

```javascript
const backendUrl = 'http://localhost:5001/ask';
```

## 🎨 Features

- Real-time chat interface
- Toggle between who responds first (Hitesh or Piyush)
- Markdown support for messages
- Code syntax highlighting
- Responsive design
- Auto-scrolling chat
- Loading states & error handling
- Link detection in messages

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── public/              # Static assets
└── package.json         # Project dependencies and scripts
```

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a PR

## 📝 Requirements

- Node.js 16+ or Bun runtime
- Backend service running (see backend README)

## 🔒 Environment Variables

No environment variables are required for the frontend as the backend URL is hardcoded.
You can create a `.env` file if you need to configure different environments.

## 📝 License

MIT - Feel free to use this code for learning!
