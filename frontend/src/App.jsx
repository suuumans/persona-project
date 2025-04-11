import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstPersona, setFirstPersona] = useState('piyush');
  const chatEndRef = useRef(null);

  const backendUrl = import.meta.env.MODE === 'production' ? import.meta.env.VITE_PROD_BACKEND_URL : import.meta.env.VITE_BACKEND_URL;
  console.log("Current Backend URL:", backendUrl);

  if (!backendUrl) {
    console.error('Backend URL is not defined!', {
      mode: import.meta.env.MODE,
      prodUrl: import.meta.env.VITE_PROD_BACKEND_URL,
      devUrl: import.meta.env.VITE_BACKEND_URL
    });
  }
  
  useEffect(() => {
    // Scroll to the bottom of the chat window when new messages appear
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, firstPersona]);

  useEffect(() => {
    console.log('Backend URL:', backendUrl);
    console.log('Full request URL:', `${backendUrl}/ask`);
  }, [backendUrl]);

  const createMessage = (type, text) => {
    return {
      id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      type,
      text
    };
  };

  const getMessageSender = (type) => {
    switch (type) {
      case 'user':
        return 'You:';
      case 'hitesh':
        return 'Hitesh:';
      case 'piyush':
        return 'Piyush:';
      default:
        return 'System:';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    console.log('Making request to: ', `${backendUrl}/ask`)
  
    const userMessage = createMessage('user', question);
    setChatHistory(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(`${backendUrl}/ask`, 
        { 
          question: userMessage.text,
          first_persona: firstPersona,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false
        }
      );

      const { responses } = response.data;
      
      // Add responses to chat history one by one to maintain order
      for (const { persona, answer } of responses) {
        setChatHistory(prev => [...prev, createMessage(persona, answer)]);
      }

    } catch (err) {
      console.error("Error fetching response:", err);
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to connect to the backend.';
      setError(`Error: ${errorMessage}`);
      setChatHistory(prev => [...prev, createMessage('error', `Oops! Connection mein problem hai (${errorMessage})`)]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAvatarUrl = (type) => {
    switch (type) {
      case 'hitesh':
        return '/hitesh_image.jpg';
      case 'piyush':
        return '/piyush_image.jpg';
      default:
        return 'https://ui-avatars.com/api/?name=You&background=2563eb&color=fff';
    }
  };

  const getMessageStyles = (type) => {
    switch (type) {
      case 'user':
        return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white';
      case 'hitesh':
        return 'bg-gradient-to-r from-orange-700 to-orange-800 text-white';
      case 'piyush':
        return 'bg-gradient-to-r from-green-700 to-green-800 text-white';
      default:
        return 'bg-gradient-to-r from-red-600 to-red-700 text-white';
    }
  };

  const formatMessageWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, position) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={`link-${part}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-blue-200 transition-colors"
          >
            {part}
          </a>
        );
      }
      return <span key={`text-${position}-${part.substring(0, 20)}`}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="flex flex-col h-[90vh] max-w-4xl mx-auto bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
        {/* Header */}
        <header className="relative bg-gray-900 p-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative">
            <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Chai Pe Charcha
            </h1>
            <p className="text-gray-400 mb-4">Get personalized advice from your favorite tech mentors</p>
            
            {/* Persona Toggle */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setFirstPersona('piyush')}
                className={`px-6 py-2.5 rounded-full transition-all transform hover:scale-105 ${
                  firstPersona === 'piyush'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Piyush First
              </button>
              <button
                onClick={() => setFirstPersona('hitesh')}
                className={`px-6 py-2.5 rounded-full transition-all transform hover:scale-105 ${
                  firstPersona === 'hitesh'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg shadow-yellow-500/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Hitesh First
              </button>
            </div>
          </div>
        </header>

        {/* Chat Window */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-800 to-gray-900">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fadeIn`}
            >
              <img
                src={getAvatarUrl(msg.type)}
                alt={getMessageSender(msg.type)}
                className="w-8 h-8 rounded-full border-2 border-white/20"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://ui-avatars.com/api/?name=' + msg.type + '&background=2563eb&color=fff';
                }}
              />
              <div
                className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-xs font-medium mb-1 text-white/60">
                  {getMessageSender(msg.type)}
                </span>
                <div
                  className={`message p-4 rounded-2xl shadow-lg max-w-[80%] transform transition-all ${getMessageStyles(msg.type)}`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {formatMessageWithLinks(msg.text)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Loading/Error Indicators */}
        {isLoading && (
          <div className="px-4 py-3 text-center text-sm text-blue-200/80 bg-blue-900/20 backdrop-blur-sm border-t border-blue-500/10">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-blue-200/80 border-t-transparent rounded-full"></div>
              {firstPersona === 'hitesh' ? 'Thamba... soch raha hoon bhai rouko...' : 'Ruko zara... sabar karo...'}
            </div>
          </div>
        )}
        {error && !isLoading && (
          <div className="px-4 py-3 text-center text-sm text-red-200 bg-red-900/20 backdrop-blur-sm border-t border-red-500/10">
            {error}
          </div>
        )}

        {/* Input Area */}
        <form className="p-4 bg-gray-900 backdrop-blur-sm border-t border-gray-700" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 max-w-3xl mx-auto">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={firstPersona === 'hitesh' ? 'Aapka sawaal yahan likho...' : 'Kya puchna hai bhai?'}
              disabled={isLoading}
              className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`p-3 text-white rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all transform hover:scale-105 ${
                firstPersona === 'hitesh'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 focus:ring-yellow-500/50'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500/50'
              }`}
            >
              {isLoading ? (
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;