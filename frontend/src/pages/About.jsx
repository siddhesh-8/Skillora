import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Globe, Heart, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-10">
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
          Democratizing <span className="text-[#6C63FF]">Knowledge</span> <br />
          For Every Student.
        </h1>
        <p className="max-w-2xl mx-auto text-[#94A3B8] text-lg">
          Skillora is a decentralized platform where human potential is the primary currency. We connect learners and teachers in a peer-to-peer ecosystem powered by trust and AI.
        </p>
      </div>

      {/* Mission/Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[#1A1A2E] border-[#2D2D44] p-8 space-y-4">
          <div className="p-3 bg-purple-500/10 rounded-2xl w-fit"><Sparkles className="text-[#6C63FF] w-8 h-8" /></div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            To break down financial barriers to education by enabling anyone to pay for new skills by teaching what they already know. We believe everyone has something to teach and something to learn.
          </p>
        </Card>
        <Card className="bg-[#1A1A2E] border-[#2D2D44] p-8 space-y-4">
          <div className="p-3 bg-green-500/10 rounded-2xl w-fit"><Globe className="text-green-500 w-8 h-8" /></div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            A world where the value of a person's expertise is recognized globally, and high-quality learning is accessible to every student, regardless of their background or bank balance.
          </p>
        </Card>
      </div>

      {/* Values */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueItem icon={<Heart />} title="Community First" desc="We build tools that empower the people, not corporations." />
          <ValueItem icon={<Shield />} title="Trust & Transparency" desc="Every skill verified, every session rated by peers." />
          <ValueItem icon={<Sparkles />} title="Continuous Growth" desc="Learning is a lifelong journey, not a destination." />
        </div>
      </div>
    </div>
  );
}

function ValueItem({ icon, title, desc }) {
  return (
    <div className="text-center space-y-3 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
       <div className="text-[#6C63FF] w-fit mx-auto">{icon}</div>
       <h3 className="text-lg font-bold text-white">{title}</h3>
       <p className="text-sm text-[#94A3B8]">{desc}</p>
    </div>
  );
}
