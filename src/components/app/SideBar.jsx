import { Bell, TrendingUp, Trophy } from "lucide-react";
import { Button } from '@/components/ui/button';

const Sidebar = () => (
    <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
        <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Dicoding Forum
        </span>
      </div>

      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <TrendingUp size={18} />
          Trending
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Trophy size={18} />
          Leaderboard
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Bell size={18} />
          Notifications
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">
          Popular Categories
        </h3>
        <div className="space-y-2">
          {['Tech', 'Design', 'Development', 'Career'].map(category => (
            <Button 
              key={category}
              variant="ghost" 
              className="w-full justify-start text-sm font-normal"
            >
              # {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

export default Sidebar;