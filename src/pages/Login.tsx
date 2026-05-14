import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, LogIn } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ username, password });
      navigate('/');
    } catch (err) {
      setError('Check your username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl p-10 shadow-2xl border border-slate-200"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
            <LogIn size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-blue-900 tracking-tight uppercase">HHR Mobile</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Leave Manager v2.4</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Corporate ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all text-sm font-medium"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all text-sm font-medium"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold text-center border border-red-100 uppercase tracking-wider">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 uppercase tracking-widest text-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Secure Sign In</span>
                <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-slate-50">
          <p className="text-slate-300 text-[10px] uppercase tracking-[0.2em] font-black mb-4 italic">Enterprise Security Validated</p>
          <p className="text-blue-900 text-xs font-bold uppercase tracking-widest">HR Department Support</p>
        </div>
      </motion.div>
    </div>
  );
}
