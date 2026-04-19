import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Image, Smile, ArrowLeft, MoreVertical } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');

export default function Chat() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([
    { id: 1, senderId: 'bot', text: 'Welcome to Skillora Chat! Select a contact to start exchanging knowledge.', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off('message');
  }, []);

  const [selectedContact, setSelectedContact] = useState({ id: '1', name: 'Ayush Sharma', status: 'online', avatar: 'Ayush' });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: user?.id || 'me',
      text: inputText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit('sendMessage', newMessage);
    setInputText('');

    // Simulate response
    setTimeout(() => {
      const responseMessage = {
        id: Date.now() + 1,
        senderId: 'other',
        text: `Hey ${user?.name || 'there'}! Thanks for your message. I'm currently looking at your request and will get back to you in a moment!`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
  };

  const contacts = [
    { id: '1', name: 'Ayush Sharma', status: 'online', lastMsg: 'I can help with React!' },
    { id: '2', name: 'Siddhesh Jain', status: 'offline', lastMsg: 'See you tomorrow for the Python session.' },
    { id: '3', name: 'Mrunali Patil', status: 'online', lastMsg: 'Thanks for the design tips!' }
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#0F0F1A] overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-[#2D2D44] flex flex-col bg-[#1A1A2E]">
        <div className="p-4 border-b border-[#2D2D44] flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <Button variant="ghost" size="icon" className="text-[#94A3B8]">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto space-y-2 p-2">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              onClick={() => setSelectedContact({ ...contact, avatar: contact.name.split(' ')[0] })}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors group ${selectedContact?.id === contact.id ? 'bg-[#2D2D44]' : 'hover:bg-[#2D2D44]'}`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} />
                  <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {contact.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1A1A2E] rounded-full"></div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold text-white truncate">{contact.name}</p>
                  <p className="text-[10px] text-[#94A3B8]">12:45 PM</p>
                </div>
                <p className="text-xs text-[#94A3B8] truncate">{contact.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-col flex-grow bg-[#0F0F1A]">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#2D2D44] flex items-center justify-between bg-[#1A1A2E]">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact?.name}`} />
              <AvatarFallback>{selectedContact?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold text-white">{selectedContact?.name}</p>
              <p className={`text-[10px] ${selectedContact?.status === 'online' ? 'text-green-500' : 'text-[#94A3B8]'}`}>
                {selectedContact?.status === 'online' ? 'Active now' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <Button 
              variant="outline" 
              className="text-white border-[#2D2D44] bg-transparent hover:bg-[#2D2D44]"
              onClick={() => toast.success(`Calling ${selectedContact?.name}...`)}
             >
               Call
             </Button>
             <Button 
              className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white"
              onClick={() => toast.success(`Viewing profile of ${selectedContact?.name}`)}
             >
               View Profile
             </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-2 group ${msg.senderId === user?.id || msg.senderId === 'me' ? 'flex-row-reverse' : ''}`}>
              <div className={`max-w-[70%] p-3 rounded-2xl relative ${
                msg.senderId === user?.id || msg.senderId === 'me' 
                  ? 'bg-[#6C63FF] text-white rounded-tr-none' 
                  : 'bg-[#1A1A2E] text-[#F1F5F9] rounded-tl-none border border-[#2D2D44]'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <div className="flex items-center justify-between mt-1 gap-4">
                  <p className={`text-[10px] opacity-70`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-[#94A3B8] hover:text-white transition-opacity">
                 <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="p-4 bg-[#1A1A2E] border-t border-[#2D2D44]">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <div className="flex gap-2 text-[#94A3B8]">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="hover:text-[#6C63FF]"
                onClick={() => toast.success('Opening media selector...')}
              >
                <Image className="w-5 h-5" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="hover:text-[#6C63FF]"
                onClick={() => toast.success('Opening emoji picker...')}
              >
                <Smile className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative flex-grow">
              <Input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..." 
                className="bg-[#0F0F1A] border-[#2D2D44] text-white rounded-full pl-4 pr-4 py-6"
              />
            </div>
            <Button type="submit" className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white rounded-full w-12 h-12 flex items-center justify-center p-0">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
