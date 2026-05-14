import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, CheckCircle2, ChevronRight, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hello, {user.fName}</h1>
          <p className="text-slate-500">{user.staffUnit}</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
          <UserIcon className="text-[#003366]" />
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Main Stats */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Entitlement</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-blue-900">{user.balance.total}</span>
            <span className="text-xs font-normal text-slate-500 uppercase tracking-tight">Days</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Taken</p>
            <p className="text-2xl font-black text-slate-700">{user.balance.taken}</p>
          </div>
          <div className="bg-blue-600 p-5 rounded-xl shadow-sm text-white border border-blue-500">
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider mb-1">Remaining</p>
            <p className="text-2xl font-black">{user.balance.remaining}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/request" className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <Calendar className="text-blue-900" size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">New Request</span>
        </Link>
        <Link to="/history" className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
            <Clock className="text-slate-600" size={20} />
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">History</span>
        </Link>
      </div>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Recent Requests</h3>
          <Link to="/history" className="text-xs font-semibold text-[#003366]">View All</Link>
        </div>
        <div className="space-y-3">
          {[
            { id: 1, type: 'Annual Leave', date: 'May 10 - May 15', status: 'Approved' },
            { id: 2, type: 'Sick Leave', date: 'Apr 22 - Apr 23', status: 'Pending' }
          ].map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.status === 'Approved' ? 'bg-green-500' : 'bg-orange-500'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.type}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                <span>{item.status}</span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
