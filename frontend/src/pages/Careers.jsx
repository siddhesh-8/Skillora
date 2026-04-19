import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Careers() {
  const jobs = [
    { title: 'AI Engineer (RAG Systems)', type: 'Full-time', location: 'Remote / Mumbai', dept: 'Engineering' },
    { title: 'Product Designer (UX/UI)', type: 'Contract', location: 'Remote', dept: 'Design' },
    { title: 'Community Manager', type: 'Full-time', location: 'Bangalore', dept: 'Marketing' },
    { title: 'Backend Developer (Node.js)', type: 'Full-time', location: 'Remote', dept: 'Engineering' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Join the <span className="text-[#6C63FF]">Movement</span></h1>
        <p className="text-[#94A3B8]">Help us build the future of peer-to-peer education. We're looking for passionate learners and builders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Benefit cardTitle="Innovation" desc="Build cutting edge AI matching systems and decentralized protocols." />
        <Benefit cardTitle="Freedom" desc="Work from anywhere in the world. We value output over hours." />
        <Benefit cardTitle="Ownership" desc="Every employee gets a stake in the decentralized community." />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Current Openings</h2>
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <Card key={i} className="bg-[#1A1A2E] border-[#2D2D44] hover:border-[#6C63FF]/50 transition-all cursor-pointer group">
              <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#6C63FF]">{job.title}</h3>
                    <Badge variant="outline" className="text-[#94A3B8] border-[#2D2D44] text-[10px] uppercase">{job.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                     <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                     <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.dept}</span>
                  </div>
                </div>
                <Button variant="ghost" className="text-[#6C63FF] hover:text-white group-hover:translate-x-1 transition-all p-0">
                  View Details <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Benefit({ cardTitle, desc }) {
  return (
    <div className="p-6 bg-[#1A1A2E] border border-[#2D2D44] rounded-2xl space-y-2">
       <h3 className="text-white font-bold">{cardTitle}</h3>
       <p className="text-xs text-[#94A3B8]">{desc}</p>
    </div>
  );
}
