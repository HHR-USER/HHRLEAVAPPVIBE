import { Home, PlusSquare, History, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: PlusSquare, label: 'New Request', path: '/request' },
    { icon: History, label: 'History', path: '/history' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.label} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-blue-900' : 'text-slate-400'
            }`}
          >
            <item.icon size={22} className={isActive ? 'scale-110' : ''} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
