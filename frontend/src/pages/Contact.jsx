import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, MapPin, Send, Globe, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const handleSend = (e) => {
    e.preventDefault();
    toast.success("Message received! Our team will get back to you within 24 hours.");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white leading-tight">Get in <span className="text-[#6C63FF]">Touch</span></h1>
            <p className="text-[#94A3B8] text-lg">Have questions about skill verification or premium plans? We're here to help you grow.</p>
          </div>

          <div className="space-y-6">
            <ContactInfo icon={<Mail className="text-blue-500" />} title="Email Us" value="support@skillora.com" />
            <ContactInfo icon={<MapPin className="text-rose-500" />} title="Headquarters" value="Skillora House, BKC, Mumbai 400051" />
            <ContactInfo icon={<MessageCircle className="text-green-500" />} title="Discord Community" value="discord.gg/skillora" />
          </div>

          <div className="pt-8">
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Follow Us</p>
            <div className="flex gap-4">
               <SocialLink icon={<Globe />} />
               <SocialLink icon={<Share2 />} />
               <SocialLink icon={<Mail />} />
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <Card className="bg-[#1A1A2E] border-[#2D2D44] overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl text-white">Send a Message</CardTitle>
            <CardDescription className="text-[#94A3B8]">Fill out the form below and we'll reply shortly.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <form onSubmit={handleSend} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase">Full Name</label>
                    <Input placeholder="John Doe" className="bg-[#0F0F1A] border-[#2D2D44] text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase">Email Address</label>
                    <Input placeholder="john@example.com" type="email" className="bg-[#0F0F1A] border-[#2D2D44] text-white" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase">Subject</label>
                  <select className="w-full bg-[#0F0F1A] border-[#2D2D44] text-sm text-white rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#6C63FF]">
                     <option>General Inquiry</option>
                     <option>Verification Support</option>
                     <option>Premium Account Issues</option>
                     <option>Bug Report</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase">Message</label>
                  <Textarea placeholder="How can we help you today?" className="bg-[#0F0F1A] border-[#2D2D44] text-white min-h-[150px]" />
               </div>
               <Button type="submit" className="w-full bg-[#6C63FF] hover:bg-[#4F46E5] text-white py-6 text-lg font-bold">
                  <Send className="w-5 h-5 mr-3" /> Send Message
               </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, value }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
       <div className="shrink-0">{icon}</div>
       <div>
         <p className="text-xs text-[#94A3B8] font-bold uppercase">{title}</p>
         <p className="text-white font-medium">{value}</p>
       </div>
    </div>
  );
}

function SocialLink({ icon }) {
  return (
    <button className="p-3 bg-white/5 rounded-xl text-[#94A3B8] hover:text-[#6C63FF] hover:bg-[#6C63FF]/10 transition-all">
       {icon}
    </button>
  );
}
