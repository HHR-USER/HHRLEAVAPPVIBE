import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, Search, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_HISTORY = [
  { id: '1', type: 'Annual', sd: '2026-05-10', ed: '2026-05-15', days: 5, status: 'Approved', reason: 'Family vacation' },
  { id: '2', type: 'Sick', sd: '2026-04-22', ed: '2026-04-23', days: 2, status: 'Pending', reason: 'Fever' },
  { id: '3', type: 'Maternity', sd: '2026-01-15', ed: '2026-04-15', days: 90, status: 'Rejected', reason: 'Not eligible yet' },
];

export default function History() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredHistory = filter === 'All' 
    ? MOCK_HISTORY 
    : MOCK_HISTORY.filter(item => item.status === filter);

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Leave History</h1>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm">
          <Search size={20} className="text-slate-600" />
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide font-sans">
        {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              filter === tab 
                ? 'bg-blue-900 text-white shadow-lg' 
                : 'bg-white text-slate-400 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredHistory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 ${
              item.status === 'Rejected' ? 'bg-red-50/10' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg border ${
                  item.status === 'Approved' ? 'bg-green-50 border-green-100' : 
                  item.status === 'Rejected' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'
                }`}>
                  <FileText className={
                    item.status === 'Approved' ? 'text-green-600' : 
                    item.status === 'Rejected' ? 'text-red-600' : 'text-blue-900'
                  } size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.type} Leave</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.days} Working Days</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                item.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                item.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-900'
              }`}>
                {item.status}
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-2">
              <div className="flex gap-4">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">From</p>
                  <p className="text-xs font-black text-slate-800">{item.sd}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">To</p>
                  <p className="text-xs font-black text-slate-800">{item.ed}</p>
                </div>
              </div>
              <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
