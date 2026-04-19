import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Credits() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const transactions = [
    { id: 1, type: 'earned', amount: 50, from: 'Siddhesh Jain', skill: 'Python Lesson', date: 'Oct 12' },
    { id: 2, type: 'spent', amount: 20, to: 'Ayush Sharma', skill: 'React Basics', date: 'Oct 10' },
    { id: 3, type: 'earned', amount: 10, from: 'Skillora System', detail: 'Daily Reward', date: 'Oct 09' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Your Wallet</h1>
        <p className="text-[#94A3B8]">Earn credits by teaching, spend them to learn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] text-white border-0 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
            <CardDescription className="text-white/70">Available for learning new skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-6xl font-black">{user?.credits || 50} <span className="text-xl font-normal opacity-80">CR</span></div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Monthly teaching goal</span>
                <span>80%</span>
              </div>
              <Progress value={80} className="h-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-[#1A1A2E] border-[#2D2D44] hover:border-[#F59E0B]/50 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#F59E0B]/10 rounded-xl">
                  <ShieldCheck className="text-[#F59E0B] w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-white">Trust Score</p>
                  <p className="text-xs text-[#94A3B8]">Increases with every session</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">98%</div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A2E] border-[#2D2D44] hover:border-[#10B981]/50 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#10B981]/10 rounded-xl">
                  <Sparkles className="text-[#10B981] w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-white">Skill Bonus</p>
                  <p className="text-xs text-[#94A3B8]">High demand multiplier</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">x1.2</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Zap className="text-[#F59E0B] w-6 h-6" /> Recent Activity
        </h2>
        
        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="bg-[#1A1A2E]/50 border-[#2D2D44] hover:bg-[#1A1A2E] transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${tx.type === 'earned' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    {tx.type === 'earned' ? <ArrowUpRight className="text-green-500" /> : <ArrowDownLeft className="text-red-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{tx.skill || tx.detail}</p>
                    <p className="text-xs text-[#94A3B8]">{tx.type === 'earned' ? `From ${tx.from}` : `To ${tx.to}`} • {tx.date}</p>
                  </div>
                </div>
                <div className={`font-mono font-bold ${tx.type === 'earned' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.type === 'earned' ? '+' : '-'}{tx.amount} CR
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-8 bg-[#6C63FF]/5 border border-[#6C63FF]/20 rounded-3xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Need more credits?</h3>
        <p className="text-sm text-[#94A3B8] mb-6">The best way to get credits is by teaching others. However, you can also support Skillora by getting a boost pack.</p>
        <div className="flex justify-center gap-4">
          <Button 
            className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white px-8"
            onClick={() => navigate('/premium')}
          >
            Upgrade to Premium
          </Button>
          <Button 
            variant="outline" 
            className="text-white border-[#2D2D44] hover:bg-[#2D2D44] px-8"
            onClick={() => toast.success('Redirecting to Reward Tasks...')}
          >
            Earn Credits
          </Button>
        </div>
      </div>
    </div>
  );
}
