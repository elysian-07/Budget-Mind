
import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-gray-100 py-3 px-6 flex items-center justify-between">
      <div className="flex-1">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions, categories..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-finance-primary/20 focus:border-finance-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="bg-finance-primary text-white rounded-full p-1.5">
            <User className="h-5 w-5" />
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium">Demo User</div>
            <div className="text-xs text-gray-500">user@example.com</div>
          </div>
        </div>
      </div>
    </header>
  );
}
