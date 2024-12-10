import { Bell, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { home, leaderboard } from '@/routes/routeName';
import { Home } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate(home)}>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
        <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Dicoding Forum
        </span>
      </div>

      <div className="space-y-2">
        <Button
          variant={isActive(home) ? 'default' : 'ghost'}
          className={`w-full justify-start gap-3 ${isActive(home)
            ? 'bg-slate-200 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-700'
            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          onClick={() => navigate(home)}
        >
          <Home size={18} />
          Trending
        </Button>
        <Button
          variant={isActive(leaderboard) ? 'default' : 'ghost'}
          className={`w-full justify-start gap-3 ${isActive(leaderboard)
            ? 'bg-slate-200 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-700'
            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          onClick={() => navigate(leaderboard)}
        >
          <Trophy size={18} />
          Leaderboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => navigate('/notifications')}
        >
          <Bell size={18} />
          Notifications
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;