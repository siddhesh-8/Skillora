import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Bell, Search, UserCircle, LogOut, Settings as SettingsIcon } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const notifications = [
    { id: 1, text: 'Ayush Sharma sent you a message', time: '2m ago', unread: true },
    { id: 2, text: 'Your Python session was confirmed', time: '1h ago', unread: false },
    { id: 3, text: 'You earned 50 credits for teaching', time: '5h ago', unread: false },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0F0F1A]/90 backdrop-blur-md border-b border-[#2D2D44] px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-[#6C63FF]">Skill</span><span className="text-white">ora</span>
        </Link>
        
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#94A3B8]">
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link to="/matches" className="hover:text-white transition">Matches</Link>
            <Link to="/sessions" className="hover:text-white transition">Sessions</Link>
            <Link to="/chat" className="hover:text-white transition">Chat</Link>
            <Link to="/groups" className="hover:text-white transition">Groups</Link>
            <Link to="/resume" className="hover:text-white transition">Resume</Link>
            <Link to="/credits" className="hover:text-[#F59E0B] transition">Credits</Link>
            <Link to="/premium" className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white rounded-full text-xs hover:opacity-90">Premium</Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <form 
              className="relative hidden md:block"
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.search.value;
                if (query.trim()) {
                  navigate(`/matches?search=${encodeURIComponent(query.trim())}`);
                  e.target.search.value = ''; // Clear search after navigation
                }
              }}
            >
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input 
                name="search"
                type="text" 
                placeholder="Search skills or users..." 
                className="bg-[#1A1A2E] border border-[#2D2D44] text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-[#6C63FF] text-[#F1F5F9] w-64" 
              />
            </form>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-white transition"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#1A1A2E] border border-[#2D2D44] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-[#2D2D44] flex justify-between items-center bg-[#0F0F1A]/50">
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    <button className="text-[10px] text-[#6C63FF] hover:underline">Mark all as read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-4 border-b border-[#2D2D44] hover:bg-[#2D2D44] transition-colors cursor-pointer ${n.unread ? 'bg-[#6C63FF]/5' : ''}`}>
                        <p className="text-xs text-white leading-relaxed">{n.text}</p>
                        <p className="text-[10px] text-[#94A3B8] mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center bg-[#0F0F1A]/50">
                    <button className="text-xs text-[#94A3B8] hover:text-white">View all activity</button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[#2D2D44]">
              <Link to="/profile">
                <UserCircle className="w-7 h-7 text-gray-400 hover:text-white transition" />
              </Link>
              <Link to="/settings" className="text-gray-400 hover:text-white transition">
                <SettingsIcon className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }} 
                className="text-sm text-gray-400 hover:text-[#EF4444] transition flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition">Log In</Link>
            <Link to="/signup" className="text-sm font-medium bg-[#6C63FF] hover:bg-[#4F46E5] text-white px-5 py-2 rounded-full transition shadow-lg shadow-[#6C63FF]/20">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
