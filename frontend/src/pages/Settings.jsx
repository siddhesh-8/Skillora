import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Bell, Shield, Wallet, Moon, Sun, Globe, Save } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState('profile');

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <SettingsNavButton 
            active={activeSection === 'profile'} 
            onClick={() => setActiveSection('profile')} 
            icon={<User />} 
            label="Public Profile" 
          />
          <SettingsNavButton 
            active={activeSection === 'notifications'} 
            onClick={() => setActiveSection('notifications')} 
            icon={<Bell />} 
            label="Notifications" 
          />
          <SettingsNavButton 
            active={activeSection === 'appearance'} 
            onClick={() => setActiveSection('appearance')} 
            icon={<Moon />} 
            label="Appearance" 
          />
          <SettingsNavButton 
            active={activeSection === 'security'} 
            onClick={() => setActiveSection('security')} 
            icon={<Shield />} 
            label="Security" 
          />
          <SettingsNavButton 
            active={activeSection === 'credits'} 
            onClick={() => setActiveSection('credits')} 
            icon={<Wallet />} 
            label="Billing & Credits" 
          />
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          <Card className="bg-card border-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                {activeSection === 'profile' && 'Public Profile'}
                {activeSection === 'appearance' && 'Appearance & UI'}
                {activeSection === 'notifications' && 'Notification Preferences'}
                {activeSection === 'security' && 'Security & Privacy'}
                {activeSection === 'credits' && 'Credit Settings'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase">Full Name</label>
                        <Input defaultValue={user?.name} className="bg-background border-border text-foreground" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase">Email Address</label>
                        <Input defaultValue={user?.email} className="bg-background border-border text-foreground" />
                     </div>
                  </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase">Portfolio Website</label>
                        <div className="relative">
                           <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                           <Input placeholder="myportfolio.dev" className="pl-10 bg-background border-border text-foreground" />
                        </div>
                     </div>
                </div>
              )}

              {activeSection === 'appearance' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                    <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Interface Theme</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => {
                          localStorage.setItem('theme', 'light');
                          document.documentElement.classList.add('light');
                        }}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${document.documentElement.classList.contains('light') ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
                      >
                        <Sun className={`w-8 h-8 ${document.documentElement.classList.contains('light') ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-bold">Light Mode</span>
                      </button>
                      <button 
                        onClick={() => {
                          localStorage.setItem('theme', 'dark');
                          document.documentElement.classList.remove('light');
                        }}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${!document.documentElement.classList.contains('light') ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
                      >
                        <Moon className={`w-8 h-8 ${!document.documentElement.classList.contains('light') ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-bold">Dark Mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-4">
                  <NotificationToggle label="Email notifications for new messages" defaultChecked={true} />
                  <NotificationToggle label="Push notifications for session reminders" defaultChecked={true} />
                  <NotificationToggle label="Quarterly credit summary" defaultChecked={false} />
                </div>
              )}

              <div className="pt-6 border-t border-border flex justify-end">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white px-8 gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SettingsNavButton({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function NotificationToggle({ label, defaultChecked }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
      <span className="text-sm text-foreground">{label}</span>
      <div className={`w-10 h-5 rounded-full relative cursor-pointer ${defaultChecked ? 'bg-primary' : 'bg-muted'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${defaultChecked ? 'left-6' : 'left-1'}`}></div>
      </div>
    </div>
  );
}
