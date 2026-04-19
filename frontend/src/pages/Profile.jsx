import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Edit2, MapPin, School, Globe, Mail, Calendar, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { user, getProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Profile Header */}
      <Card className="bg-[#1A1A2E] border-[#2D2D44] overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] opacity-20"></div>
        <CardContent className="px-8 pb-8 -mt-16 flex flex-col md:flex-row items-end gap-6 relative z-10">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-[#1A1A2E] shadow-2xl bg-[#0F0F1A]">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
              <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-1 right-1 p-2 bg-[#6C63FF] rounded-full text-white shadow-lg border-2 border-[#1A1A2E]">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-grow pb-2 space-y-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
              <Badge className="bg-[#10B981]/10 text-[#10B981] border-0 text-[10px] uppercase font-black">Verified</Badge>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[#94A3B8] text-sm">
              <span className="flex items-center gap-1"><School className="w-4 h-4" /> {user?.college || 'University Partner'}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Mumbai, IN</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined Oct 2026</span>
            </div>
          </div>
          <div className="pb-2">
            <Button variant="outline" className="border-[#2D2D44] text-white hover:bg-[#2D2D44] gap-2">
              <Edit2 className="w-4 h-4" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: About & Skills */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-[#1A1A2E] border-[#2D2D44]">
            <CardHeader><CardTitle className="text-xl text-white">Bio</CardTitle></CardHeader>
            <CardContent>
              <p className="text-[#94A3B8] leading-relaxed">
                {user?.bio || 'Passionate about decentralized education and peer-to-peer knowledge sharing. Building the future of Skillora.'}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="bg-[#1A1A2E] border-[#2D2D44]">
                <CardHeader><CardTitle className="text-lg text-white">Skills I Offer</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                   {user?.skills_offered?.map((s, i) => (
                     <Badge key={i} className="bg-[#6C63FF]/10 text-[#6C63FF] border-0 px-3 py-1">
                        {s.name} • {s.level}
                     </Badge>
                   ))}
                </CardContent>
             </Card>
             <Card className="bg-[#1A1A2E] border-[#2D2D44]">
                <CardHeader><CardTitle className="text-lg text-white">Interested in</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                   {user?.skills_wanted?.map((s, i) => (
                     <Badge key={i} variant="outline" className="border-[#2D2D44] text-[#94A3B8] px-3 py-1">
                        {s}
                     </Badge>
                   ))}
                </CardContent>
             </Card>
          </div>
        </div>

        {/* Right: Stats & Social */}
        <div className="space-y-8">
          <Card className="bg-[#1A1A2E] border-[#2D2D44]">
            <CardHeader><CardTitle className="text-lg text-white">Trust Metrics</CardTitle></CardHeader>
            <CardContent className="space-y-4">
               <StatItem label="Session Rating" value="4.9 / 5.0" color="text-yellow-500" />
               <StatItem label="Credits Earned" value={user?.credits_earned || 0} color="text-purple-500" />
               <StatItem label="Trust Index" value={`${user?.trust_score || 0}%`} color="text-green-500" />
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A2E] border-[#2D2D44]">
            <CardHeader><CardTitle className="text-lg text-white">Socials</CardTitle></CardHeader>
            <CardContent className="space-y-3">
               <SocialLink icon={<Globe />} label="myportfolio.dev" />
               <SocialLink icon={<Mail />} label="contact@profile.dev" />
               <SocialLink icon={<Globe />} label="myportfolio.dev" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[#2D2D44] last:border-0 text-sm">
       <span className="text-[#94A3B8]">{label}</span>
       <span className={`font-bold ${color}`}>{value}</span>
    </div>
  );
}

function SocialLink({ icon, label }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0F1A] hover:bg-[#2D2D44] transition-colors cursor-pointer group">
       <div className="text-[#94A3B8] group-hover:text-white transition-colors">{React.cloneElement(icon, { size: 18 })}</div>
       <span className="text-xs text-[#94A3B8] group-hover:text-white transition-colors">{label}</span>
    </div>
  );
}
