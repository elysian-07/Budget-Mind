
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
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

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-3 px-6 flex items-center justify-between">
      <div className="flex-1">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions, categories..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-3 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback className="bg-finance-primary text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium dark:text-gray-200">{user.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
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
