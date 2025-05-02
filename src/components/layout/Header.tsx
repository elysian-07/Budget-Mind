
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/context/ThemeContext";
import { useFinance } from "@/context/FinanceContext";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { state } = useFinance();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { 
      id: 1, 
      message: `Budget for Food is almost reached (${state.currency.symbol}350/${state.currency.symbol}400)`, 
      time: "Just now",
      color: "bg-amber-500" 
    },
    { 
      id: 2, 
      message: `New feature: ${state.currency.name} currency settings available!`, 
      time: "2 hours ago",
      color: "bg-finance-primary" 
    },
    { 
      id: 3, 
      message: `Welcome to Finance App${user ? `, ${user.name}` : ''}`, 
      time: "1 day ago",
      color: "bg-green-500" 
    },
  ];

  const handleViewAll = () => {
    setShowNotifications(false);
    navigate('/settings');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-3 px-6 flex items-center justify-between shadow-sm">
      <div className="flex-1">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions, categories..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary bg-gray-50 dark:placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 shadow-lg" align="end">
            <div className="bg-gradient-to-r from-finance-primary to-finance-secondary text-white p-4 rounded-t-md">
              <h3 className="font-medium">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${notification.color}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 rounded-b-md">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-finance-primary hover:bg-finance-primary/10 hover:text-finance-primary"
                onClick={handleViewAll}
              >
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-3 cursor-pointer">
                <Avatar className="h-8 w-8 hover:ring-2 hover:ring-finance-primary/30 transition-all">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback className={`${theme === 'dark' ? 'bg-finance-secondary' : 'bg-finance-primary'} text-white`}>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium dark:text-gray-200">{user.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1 shadow-lg">
              <DropdownMenuItem 
                onClick={() => navigate('/settings')}
                className="flex items-center cursor-pointer px-3 py-2 hover:bg-finance-primary/10 rounded-md"
              >
                <Settings className="h-4 w-4 mr-2" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout}
                className="flex items-center cursor-pointer px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 rounded-md"
              >
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-gradient-to-r from-finance-primary to-finance-secondary text-white hover:opacity-90 border-none"
            onClick={() => navigate('/login')}
          >
            <User className="h-4 w-4" />
            <span>Login</span>
          </Button>
        )}
      </div>
    </header>
  );
}
