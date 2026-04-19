import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Star, Wallet, Calendar, Sparkles, Plus, Clock, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { user, getProfile } = useAuthStore();
  const [matches, setMatches] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getProfile();
      try {
        const [matchRes, sessionRes, statsRes] = await Promise.all([
          api.get('/matches'),
          api.get('/sessions'),
          api.get('/users/stats')
        ]);
        setMatches(matchRes.data);
        setSessions(sessionRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-white">Loading your dashboard...</div>;

  const upcomingSessions = sessions.filter(s => 
    (s.status === 'accepted' || s.status === 'active') &&
    new Date(s.scheduled_at) >= new Date(Date.now() - 3600000) // Within last hour or future
  ).slice(0, 3);

  const creditHistory = stats?.creditHistory || [
    { name: 'Mon', earned: 0, spent: 0 },
    { name: 'Tue', earned: 0, spent: 0 },
    { name: 'Wed', earned: 0, spent: 0 },
    { name: 'Thu', earned: 0, spent: 0 },
    { name: 'Fri', earned: 0, spent: 0 },
    { name: 'Sat', earned: 0, spent: 0 },
    { name: 'Sun', earned: 0, spent: 0 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-[#94A3B8] mt-1">Here's your learning & teaching summary.</p>
        </div>
        <div className="flex gap-4">
          <Card className="bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] text-white border-0 shadow-lg shadow-purple-500/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-full">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">Credit Balance</p>
                <p className="text-2xl font-bold">{user?.credits || 0} <span className="text-sm font-normal">CR</span></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3 bg-[#1A1A2E] border border-[#2D2D44] rounded-xl p-1 mb-8">
          <TabsTrigger value="overview" className="rounded-lg text-[#94A3B8] data-[state=active]:bg-[#2D2D44] data-[state=active]:text-white transition-all">Overview</TabsTrigger>
          <TabsTrigger value="learning" className="rounded-lg text-[#94A3B8] data-[state=active]:bg-[#2D2D44] data-[state=active]:text-white transition-all">Learning</TabsTrigger>
          <TabsTrigger value="teaching" className="rounded-lg text-[#94A3B8] data-[state=active]:bg-[#2D2D44] data-[state=active]:text-white transition-all">Teaching</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Trust Score" value={`${user?.trust_score || 0}%`} icon={<Star className="w-5 h-5 text-yellow-500" />} subtitle="Your reliability rating" />
            <StatsCard title="Sessions Completed" value={stats?.sessionsCompleted || user?.sessions_completed || 0} icon={<Calendar className="w-5 h-5 text-blue-500" />} subtitle="Total sessions" />
            <StatsCard title="Credits Earned" value={stats?.totalEarned || user?.credits_earned || 0} icon={<Sparkles className="w-5 h-5 text-purple-500" />} subtitle="All time" />
            <StatsCard title="Credits Spent" value={stats?.totalSpent || user?.credits_spent || 0} icon={<Wallet className="w-5 h-5 text-rose-500" />} subtitle="All time" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 shadow-md border-[#2D2D44] bg-[#1A1A2E] hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Wallet className="w-5 h-5 text-blue-600" /> Credit Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={creditHistory}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1A1A2E', borderRadius: '8px', border: '1px solid #2D2D44', color: '#fff'}} />
                    <Bar dataKey="earned" fill="#8b5cf6" radius={[4,4,0,0]} name="Earned" />
                    <Bar dataKey="spent" fill="#e11d48" radius={[4,4,0,0]} name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Upcoming Sessions Section */}
              <Card className="shadow-md border-[#2D2D44] bg-[#1A1A2E] overflow-hidden">
                <CardHeader className="border-b border-white/5">
                  <CardTitle className="text-lg flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-5 h-5 text-green-500" />
                       Upcoming Sessions
                    </div>
                    {upcomingSessions.length > 0 && <Badge className="bg-green-500/20 text-green-400 border-0">{upcomingSessions.length}</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {upcomingSessions.length > 0 ? (
                    <div className="divide-y divide-white/5">
                      {upcomingSessions.map((session, i) => {
                        const isTeacher = session.teacher_id._id === user?._id;
                        const peer = isTeacher ? session.learner_id : session.teacher_id;
                        return (
                          <div key={i} className="p-4 hover:bg-white/5 transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${peer.name}`} />
                                  <AvatarFallback>{peer.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-semibold text-white">{session.skill}</p>
                                  <p className="text-[10px] text-[#94A3B8]">with {peer.name} • {isTeacher ? 'Teaching' : 'Learning'}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-[10px] uppercase">{session.status}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                               <div className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(session.scheduled_at).toLocaleDateString()} at {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                               </div>
                               <Button 
                                size="sm" 
                                className="h-7 text-[10px] bg-[#6C63FF] hover:bg-[#4F46E5] text-white px-3"
                                onClick={() => navigate(`/session/${session._id}`)}
                               >
                                 Join Room
                               </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                       <p className="text-xs text-[#94A3B8]">No upcoming sessions scheduled.</p>
                       <Button variant="link" size="sm" className="text-[#6C63FF] mt-2" onClick={() => navigate('/sessions')}>Manage Sessions</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-md border-[#2D2D44] bg-[#1A1A2E] hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-white">
                    <Brain className="w-5 h-5 text-indigo-500" />
                    Smart Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {matches.length > 0 ? matches.map((match, i) => (
                    <div 
                      key={i} 
                      className="flex justify-between items-center p-3 rounded-xl hover:bg-[#0F0F1A] transition-colors group cursor-pointer"
                      onClick={() => navigate('/chat')}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#6C63FF] transition-all">
                          <AvatarFallback className="bg-blue-900 text-blue-200">{match.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-semibold text-white">{match.name}</p>
                            {match.is_verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />}
                          </div>
                          <p className="text-xs text-[#94A3B8]">{match.skills_offered[0]?.name || 'Skill'} • Rating: {match.rating || 4.8}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-[#2D2D44] text-white hover:bg-[#3D3D5A]">{match.skills_offered[0]?.creditValue || 10} CR</Badge>
                    </div>
                  )) : (
                    <p className="text-center text-[#94A3B8] py-4">No matches found yet. Add more skills!</p>
                  )}
                  <Button 
                    className="w-full mt-2 bg-[#6C63FF] hover:bg-[#4F46E5] text-white rounded-xl shadow-md border-0" 
                    variant="outline"
                    onClick={() => navigate('/matches')}
                  >
                    View All Matches
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="learning">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.skills_wanted?.map((skill, i) => (
              <Card key={i} className="bg-[#1A1A2E] border-[#2D2D44] hover:border-[#6C63FF]/50 transition-all group overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg text-white font-bold">{skill}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                     <div className="flex justify-between text-xs text-[#94A3B8]">
                        <span>Matching Progress</span>
                        <span>{20 + (i * 15)}%</span>
                     </div>
                     <Progress value={20 + (i * 15)} className="h-1.5 bg-[#0F0F1A]" />
                   </div>
                   <Button variant="ghost" className="w-full text-xs text-[#6C63FF] hover:bg-[#6C63FF]/10 gap-2">
                      Explore Teachers <Calendar className="w-3 h-3" />
                   </Button>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-[#1A1A2E] border-dashed border-[#2D2D44] flex flex-col items-center justify-center p-8 gap-4 hover:bg-[#2D2D44]/30 cursor-pointer transition-colors group">
                <div className="p-4 bg-[#2D2D44] rounded-full group-hover:scale-110 transition-transform"><Sparkles className="w-6 h-6 text-[#94A3B8]" /></div>
                <p className="text-sm font-bold text-white">Add New Skill</p>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="teaching">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.skills_offered?.map((skill, i) => (
              <Card key={i} className="bg-[#1A1A2E] border-[#2D2D44] hover:border-[#10B981]/50 transition-all group overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="p-3 bg-green-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-white font-bold">{skill.name}</CardTitle>
                      <Badge className="bg-[#10B981]/10 text-[#10B981] border-0 text-[10px] uppercase font-bold tracking-tighter">{skill.level}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-yellow-500">
                         <Star className="w-4 h-4 fill-current" />
                         <span className="text-sm font-bold">4.9</span>
                      </div>
                      <p className="text-xs text-[#94A3B8]">{skill.sessionsCompleted || 0} sessions completed</p>
                   </div>
                   <div className="flex gap-2">
                      <Badge variant="outline" className="border-[#2D2D44] text-[#94A3B8] text-[10px]">Verified</Badge>
                      <Badge variant="outline" className="border-[#2D2D44] text-[#94A3B8] text-[10px]">Top Rated</Badge>
                   </div>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-[#1A1A2E] border-dashed border-[#2D2D44] flex flex-col items-center justify-center p-8 gap-4 hover:bg-[#2D2D44]/30 cursor-pointer transition-colors group">
                <div className="p-4 bg-[#2D2D44] rounded-full group-hover:scale-110 transition-transform"><Plus className="w-6 h-6 text-[#94A3B8]" /></div>
                <p className="text-sm font-bold text-white">Offer Another Skill</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({ title, value, subtitle, icon }) {
  return (
    <Card className="relative overflow-hidden group hover:-translate-y-1 transition-transform border-[#2D2D44] shadow-sm hover:shadow-md bg-[#1A1A2E]">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#94A3B8]">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
          </div>
          <div className="p-3 bg-[#0F0F1A] rounded-xl group-hover:bg-[#1A1A2E] transition-colors">
            {icon}
          </div>
        </div>
        <p className="text-xs text-[#94A3B8] mt-4">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
