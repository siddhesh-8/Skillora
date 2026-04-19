import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills_offered: '',
    skills_wanted: '',
    role: 'both',
    college: '',
    phone: '',
    language_preference: 'english'
  });

  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Prepare data for backend
      const signupData = {
        ...formData,
        skills_offered: formData.skills_offered.split(',').map(s => ({ name: s.trim() })),
        skills_wanted: formData.skills_wanted.split(',').map(s => s.trim()),
      };

      const result = await signup(signupData);
      if (result.success) {
        toast.success('Account created! Welcome to Skillora.');
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-6 min-h-[80vh]">
      <div className="bg-[#1A1A2E] p-8 rounded-2xl border border-[#2D2D44] w-full max-w-lg shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Join Skillora</h2>
        <p className="text-[#94A3B8] text-center mb-8 text-sm">Step {step} of 3</p>
        
        <div className="w-full bg-[#0F0F1A] h-2 rounded-full mb-8">
          <div className="bg-[#6C63FF] h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <form onSubmit={handleNext} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition" 
                  placeholder="........" 
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Skills You Offer (Comma separated)</label>
                <input 
                  type="text" 
                  name="skills_offered"
                  value={formData.skills_offered}
                  onChange={handleChange}
                  required 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition" 
                  placeholder="Python, Next.js, Guitar" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Skills You Want to Learn (Comma separated)</label>
                <input 
                  type="text" 
                  name="skills_wanted"
                  value={formData.skills_wanted}
                  onChange={handleChange}
                  required 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition" 
                  placeholder="Machine Learning, French" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">I want to be a:</label>
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition"
                >
                  <option value="both">Both (Teacher & Learner)</option>
                  <option value="teacher">Teacher Only</option>
                  <option value="learner">Learner Only</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
               <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">College/University</label>
                <input 
                  type="text" 
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition" 
                  placeholder="MIT, Stanford, IIT..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition" 
                  placeholder="+91 9876543210" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1">Language Preference</label>
                <select 
                  name="language_preference"
                  value={formData.language_preference}
                  onChange={handleChange}
                  className="w-full bg-[#0F0F1A] border border-[#2D2D44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#6C63FF] transition"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="marathi">Marathi</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2.5 bg-[#0F0F1A] border border-[#2D2D44] text-white rounded-lg hover:bg-gray-800 transition">Back</button>
            ) : <div></div>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-2.5 bg-[#6C63FF] hover:bg-[#4F46E5] text-white font-bold rounded-lg shadow-lg flex justify-center transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : (step === 3 ? 'Complete Setup' : 'Next Step')}
            </button>
          </div>
        </form>
        
        {step === 1 && (
          <div className="mt-6 border-t border-[#2D2D44] pt-6 text-center">
            <p className="text-[#94A3B8] text-sm">
              Already have an account? <Link to="/login" className="text-[#6C63FF] font-medium hover:underline">Log in</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
