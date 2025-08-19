// src/components/AIAssistant.jsx
import React, { useState, useEffect, useRef } from 'react';
import { getAIResponse } from '../services/aiService';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Viewing QMS Events. Ask me to 'summarize high-risk events' or 'suggest next steps for DEV-2025-001'." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Effect to auto-scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getAIResponse(input);
    const aiMessage = { from: 'ai', text: aiResponseText };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col h-full">
      <div className="bg-indigo-600 text-white p-3 font-semibold text-sm">
        AI Assistant
      </div>
      <div className="flex-grow p-3 overflow-y-auto space-y-4 text-sm">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg max-w-xs ${
            msg.from === 'ai' 
            ? 'bg-slate-100 text-slate-800' 
            : 'bg-indigo-100 text-indigo-800 ml-auto'
          }`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
            Thinking...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-3 border-t border-slate-200">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about events..."
            className="w-full text-sm border rounded-full py-2 px-4 pr-10"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AIAssistant;