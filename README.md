# Chai Pe Charcha - AI Chat with Tech Mentors

An AI-powered chat application that simulates conversations with tech mentors Hitesh Choudhary and Piyush Garg.

## 🌟 Features

- Real-time conversation with AI versions of Hitesh and Piyush
- Natural Hinglish responses maintaining each mentor's unique style
- Interactive UI with support for Markdown and code highlighting
- Dynamic persona switching between mentors
- Complete chat history with auto-scrolling
- Responsive design with beautiful gradients and animations

## 🏗️ Project Structure

```
persona-project/
├── frontend/           # React + Vite frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
└── backend/           # FastAPI + Gemini Pro backend
    ├── main.py        # Main API server
    └── pyproject.toml # Python dependencies
```

## 🚀 Getting Started

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies using uv:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh  # Install uv if not already installed
   uv pip install -e .
   ```

4. Create `.env` file with your API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

5. Start the server:
   ```bash
   uvicorn main:app --reload --port 5001
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   bun install   # or: npm install
   ```

3. Start development server:
   ```bash
   bun dev      # or: npm run dev
   ```

4. Open http://localhost:5173 in your browser

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Google Gemini Pro
- Python 3.12+
- Uvicorn

## 📝 Environment Variables

### Backend (.env)
- `GEMINI_API_KEY` - Google AI API key

### Frontend
- No environment variables required (backend URL is hardcoded)

## 🤝 Contributing

1. Fork the repository [https://github.com/suuumans/persona-project.git](https://github.com/suuumans/persona-project.git)
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request through GitHub

## 📄 License

MIT License - Use this code however you'd like for learning and building!
