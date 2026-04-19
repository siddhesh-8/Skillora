import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Edit3, Eye, CheckCircle, Globe, Mail, Phone, MapPin, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function ResumeBuilder() {
  const { user } = useAuthStore();
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [isPreview, setIsPreview] = useState(true);

  const handleDownload = () => {
    toast.loading("Generating your professional resume...");
    setTimeout(() => {
      toast.dismiss();
      window.print(); // Simple way to generate PDF via print dialog
      toast.success("Resume ready for download!");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <FileText className="text-[#6C63FF] w-10 h-10" /> AI Resume Builder
          </h1>
          <p className="text-[#94A3B8]">Transform your Skillora achievements into a professional career asset.</p>
        </div>
        <div className="flex gap-4">
           <Button 
            variant="outline" 
            onClick={() => setIsPreview(!isPreview)}
            className="border-[#2D2D44] text-white hover:bg-[#2D2D44] transition-all"
           >
             {isPreview ? <Edit3 className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
             {isPreview ? 'Edit Sections' : 'Preview Mode'}
           </Button>
           <Button 
            onClick={handleDownload}
            className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white px-8 shadow-lg shadow-[#6C63FF]/20 transition-all font-bold"
           >
             <Download className="w-4 h-4 mr-2" /> Download PDF
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Templates & AI Tools */}
        <div className="space-y-6">
           <Card className="bg-[#1A1A2E] border-[#2D2D44]">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Choose Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Modern Professional', 'Academic Impact', 'Minimalist Tech'].map((t, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveTemplate(t.toLowerCase().split(' ')[0])}
                    className={`w-full p-4 rounded-xl border transition-all text-left ${
                      activeTemplate === t.toLowerCase().split(' ')[0] 
                        ? 'border-[#6C63FF] bg-[#6C63FF]/10 text-white' 
                        : 'border-[#2D2D44] bg-[#0F0F1A] text-[#94A3B8] hover:border-[#6C63FF]/30'
                    }`}
                  >
                    <p className="text-sm font-bold">{t}</p>
                  </button>
                ))}
              </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-[#1A1A2E] to-[#6C63FF]/10 border-[#2D2D44]">
             <CardHeader>
                <CardTitle className="text-xs font-bold text-[#6C63FF] uppercase flex items-center gap-2">
                  <Award className="w-4 h-4" /> AI Suggestions
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <p className="text-xs text-[#94A3B8] italic">"Based on your profile, you should highlight your 'React' expertise as a 'Top 5% Peer Teacher'."</p>
                <Button variant="ghost" className="w-full text-xs text-[#6C63FF] bg-[#6C63FF]/5 hover:bg-[#6C63FF]/20">Apply Recommendation</Button>
             </CardContent>
           </Card>
        </div>

        {/* Main Resume Canvas */}
        <div className="lg:col-span-3">
           <div className={`bg-white text-slate-900 rounded-lg shadow-2xl overflow-hidden min-h-[1000px] print:shadow-none p-12 transition-all duration-500 transform ${isPreview ? 'scale-100' : 'scale-[0.98] blur-[1px]'}`}>
              {/* Resume Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                 <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">{user?.name || 'Your Name'}</h1>
                    <p className="text-xl text-slate-500 font-medium">Full Stack Developer & Peer Educator</p>
                 </div>
                 <div className="text-right space-y-1 text-sm text-slate-500">
                    <p className="flex items-center justify-end gap-2">{user?.email} <Mail className="w-3 h-3" /></p>
                    <p className="flex items-center justify-end gap-2">+91 98765 43210 <Phone className="w-3 h-3" /></p>
                    <p className="flex items-center justify-end gap-2">Mumbai, India <MapPin className="w-3 h-3" /></p>
                    <p className="flex items-center justify-end gap-2">github.com/{user?.name?.toLowerCase().replace(' ', '')} <Globe className="w-3 h-3" /></p>
                 </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                 <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Professional Summary</h3>
                 <p className="text-slate-700 leading-relaxed">
                   Dynamic student at <strong>{user?.college || 'Skillora Institute'}</strong> with a strong track record of collaborative learning and peer teaching. Verified expert in technical education with over {user?.sessions_completed || 10} sessions successfully delivered to a global network of peers.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-12">
                 <div className="space-y-8">
                    {/* Education */}
                    <div>
                       <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Education</h3>
                       <div>
                          <p className="font-bold text-slate-900">{user?.college || 'University Name'}</p>
                          <p className="text-sm text-slate-500">B.Tech in Computer Science • 2023 - 2027</p>
                       </div>
                    </div>

                    {/* Skillora Achievements */}
                    <div>
                       <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Peer Impact</h3>
                       <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                             <p className="text-2xl font-black text-slate-900">{user?.credits_earned || 2500}</p>
                             <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Credits Earned via Teaching</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                             <p className="text-2xl font-black text-slate-900">{user?.trust_score || 99}%</p>
                             <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Global Peer Trust Index</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    {/* Skills */}
                    <div>
                       <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Verified Skills</h3>
                       <div className="flex flex-wrap gap-2">
                          {user?.skills_offered?.map((s, i) => (
                            <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20 rounded-lg text-xs font-bold">
                               <CheckCircle className="w-3 h-3" /> {s.name || s}
                            </span>
                          ))}
                       </div>
                    </div>

                    {/* Experience */}
                    <div>
                       <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Learning Journey</h3>
                       <div className="space-y-4">
                          <div>
                             <p className="font-bold text-slate-900">Advanced Peer Tutor</p>
                             <p className="text-sm text-slate-500">Skillora Platform • 2026 - Present</p>
                             <ul className="text-xs text-slate-600 mt-2 list-disc list-inside space-y-1">
                                <li>Conducted {user?.sessions_completed || 12} live technical exchange sessions.</li>
                                <li>Subject Matter Expert in <strong>{user?.skills_offered?.[0]?.name || 'Web Development'}</strong>.</li>
                                <li>Consistently maintaining a 4.9+ rating from global learners.</li>
                             </ul>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Footer */}
              <div className="mt-20 pt-8 border-t border-slate-100 text-center">
                 <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Generated via Skillora Verified Identity</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
