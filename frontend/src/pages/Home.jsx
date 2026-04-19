import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col animate-in fade-in zoom-in duration-500">
      
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 items-center text-center overflow-hidden flex flex-col justify-center min-h-[80vh]">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1A2E] via-[#0F0F1A] to-[#0F0F1A]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20 text-sm font-semibold mb-4 backdrop-blur-md">
            🚀 The Future of Peer Learning represents Skillora 2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Learn anything. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#F59E0B]">Teach what you know.</span>
          </h1>
          <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Skillora is a decentralized, AI-powered peer learning platform where your skills act as currency. No cash required. Exchange knowledge seamlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-3.5 bg-[#6C63FF] hover:bg-[#4F46E5] text-white rounded-full font-bold shadow-lg shadow-[#6C63FF]/30 transition flex items-center justify-center gap-2">
              Start Learning Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/matches" className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1A2E] hover:bg-[#2D2D44] text-white border border-[#2D2D44] rounded-full font-bold transition flex items-center justify-center gap-2">
              Explore Teachers
            </Link>
          </div>
          
          <div className="pt-12 flex justify-center items-center gap-8 text-[#94A3B8] text-sm font-medium">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10B981]"></div> 10,000+ Active Users</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div> 500+ Skills Available</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#6C63FF]"></div> AI Smart Matching</div>
          </div>
        </div>
      </section>

      {/* How it Works / Features */}
      <section className="py-24 bg-[#16213E]/50 border-y border-[#2D2D44]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Skillora Works</h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto">Three simple steps to unlock a world of knowledge using our dynamic credit system.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A2E] p-8 rounded-2xl border border-[#2D2D44] hover:border-[#6C63FF]/50 transition duration-300">
              <div className="w-14 h-14 rounded-full bg-[#6C63FF]/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#6C63FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Build Your Profile</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">List the skills you want to learn, and the skills you can teach. Get 50 starter credits instantly.</p>
            </div>
            
            <div className="bg-[#1A1A2E] p-8 rounded-2xl border border-[#2D2D44] hover:border-[#F59E0B]/50 transition duration-300 relative">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white text-xs font-bold px-3 py-1 rounded-full">AI Powered</div>
              <div className="w-14 h-14 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Get Smart Matched</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Let our GPT-4o powered engine find the perfect peer for you based on skill overlap, rating, and availability.</p>
            </div>
            
            <div className="bg-[#1A1A2E] p-8 rounded-2xl border border-[#2D2D44] hover:border-[#10B981]/50 transition duration-300">
              <div className="w-14 h-14 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Exchange & Grow</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">Join 1-on-1 WebRTC video sessions. Earn credits for teaching, spend them to learn. Build your Trust Score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section on Home */}
      <section className="py-24 bg-[#1A1A2E]/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">We build tools for the <span className="text-[#6C63FF]">next generation</span> of learners.</h2>
            <p className="text-[#94A3B8] leading-relaxed">Skillora was founded by a group of students who were tired of paying for expensive courses while having valuable skills of their own. We created a circular economy of knowledge where everyone wins.</p>
            <div className="flex gap-4">
               <Link to="/about" className="text-[#6C63FF] font-bold hover:underline">Learn more about our mission →</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#6C63FF]/10 p-8 rounded-3xl border border-[#6C63FF]/20 text-center">
                <p className="text-4xl font-black text-white">2.5k+</p>
                <p className="text-xs text-[#94A3B8] uppercase mt-2">Hours Taught</p>
             </div>
             <div className="bg-[#10B981]/10 p-8 rounded-3xl border border-[#10B981]/20 text-center">
                <p className="text-4xl font-black text-white">99%</p>
                <p className="text-xs text-[#94A3B8] uppercase mt-2">Satisfaction</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0F0F1A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-[#6C63FF]/20 to-[#F59E0B]/20 p-12 rounded-3xl border border-[#2D2D44] backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to stop paying for courses?</h2>
            <p className="text-lg text-[#94A3B8] mb-8">Join the fastest growing peer-learning network for students.</p>
            <Link to="/signup" className="inline-flex px-8 py-4 bg-white text-[#0F0F1A] hover:bg-gray-200 rounded-full font-bold shadow-lg transition items-center gap-2">
              Create Free Account <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
