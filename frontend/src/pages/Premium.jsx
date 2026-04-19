import React from 'react';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, Shield, Infinity as InfinityIcon, Sparkles } from 'lucide-react';

export default function Premium() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started with peer learning.',
      features: ['50 Starter Credits', 'Basic Matching', 'Standard Audio/Video', 'Public Community'],
      buttonText: 'Current Plan',
      premium: false
    },
    {
      name: 'Pro',
      price: '199',
      description: 'For dedicated learners and teachers.',
      features: ['200 Monthly Credits', 'AI Smart Priority Matching', 'HD Video Sessions', 'Private Mentorship', 'Verified Badge'],
      buttonText: 'Upgrade to Pro',
      premium: true,
      popular: true
    },
    {
      name: 'Elite',
      price: '499',
      description: 'The ultimate Skillora experience.',
      features: ['Unlimited Credits', 'Instant Matching', 'Recorded Sessions', 'Elite Group Workshops', '24/7 Priority Support', 'Profile Boost'],
      buttonText: 'Go Elite',
      premium: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 animate-in fade-in zoom-in duration-700">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="outline" className="text-[#6C63FF] border-[#6C63FF]/30 bg-[#6C63FF]/5 px-4 py-1">SKILLORA PREMIUM</Badge>
        <h1 className="text-5xl font-black text-white tracking-tight">Accelerate Your Learning.</h1>
        <p className="text-xl text-[#94A3B8]">Join thousands of students who are unlocking their full potential with premium peer-to-peer mentorship.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <Card key={idx} className={`relative flex flex-col bg-[#1A1A2E] border-[#2D2D44] overflow-hidden transition-all duration-300 hover:scale-[1.02] ${plan.popular ? 'border-[#6C63FF] shadow-2xl shadow-[#6C63FF]/20' : ''}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#6C63FF] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">Most Popular</div>
            )}
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-bold text-white mb-2">
  {plan.name}
</CardTitle>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-white">₹{plan.price}</span>
                <span className="text-[#94A3B8]">/month</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{plan.description}</p>
            </CardHeader>
            <CardContent className="p-8 pt-0 flex-grow border-t border-[#2D2D44]/50">
              <ul className="space-y-4 pt-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#F1F5F9]">
                    <div className={`mt-0.5 p-0.5 rounded-full ${plan.premium ? 'bg-[#6C63FF]/20 text-[#6C63FF]' : 'bg-[#94A3B8]/20 text-[#94A3B8]'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-8 pt-0">
               <Button 
                disabled={plan.name === 'Free'}
                onClick={() => {
                  if (plan.premium) {
                    const tid = toast.loading(`Initializing Razorpay for ${plan.name} plan...`);
                    setTimeout(() => {
                      toast.success(`Payment Successful! You are now a ${plan.name} member.`, { id: tid });
                    }, 2000);
                  }
                }}
                className={`w-full py-6 rounded-xl font-bold transition-all ${plan.popular ? 'bg-[#6C63FF] hover:bg-[#4F46E5] text-white shadow-lg' : 'bg-transparent border border-[#2D2D44] text-white hover:bg-[#2D2D44] disabled:opacity-50'}`}
               >
                 {plan.buttonText}
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Rewards/Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        <FeatureCard icon={<Zap className="text-yellow-500" />} title="Instant Matching" desc="No more waiting. Get matched with top tiers instantly." />
        <FeatureCard icon={<Star className="text-purple-500" />} title="Verified Status" desc="Get a blue checkmark and stand out as a trusted teacher." />
        <FeatureCard icon={<Shield className="text-blue-500" />} title="Safe Sessions" desc="Enhanced privacy and end-to-end encrypted rooms." />
        <FeatureCard icon={<Sparkles className="text-amber-500" />} title="Elite Content" desc="Access to exclusive workshops and masterclasses." />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="bg-[#1A1A2E]/40 border-[#2D2D44] p-6 hover:bg-[#1A1A2E] transition-colors group">
       <div className="w-12 h-12 rounded-2xl bg-[#0F0F1A] border border-[#2D2D44] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
         {icon}
       </div>
       <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
       <p className="text-sm text-[#94A3B8] leading-relaxed">{desc}</p>
    </Card>
  );
}
