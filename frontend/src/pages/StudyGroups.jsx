import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, MessageSquare, Files, Info, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function StudyGroups() {
  const [activeGroup, setActiveGroup] = useState(null);

  const mockGroups = [
    { id: 1, name: 'Web Dev Wizards', topic: 'React & Node', members: 42, max: 50, description: 'Deep dive into fullstack development with MERN.', activity: 'High' },
    { id: 2, name: 'Python Explorers', topic: 'Data Science', members: 28, max: 50, description: 'Learning NumPy, Pandas, and Matplotlib together.', activity: 'Medium' },
    { id: 3, name: 'UI/UX Collective', topic: 'Figma Design', members: 50, max: 50, description: 'Collaborative design critiques and resource sharing.', status: 'full' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Users className="text-[#6C63FF] w-10 h-10" /> Study Groups
          </h1>
          <p className="text-[#94A3B8]">Join or create collaborative learning communities.</p>
        </div>
        <Button className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white gap-2 py-6 px-6 rounded-2xl shadow-lg shadow-[#6C63FF]/20">
          <Plus className="w-5 h-5" /> Create New Group
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Group Listing or Selected Group */}
        <div className="lg:col-span-2 space-y-6">
          {!activeGroup ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockGroups.map((group) => (
                <Card key={group.id} className="bg-[#1A1A2E] border-[#2D2D44] hover:border-[#6C63FF]/50 transition-all group overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                       <Badge className="bg-blue-500/10 text-blue-500 border-0">{group.topic}</Badge>
                       {group.status === 'full' && <Badge className="bg-red-500/10 text-red-500 border-0">Full</Badge>}
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-[#6C63FF] transition-colors">{group.name}</CardTitle>
                    <CardDescription className="text-[#94A3B8] line-clamp-2">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                       <div className="flex items-center gap-2 text-[#94A3B8]">
                          <Users className="w-4 h-4" />
                          <span>{group.members}/{group.max} members</span>
                       </div>
                       <div className="flex items-center gap-2 text-[#10B981]">
                          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                          <span>{group.activity} Activity</span>
                       </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      onClick={() => setActiveGroup(group)}
                      disabled={group.status === 'full'}
                      className="w-full bg-[#2D2D44] hover:bg-[#6C63FF] text-white transition-all"
                    >
                      {group.status === 'full' ? 'Waitlist' : 'Join Group'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-[#1A1A2E] border-[#2D2D44] h-[600px] flex flex-col">
               <CardHeader className="border-b border-white/5 bg-white/5">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <Button variant="ghost" onClick={() => setActiveGroup(null)} className="p-0 hover:bg-transparent text-[#94A3B8]">Back</Button>
                       <div>
                         <CardTitle className="text-white">{activeGroup.name}</CardTitle>
                         <p className="text-xs text-[#94A3B8]">{activeGroup.members} active members</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="outline" size="icon" className="border-[#2D2D44] text-white"><Files className="w-4 h-4" /></Button>
                       <Button variant="destructive" className="bg-red-500/10 text-red-500 border-0 hover:bg-red-500 hover:text-white" onClick={() => setActiveGroup(null)}>Leave</Button>
                    </div>
                 </div>
               </CardHeader>
               <CardContent className="flex-grow p-4 space-y-4 overflow-y-auto">
                  <div className="bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
                     <p className="text-xs font-bold text-blue-500 mb-1 flex items-center gap-1"><Info className="w-3 h-3" /> Announcement</p>
                     <p className="text-sm text-white font-medium">Next group call scheduled for Sunday at 6 PM. Check the files section for the agenda.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                       <Avatar className="w-8 h-8"><AvatarFallback className="bg-blue-900 text-xs">AJ</AvatarFallback></Avatar>
                       <div className="bg-[#0F0F1A] border border-[#2D2D44] p-3 rounded-2xl rounded-tl-none">
                          <p className="text-[10px] font-black text-blue-500 mb-1">Amelia Jones</p>
                          <p className="text-sm text-white">Does anyone have notes on React Context API?</p>
                       </div>
                    </div>
                  </div>
               </CardContent>
               <CardFooter className="p-4 border-t border-white/5 bg-white/5">
                  <div className="flex gap-2 w-full">
                     <input placeholder="Type your collective knowledge..." className="flex-grow bg-[#0F0F1A] border border-[#2D2D44] rounded-xl px-4 text-sm text-white focus:outline-none" />
                     <Button className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white">Send</Button>
                  </div>
               </CardFooter>
            </Card>
          )}
        </div>

        {/* Sidebar: Recommendations & Stats */}
        <div className="space-y-6">
           <Card className="bg-[#1A1A2E] border-[#2D2D44]">
             <CardHeader>
               <CardTitle className="text-lg text-white">Recommended for You</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                {['Javascript Basics', 'Creative Design', 'Digital Marketing'].map((t, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0F0F1A] rounded-xl flex items-center justify-center text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white transition-all">
                           <Users className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">{t}</p>
                     </div>
                     <Plus className="w-4 h-4 text-[#94A3B8] group-hover:text-[#6C63FF]" />
                  </div>
                ))}
             </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-[#1A1A2E] to-[#6C63FF]/5 border-[#2D2D44]">
             <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-[#6C63FF]/20 rounded-full flex items-center justify-center mx-auto">
                   <Users className="w-8 h-8 text-[#6C63FF]" />
                </div>
                <h3 className="text-lg font-bold text-white">Active in 0 groups</h3>
                <p className="text-sm text-[#94A3B8]">Join a study group to learn faster with global peers.</p>
                <Button variant="outline" className="w-full border-[#2D2D44] text-[#94A3B8] hover:text-white">View My Activity</Button>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
