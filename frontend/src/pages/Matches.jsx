import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Star, MessageSquare, Calendar, CheckCircle } from 'lucide-react';
import api from '../lib/api';
import { toast } from 'react-hot-toast';

export default function Matches() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    const q = searchParams.get('search') || '';
    if (q !== searchQuery) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/matches${searchQuery ? `?search=${searchQuery}` : ''}`);
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching matches", err);
        toast.error("Failed to load potential matches");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchMatches();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSearchParams(val ? { search: val } : {}, { replace: true });
  };

  const filteredMatches = matches.filter(match => {
    if (verifiedOnly && !match.is_verified) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Find Your Perfect Match</h1>
          <p className="text-[#94A3B8]">AI-powered matching based on your learning goals and teaching skills.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <Input 
              placeholder="Search by skill or name..." 
              className="pl-10 bg-[#1A1A2E] border-[#2D2D44] text-white rounded-xl focus:ring-[#6C63FF]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button 
            variant="outline"
            className={`rounded-xl border-[#2D2D44] gap-2 transition-all ${verifiedOnly ? 'bg-blue-600/10 border-blue-600/50 text-blue-400' : 'bg-[#1A1A2E] text-[#94A3B8] hover:text-white'}`}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
          >
            <CheckCircle className={`w-4 h-4 ${verifiedOnly ? 'fill-blue-500/20' : ''}`} />
            Verified Only
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <Card key={i} className="bg-[#1A1A2E] border-[#2D2D44] h-64 animate-pulse" />
          ))}
        </div>
      ) : filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match, idx) => (
            <Card key={idx} className="bg-[#1A1A2E] border-[#2D2D44] hover:border-[#6C63FF]/50 transition-all duration-300 group overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Avatar className="h-14 w-14 border-2 border-[#2D2D44] group-hover:border-[#6C63FF] transition-colors">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.name}`} />
                  <AvatarFallback>{match.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {match.name}
                      {match.is_verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{match.rating || 4.8}</span>
                    </div>
                  </CardTitle>
                  <p className="text-sm text-[#94A3B8]">{match.college || 'University Student'}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#6C63FF] uppercase tracking-wider">Teaches</p>
                  <div className="flex flex-wrap gap-2">
                    {match.skills_offered?.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-[#0F0F1A] text-white border-[#2D2D44]">
                        {skill.name || skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">Wants to Learn</p>
                  <div className="flex flex-wrap gap-2">
                    {match.skills_wanted?.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-[#94A3B8] border-[#2D2D44]">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-3 pt-4 border-t border-[#2D2D44]">
                <Button 
                  variant="ghost" 
                  className="text-[#94A3B8] hover:text-white hover:bg-[#2D2D44] gap-2"
                  onClick={() => navigate('/chat')}
                >
                  <MessageSquare className="w-4 h-4" /> Message
                </Button>
                <Button 
                  className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white gap-2"
                  onClick={() => {
                    setSelectedPeer(match);
                    setShowBooking(true);
                  }}
                >
                  <Calendar className="w-4 h-4" /> Book
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-[#1A1A2E] border-[#2D2D44] p-12 text-center">
          <p className="text-[#94A3B8] text-lg">No matches found matching your search. Try adding more skills to your profile!</p>
          <Button className="mt-6 bg-[#6C63FF] hover:bg-[#4F46E5] text-white" onClick={() => window.location.href='/dashboard'}>
            Update My Skills
          </Button>
        </Card>
      )}
      {showBooking && (
        <BookingModal 
          peer={selectedPeer} 
          onClose={() => setShowBooking(false)} 
        />
      )}
    </div>
  );
}

function BookingModal({ peer, onClose }) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    skill: peer?.skills_offered?.[0]?.name || '',
    date: '2026-10-15',
    time: '10:00 AM'
  });

  const currentSkillObj = peer?.skills_offered?.find(s => (s.name || s) === bookingData.skill);
  const currentCost = currentSkillObj?.creditValue || 20;

  const handleConfirm = async () => {
    const tid = toast.loading(`Booking session with ${peer.name}...`);
    try {
      const scheduled_at = new Date(`${bookingData.date} ${bookingData.time}`);
      await api.post('/sessions', {
        teacher_id: peer._id,
        skill: bookingData.skill,
        scheduled_at: scheduled_at.toISOString(),
        credit_cost: currentCost
      });
      toast.success(`Success! Session booked for ${bookingData.date} at ${bookingData.time}`, { id: tid });
      onClose();
    } catch (err) {
      console.error("Booking error", err);
      toast.error(err.response?.data?.message || "Failed to book session", { id: tid });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md bg-[#1A1A2E] border-[#2D2D44] shadow-2xl animate-in zoom-in-95 duration-300">
        <CardHeader className="border-b border-white/5 pb-6">
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="text-[#6C63FF]" /> Book a Session
          </CardTitle>
          <p className="text-sm text-[#94A3B8]">Scheduling with {peer.name}</p>
        </CardHeader>
        <CardContent className="py-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#94A3B8] uppercase">Select Skill</label>
              <select 
                className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
                value={bookingData.skill}
                onChange={(e) => setBookingData({...bookingData, skill: e.target.value})}
              >
                {peer.skills_offered?.map((s, i) => (
                  <option key={i} value={s.name || s}>{s.name || s}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#94A3B8] uppercase">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#94A3B8] uppercase">Time Slot</label>
                <select 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                >
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                  <option>06:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#6C63FF]/5 rounded-2xl border border-[#6C63FF]/10">
             <div className="flex justify-between items-center text-sm">
                <span className="text-[#94A3B8]">Session Cost</span>
                <span className="font-bold text-white">{currentCost} Credits</span>
             </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 pt-0">
          <Button variant="ghost" onClick={onClose} className="text-[#94A3B8] hover:text-white hover:bg-[#2D2D44]">Cancel</Button>
          <Button onClick={handleConfirm} className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white">Confirm Booking</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
