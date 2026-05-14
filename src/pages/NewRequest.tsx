import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateEndDate, formatDate } from '../lib/utils';
import { LeaveType } from '../types';

export default function NewRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    type: 'Annual' as LeaveType,
    sd: formatDate(new Date()),
    no_leave: 1,
    reason: '',
    mol: 'lft', // Leave from this year
  });
  
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (formData.sd && formData.no_leave > 0) {
      const ed = calculateEndDate(new Date(formData.sd), formData.no_leave);
      setEndDate(formatDate(ed));
    }
  }, [formData.sd, formData.no_leave]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validations
    if (formData.type === 'Paternity' && (user?.gender !== 'Male' || formData.no_leave > 10)) {
      setError('Paternity leave is for males and max 10 days.');
      setLoading(false);
      return;
    }
    
    if (formData.type === 'Maternity' && user?.gender !== 'Female') {
      setError('Maternity leave is for females only.');
      setLoading(false);
      return;
    }

    if (formData.no_leave > (user?.balance.remaining || 0)) {
      setError('Insufficient leave balance.');
      setLoading(false);
      return;
    }

    try {
      // Logic for actionCreate1
      // In production: await fetch('/api/leave/actionCreate1', { method: 'POST', body: JSON.stringify({...formData, ed: endDate, username: user?.username}) })
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => navigate('/history'), 2000);
    } catch (err) {
      setError('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">New Leave Request</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Summary */}
        <div className="grid grid-cols-3 gap-4 bg-blue-50/50 p-5 rounded-xl border border-blue-100 shadow-sm">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">First Name</label>
            <p className="text-sm font-bold text-slate-800">{user.fName}</p>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Middle Name</label>
            <p className="text-sm font-bold text-slate-800">{user.mName}</p>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
            <p className="text-sm font-bold text-slate-800">{user.lName}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Leave Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as LeaveType})}
              className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            >
              <option value="Annual">Annual Leave</option>
              <option value="Paternity">Paternity Leave</option>
              <option value="Maternity">Maternity Leave</option>
              <option value="Wedding">Wedding Leave</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.sd}
                  onChange={(e) => setFormData({...formData, sd: e.target.value})}
                  className="w-full p-3 pl-10 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Working Days</label>
              <input
                type="number"
                min="1"
                value={formData.no_leave}
                onChange={(e) => setFormData({...formData, no_leave: parseInt(e.target.value) || 0})}
                className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
             <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">End Date</span>
                <span className="text-blue-900 font-black">{endDate || '-'}</span>
             </div>
             <p className="text-[10px] text-blue-600 mt-1 italic leading-tight">Calculation automatically skips weekends (Saturday & Sunday)</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Reason</label>
            <textarea
              rows={3}
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="Provide a detailed reason for your leave request..."
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2 text-sm font-medium">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
        >
          {loading ? 'Processing...' : success ? 'Submission Successful' : 'Submit to Line Manager'}
        </button>
      </form>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 size={48} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Request Sent</h2>
              <p className="text-slate-500">Your leave request has been sent to your line manager ({user.lnm_email}) for approval.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
