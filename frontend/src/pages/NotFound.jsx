import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in zoom-in duration-700">
      <div className="relative">
        <h1 className="text-[150px] font-black text-[#6C63FF]/10 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">Oops! Lost in Orbit?</h2>
        </div>
      </div>
      
      <p className="text-[#94A3B8] max-w-md text-lg">
        The page you're looking for was moved, removed, renamed or might never have existed. Let's get you back home.
      </p>

      <div className="flex gap-4">
        <Button 
            variant="outline" 
            className="border-[#2D2D44] text-white hover:bg-[#2D2D44] px-8 py-6 rounded-2xl flex items-center gap-2"
            onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Button>
        <Link to="/">
          <Button className="bg-[#6C63FF] hover:bg-[#4F46E5] text-white px-8 py-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-[#6C63FF]/20">
            <Home className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <div className="pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A2E] rounded-full text-xs text-[#94A3B8] border border-[#2D2D44]">
          <span className="w-2 h-2 rounded-full bg-red-400"></span> Disconnected from Skillora Core
        </div>
      </div>
    </div>
  );
}
