import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useAuthStore();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };


  return (
    <div className="flex justify-center items-center py-20 px-6 min-h-[80vh]">
      <div className="bg-[#1A1A2E] p-8 rounded-2xl border border-[#2D2D44] w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-[#94A3B8] text-center mb-8 text-sm">Login to continue exchanging skills</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition"
              placeholder="you@college.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition"
              placeholder="........"
            />
          </div>
          
          <div className="flex justify-end">
            <a href="#" className="text-sm text-[#6C63FF] hover:text-[#4F46E5]">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#6C63FF] hover:bg-[#4F46E5] text-white font-bold py-3 rounded-lg shadow-lg flex justify-center transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#2D2D44] pt-6 text-center">
          <p className="text-[#94A3B8] text-sm">
            Don't have an account? <Link to="/signup" className="text-[#6C63FF] font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
