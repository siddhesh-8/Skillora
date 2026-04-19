import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Upload, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function Verification() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({
    skillName: '',
    description: '',
    proofLinks: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.skillName || !form.description) {
      return toast.error("Please fill all required fields");
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Verification request submitted successfully! Admin will review it shortly.");
      setIsSubmitting(false);
      setForm({ skillName: '', description: '', proofLinks: '' });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
          <Shield className="text-[#6C63FF] w-10 h-10" /> Skill Verification
        </h1>
        <p className="text-[#94A3B8]">Get a verified badge for your skills and rank higher in matching results.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-[#1A1A2E] border-[#2D2D44]">
            <CardHeader>
              <CardTitle className="text-white">Request Verification</CardTitle>
              <CardDescription className="text-[#94A3B8]">Provide proof of your expertise through certificates or projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Skill Name</label>
                  <select 
                    className="w-full bg-[#0F0F1A] border-[#2D2D44] text-white rounded-xl p-3 focus:ring-[#6C63FF]"
                    value={form.skillName}
                    onChange={(e) => setForm({...form, skillName: e.target.value})}
                  >
                    <option value="">Select a skill to verify</option>
                    {user?.skills_offered?.map((s, i) => (
                      <option key={i} value={s.name || s}>{s.name || s}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Experience Summary</label>
                  <Textarea 
                    placeholder="Describe your background and proficiency in this skill..."
                    className="bg-[#0F0F1A] border-[#2D2D44] text-white min-h-[120px]"
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Proof Links (GitHub, Portfolio, Certificate URLs)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-[#94A3B8]" />
                    <Input 
                      placeholder="https://github.com/your-project"
                      className="pl-10 bg-[#0F0F1A] border-[#2D2D44] text-white"
                      value={form.proofLinks}
                      onChange={(e) => setForm({...form, proofLinks: e.target.value})}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3">
                  <Upload className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white mb-1">Upload Certificate (PDF/Image)</p>
                    <input type="file" className="text-xs text-[#94A3B8]" />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#6C63FF] hover:bg-[#4F46E5] text-white py-6 text-lg shadow-lg shadow-[#6C63FF]/20"
                >
                  {isSubmitting ? "Submitting..." : "Submit request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#1A1A2E] border-[#2D2D44]">
            <CardHeader>
              <CardTitle className="text-lg text-white">Why Verify?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                <p className="text-sm text-[#94A3B8]">Get a verified badge on your profile.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                <p className="text-sm text-[#94A3B8]">Appear 3x more in match results.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                <p className="text-sm text-[#94A3B8]">Earn premium teaching credits.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A2E] border-[#2D2D44]">
            <CardHeader>
              <CardTitle className="text-lg text-white">Recent Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-white">React Development</p>
                  <p className="text-[10px] text-[#94A3B8]">Submitted 2 hours ago</p>
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-500 border-0">Pending</Badge>
              </div>
              <div className="p-3 bg-[#10B981]/5 border border-[#10B981]/10 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-white">UI/UX Design</p>
                  <p className="text-[10px] text-[#94A3B8]">Verified on Oct 10</p>
                </div>
                <Badge className="bg-[#10B981]/10 text-[#10B981] border-0">Verified</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
