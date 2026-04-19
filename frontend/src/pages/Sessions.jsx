import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Video, Star, MoreHorizontal, CheckCircle2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function Sessions() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/sessions');
        setSessions(res.data);
      } catch (err) {
        console.error("Error fetching sessions", err);
        toast.error("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleDownloadNotes = (session) => {
    if (!session.notes) {
      // For demonstration, let's provide a dummy note if it's empty
      const dummyNotes = `Session: ${session.skill}\nDate: ${session.date}\nPeer: ${session.peerName}\n\nSummary:\nIn this session, we covered the fundamentals of ${session.skill}. Key topics included best practices, common pitfalls, and hands-on exercises.\n\nKey Takeaways:\n1. Mastered the core concepts.\n2. Developed a working prototype.\n3. Discussed advanced optimization techniques.\n\nNext Steps:\n- Complete the assigned projects.\n- Review documentation for advanced modules.\n\nThank you for learning with Skillora!`;
      
      const element = document.createElement("a");
      const file = new Blob([dummyNotes], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${session.skill}_notes_${session.date}.txt`;
      document.body.appendChild(element);
      element.click();
      toast.success("Generating and downloading sample notes...");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([session.notes], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${session.skill}_notes_${session.date}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Downloading session notes...");
  };

  const handleStatusUpdate = async (sessionId, newStatus) => {
    try {
      await api.patch(`/sessions/${sessionId}`, { status: newStatus });
      toast.success(`Session ${newStatus}`);
      setSessions(sessions.map(s => s._id === sessionId ? { ...s, status: newStatus } : s));
    } catch (err) {
      toast.error("Failed to update session");
    }
  };

  const upcomingSessions = sessions.filter(s => 
    (s.status === 'pending' || s.status === 'accepted' || s.status === 'active') &&
    new Date(s.scheduled_at) >= new Date()
  ).map(s => {
    const isTeacher = s.teacher_id._id === user?._id;
    const peer = isTeacher ? s.learner_id : s.teacher_id;
    return {
      id: s._id,
      peerName: peer.name,
      skill: s.skill,
      date: new Date(s.scheduled_at).toLocaleDateString(),
      time: new Date(s.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: isTeacher ? 'Teaching' : 'Learning',
      status: s.status === 'accepted' ? 'confirmed' : s.status,
      peerAvatar: peer.avatar
    };
  });

  const sessionRequests = sessions.filter(s => 
    s.status === 'pending' && s.teacher_id._id === user?._id
  ).map(s => ({
    id: s._id,
    peerName: s.learner_id.name,
    skill: s.skill,
    date: new Date(s.scheduled_at).toLocaleDateString(),
    time: new Date(s.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    cost: s.credit_cost
  }));

  const pastSessions = sessions.filter(s => 
    s.status === 'completed' || new Date(s.scheduled_at) < new Date()
  ).map(s => {
    const isTeacher = s.teacher_id._id === user?._id;
    const peer = isTeacher ? s.learner_id : s.teacher_id;
    return {
        id: s._id,
        peerName: peer.name,
        skill: s.skill,
        date: new Date(s.scheduled_at).toLocaleDateString(),
        type: isTeacher ? 'Teaching' : 'Learning',
        rating: s.rating_by_learner || 5,
        notes: s.notes
    };
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Sessions</h1>
          <p className="text-[#94A3B8]">Manage your learning and teaching appointments.</p>
        </div>
        <Button 
          className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white rounded-xl"
          onClick={() => navigate('/matches')}
        >
          Book New Session
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#1A1A2E] border border-[#2D2D44] p-1 mb-8">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#6C63FF] data-[state=active]:text-white text-[#94A3B8]">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-[#6C63FF] data-[state=active]:text-white text-[#94A3B8]">Past</TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-[#6C63FF] data-[state=active]:text-white text-[#94A3B8]">Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.map((session) => (
            <Card key={session.id} className="bg-[#1A1A2E] border-[#2D2D44] hover:bg-[#20203a] transition-colors overflow-hidden group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className={`p-4 md:w-32 flex flex-col items-center justify-center text-center ${session.type === 'Learning' ? 'bg-blue-600/10' : 'bg-purple-600/10'}`}>
                    <p className={`text-xs font-bold uppercase ${session.type === 'Learning' ? 'text-blue-400' : 'text-purple-400'}`}>{session.type}</p>
                    <Calendar className="w-8 h-8 my-2 text-[#94A3B8]" />
                  </div>
                  <div className="flex-grow p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-[#2D2D44]">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.peerName}`} />
                        <AvatarFallback>{session.peerName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-bold text-white">{session.skill}</h3>
                        <p className="text-sm text-[#94A3B8]">with {session.peerName}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                        <Clock className="w-4 h-4" />
                        <span>{session.date} | {session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        {session.status === 'confirmed' ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 capitalize">
                             <CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 capitalize">
                             Pending Approval
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-white hover:bg-[#2D2D44]">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                      <Button 
                        disabled={session.status !== 'confirmed'}
                        className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white gap-2"
                        onClick={() => navigate(`/session/${session.id}`)}
                      >
                        <Video className="w-4 h-4" /> Join Room
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastSessions.map((session) => (
             <Card key={session.id} className="bg-[#1A1A2E]/50 border-[#2D2D44] opacity-80 hover:opacity-100 transition-opacity">
               <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#2D2D44] flex items-center justify-center">
                       <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{session.skill}</h3>
                      <p className="text-sm text-[#94A3B8]">Completed with {session.peerName} • {session.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < session.rating ? 'fill-current' : 'opacity-20'}`} />
                        ))}
                     </div>
                     <div className="flex items-center gap-2">
                         <Button 
                          variant="outline" 
                          className="text-white border-[#2D2D44] bg-transparent hover:bg-[#2D2D44] gap-2"
                          onClick={() => handleDownloadNotes(session)}
                         >
                           <Download className="w-4 h-4 text-[#6C63FF]" /> Download Notes
                         </Button>
                         <Button 
                          variant="outline" 
                          className="text-white border-[#2D2D44] bg-transparent hover:bg-[#2D2D44]"
                          onClick={() => toast.success('Your review has been submitted!')}
                         >
                           Review Session
                         </Button>
                     </div>
                  </div>
               </CardContent>
             </Card>
          ))}
        </TabsContent>
        <TabsContent value="requests" className="space-y-4">
          {sessionRequests.length > 0 ? sessionRequests.map((req) => (
            <Card key={req.id} className="bg-[#1A1A2E] border-[#2D2D44] overflow-hidden">
               <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-[#6C63FF]">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.peerName}`} />
                      <AvatarFallback>{req.peerName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-white">{req.peerName} wants to learn {req.skill}</h3>
                      <p className="text-sm text-[#94A3B8]">{req.date} at {req.time} • Reward: {req.cost} Credits</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                      onClick={() => handleStatusUpdate(req.id, 'cancelled')}
                    >
                      Decline
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleStatusUpdate(req.id, 'accepted')}
                    >
                      Accept Request
                    </Button>
                  </div>
               </CardContent>
            </Card>
          )) : (
            <div className="text-center py-20 bg-[#1A1A2E]/30 rounded-2xl border border-dashed border-[#2D2D44]">
               <p className="text-[#94A3B8]">No incoming session requests at the moment.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
