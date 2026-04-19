import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, ArrowUp } from 'lucide-react';

export default function Leaderboard() {
  const topUsers = [
    { id: 1, name: 'Siddhesh Jain', credits: 1250, trust: 99, skills: ['Python', 'AI'], rank: 1 },
    { id: 2, name: 'Mrunali Patil', credits: 980, trust: 97, skills: ['UI/UX', 'Figma'], rank: 2 },
    { id: 3, name: 'Ayush Sharma', credits: 850, trust: 98, skills: ['React', 'Node'], rank: 3 },
    { id: 4, name: 'Rahul Verma', credits: 720, trust: 95, skills: ['Java', 'SQL'], rank: 4 },
    { id: 5, name: 'Ankita Das', credits: 680, trust: 96, skills: ['Digital Mrkt', 'SEO'], rank: 5 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
          <Trophy className="text-yellow-500 w-10 h-10" /> Top Contributors
        </h1>
        <p className="text-[#94A3B8]">The most helpful teachers in the Skillora community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 pb-6">
        {/* Top 3 Podium */}
        <div className="order-2 md:order-1 flex flex-col items-center">
           <PodiumItem user={topUsers[1]} height="h-48" medal={<Medal className="text-slate-400 w-8 h-8" />} color="bg-slate-400/10" />
        </div>
        <div className="order-1 md:order-2 flex flex-col items-center -mt-8">
           <PodiumItem user={topUsers[0]} height="h-60" medal={<Trophy className="text-yellow-500 w-10 h-10" />} color="bg-yellow-500/10" border="border-yellow-500/50" />
        </div>
        <div className="order-3 md:order-3 flex flex-col items-center">
           <PodiumItem user={topUsers[2]} height="h-40" medal={<Award className="text-amber-600 w-8 h-8" />} color="bg-amber-600/10" />
        </div>
      </div>

      <Card className="bg-[#1A1A2E] border-[#2D2D44] overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-12 p-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider border-b border-[#2D2D44]">
             <div className="col-span-1">Rank</div>
             <div className="col-span-6">User</div>
             <div className="col-span-2 text-center">Trust</div>
             <div className="col-span-3 text-right">Credits</div>
          </div>
          {topUsers.map((user, idx) => (
            <div key={user.id} className="grid grid-cols-12 p-4 items-center hover:bg-[#20203a] transition-colors border-b border-[#2D2D44] last:border-0 group">
               <div className="col-span-1 font-mono text-lg text-[#94A3B8]">{user.rank}</div>
               <div className="col-span-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <div className="flex gap-1 mt-1">
                      {user.skills.map(s => <span key={s} className="text-[10px] bg-[#0F0F1A] px-1.5 py-0.5 rounded text-[#94A3B8]">{s}</span>)}
                    </div>
                  </div>
               </div>
               <div className="col-span-2 text-center">
                  <Badge className="bg-green-500/10 text-green-500 border-0">{user.trust}%</Badge>
               </div>
               <div className="col-span-3 text-right">
                  <div className="flex items-center justify-end gap-2 text-white font-bold">
                    {user.credits} <span className="text-xs text-[#94A3B8] font-normal">CR</span>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  </div>
               </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PodiumItem({ user, height, medal, color, border = "border-[#2D2D44]" }) {
  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="relative">
         <Avatar className="h-20 w-20 border-4 border-[#1A1A2E] shadow-2xl">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
         </Avatar>
         <div className="absolute -bottom-2 -right-2 bg-[#0F0F1A] p-1 rounded-full shadow-lg">
            {medal}
         </div>
      </div>
      <div className={`w-full ${height} ${color} ${border} border-t-2 rounded-t-3xl flex flex-col items-center p-6 text-center space-y-2 backdrop-blur-sm relative overflow-hidden group`}>
         <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
         <p className="text-lg font-bold text-white relative z-10">{user.name}</p>
         <p className="text-2xl font-black text-white relative z-10">{user.credits} <span className="text-sm font-normal opacity-60">CR</span></p>
         <div className="pt-2 relative z-10">
            <Badge className="bg-white/10 text-white hover:bg-white/20">Top 0.1%</Badge>
         </div>
      </div>
    </div>
  );
}
