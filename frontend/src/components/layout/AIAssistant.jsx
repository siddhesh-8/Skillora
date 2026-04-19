import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, X, MessageCircle, Send, Brain, Star, Wallet, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hello! I'm Skillora AI. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    // Context-aware suggestions
    const path = location.pathname;
    if (path === '/dashboard') {
      setSuggestions(['How to earn more credits?', 'Find a React partner?', 'Set a learning goal']);
    } else if (path === '/matches') {
      setSuggestions(['Who is best for Node.js?', 'How matching works?', 'Filter by rating']);
    } else if (path === '/credits') {
      setSuggestions(['Buy boost packs?', 'Redeem points', 'Transaction history']);
    } else {
      setSuggestions(['Tell me about Skillora', 'How to start teaching?', 'Member benefits']);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI responses
    setTimeout(() => {
      let botText = "That's a great question! I'm analyzing your profile to give you the best advice.";
      if (msg.toLowerCase().includes('credit')) {
        botText = "You can earn credits by completing teaching sessions. Currently, 'UI/UX' is in high demand and pays 1.5x credits!";
      } else if (msg.toLowerCase().includes('react')) {
        botText = "I found 3 experts in React who are currently online. Check the 'Matches' page to message them!";
      } else if (msg.toLowerCase().includes('start')) {
        botText = "To start, head over to the 'Matches' page and look for someone who wants to learn what you know. Klik 'Book' to schedule a session.";
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botText }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#A099FF] shadow-2xl hover:scale-110 transition-transform flex items-center justify-center p-0 group border-4 border-[#1A1A2E]"
        >
          <Sparkles className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#10B981]"></span>
          </span>
        </Button>
      ) : (
        <Card className="w-96 bg-[#1A1A2E]/95 backdrop-blur-xl border-[#2D2D44] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          <CardHeader className="bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] p-4 flex flex-row items-center justify-between border-0">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-white/20 rounded-xl">
                 <Brain className="w-5 h-5 text-white" />
               </div>
               <div>
                 <CardTitle className="text-white text-lg font-bold">Skillora AI</CardTitle>
                 <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-white/70 font-medium">Always here to help</span>
                 </div>
               </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="h-80 overflow-y-auto p-4 space-y-4 bg-[#0F0F1A]/50 custom-scrollbar"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.type === 'user' 
                      ? 'bg-[#6C63FF] text-white rounded-tr-none' 
                      : 'bg-[#2D2D44] text-[#F1F5F9] rounded-tl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="px-4 py-3 flex flex-wrap gap-2 border-t border-white/5">
               {suggestions.map((s, i) => (
                 <button 
                  key={i} 
                  onClick={() => handleSend(s)}
                  className="text-[10px] px-3 py-1.5 bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20 rounded-full hover:bg-[#6C63FF]/20 transition-colors"
                 >
                   {s}
                 </button>
               ))}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-white/5 bg-[#1A1A2E]">
              <div className="flex gap-2">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..." 
                  className="bg-[#0F0F1A] border-[#2D2D44] text-white rounded-xl focus:ring-[#6C63FF]"
                />
                <Button 
                  onClick={() => handleSend()}
                  className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white p-3 rounded-xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
