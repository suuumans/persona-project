# Chai Pe Charcha Backend

A FastAPI service that powers conversations with AI versions of Hitesh Choudhary and Piyush Garg.

## 🚀 Quick Start

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Install dependencies:
   Choose either pip or uv for installation:

   Using pip:
   ```bash
   pip install -e .
   ```

   Using uv (Faster):
   ```bash
   uv venv
   uv pip install -e .
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Add your API keys:
     ```
     GEMINI_API_KEY=your-gemini-api-key
     ```

4. Run the server:
   ```bash
   uvicorn main:app --reload --port 5001
   ```

## 🛠️ API Endpoints

### POST /ask
Send questions to get responses from both Hitesh and Piyush.

Request body:
```json
{
  "question": "How do I learn React?",
  "first_persona": "hitesh"  // or "piyush"
}
```

Response:
```json
{
  "responses": [
    {
      "persona": "hitesh",
      "answer": "..."
    },
    {
      "persona": "piyush",
      "answer": "..."
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a PR

## 📝 Requirements

- Python 3.12+
- FastAPI
- Google Gemini API access

## 🔒 Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key

## 📝 License

MIT - Feel free to use this code for learning!
