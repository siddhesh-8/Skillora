import React from 'react';

const Admin = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                    <p className="text-4xl font-bold text-blue-400">1,234</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h2 className="text-xl font-semibold mb-2">Active Sessions</h2>
                    <p className="text-4xl font-bold text-green-400">56</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h2 className="text-xl font-semibold mb-2">Total Credits</h2>
                    <p className="text-4xl font-bold text-purple-400">45,678</p>
                </div>
            </div>
        </div>
    );
};

export default Admin;
