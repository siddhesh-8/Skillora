import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Share2, Settings, Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function LiveSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const res = await api.get('/sessions');
        const session = res.data.find(s => s._id === id);
        if (session) {
          setSessionData(session);
        }
      } catch (err) {
        console.error("Error fetching session details", err);
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast.error("Could not access camera/mic. Please check permissions.");
      }
    };

    fetchSessionDetails();
    startCamera();
    
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [id]);

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !!isVideoOff;
      });
    }
    setIsVideoOff(!isVideoOff);
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !!isMuted;
      });
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0F] z-50 flex flex-col">
      {/* Session Header */}
      <div className="p-4 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <Badge className="bg-red-500 text-white border-0 animate-pulse">LIVE</Badge>
          <div>
            <h2 className="text-sm font-bold text-white">{sessionData?.skill || 'Loading Session...'}</h2>
            <p className="text-[10px] text-[#94A3B8]">
              {sessionData?.teacher_id?._id === user?._id 
                ? `Teaching ${sessionData?.learner_id?.name}` 
                : `Learning from ${sessionData?.teacher_id?.name}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Users className="w-4 h-4" />
            <span className="text-xs font-mono">2 participants</span>
          </div>
          <div className="text-white font-mono text-lg">{formatTime(timer)}</div>
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" className="text-white hover:bg-white/10"><Settings className="w-5 h-5" /></Button>
           <Button variant="ghost" size="icon" className="text-white hover:bg-white/10"><Share2 className="w-5 h-5" /></Button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center max-w-7xl mx-auto w-full">
        {/* Remote Peer */}
        <div className="relative aspect-video bg-[#1A1A2E] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <Avatar className="h-32 w-32 border-4 border-[#6C63FF]/30">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sessionData?.teacher_id?.name === user?.name ? sessionData?.learner_id?.name : sessionData?.teacher_id?.name}`} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-white font-medium">
              {sessionData?.teacher_id?.name === user?.name ? sessionData?.learner_id?.name : sessionData?.teacher_id?.name}
            </span>
          </div>
        </div>

        {/* Local Participant */}
        <div className="relative aspect-video bg-[#0F0F1A] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-slate-900">
             <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
             />
             {isVideoOff && (
               <div className="absolute inset-0 flex items-center justify-center">
                 <Avatar className="h-32 w-32 border-4 border-white/10 bg-[#1A1A2E]">
                   <AvatarFallback>ME</AvatarFallback>
                 </Avatar>
               </div>
             )}
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
            <span className="text-xs text-white font-medium">You (Preview)</span>
            {isMuted && <MicOff className="w-3 h-3 text-red-500" />}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="p-8 pb-12 flex justify-center items-center gap-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <Button 
          variant={isMuted ? "destructive" : "secondary"} 
          size="icon" 
          className={`w-14 h-14 rounded-full transition-all ${!isMuted ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' : ''}`}
          onClick={toggleAudio}
        >
          {isMuted ? <MicOff /> : <Mic />}
        </Button>
        <Button 
          variant={isVideoOff ? "destructive" : "secondary"} 
          size="icon" 
          className={`w-14 h-14 rounded-full transition-all ${!isVideoOff ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' : ''}`}
          onClick={toggleVideo}
        >
          {isVideoOff ? <VideoOff /> : <Video />}
        </Button>
        <div className="w-px h-10 bg-white/10 mx-2"></div>
        <Button 
          variant={showChat ? "secondary" : "ghost"} 
          size="icon" 
          className={`w-14 h-14 rounded-full transition-all ${showChat ? 'bg-[#6C63FF] text-white' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}
          onClick={() => setShowChat(!showChat)}
        >
          <MessageSquare />
        </Button>
        <Button 
          variant="destructive" 
          size="icon" 
          className="w-14 h-14 rounded-full shadow-lg shadow-red-500/20"
          onClick={async () => {
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            try {
              await api.patch(`/sessions/${id}`, { status: 'completed' });
              toast.success("Session completed!");
            } catch (err) {
              console.error("Error ending session", err);
            }
            navigate('/sessions');
          }}
        >
          <PhoneOff />
        </Button>
      </div>

      {showChat && (
        <div className="absolute top-20 right-6 bottom-32 w-80 bg-[#1A1A2E]/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-right-4">
          <div className="p-4 border-b border-white/5 bg-white/5">
            <h3 className="text-sm font-bold text-white">Session Chat</h3>
          </div>
          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
              <p className="text-xs text-[#6C63FF] font-black mb-1">Siddhesh Jain</p>
              <p className="text-sm text-white">Started a shared doc for the code exercises!</p>
            </div>
          </div>
          <div className="p-4 border-t border-white/5">
            <input 
              placeholder="Send a message..." 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#6C63FF]" 
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ children, className }) {
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${className}`}>
      {children}
    </span>
  );
}
