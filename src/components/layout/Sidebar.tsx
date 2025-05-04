
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart2, 
  Home, 
  PieChart, 
  Settings, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  Target, 
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Transactions', path: '/transactions', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Budget', path: '/budget', icon: <Wallet className="h-5 w-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Goals', path: '/goals', icon: <Target className="h-5 w-5" /> },
    { name: 'Insights', path: '/insights', icon: <TrendingUp className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div 
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } h-screen bg-sidebar transition-all duration-300 border-r border-gray-100 fixed left-0 top-0`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center">
            <PieChart className="h-6 w-6 text-[#7B5EED]" />
            <span className="ml-2 font-bold text-lg text-[#7B5EED]">BudgetMind</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="mt-6 px-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center ${
                collapsed ? 'justify-center' : 'justify-start'
              } px-3 py-3 text-sm rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-sidebar-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Link
          to="/settings"
          className={`flex items-center ${
            collapsed ? 'justify-center' : 'justify-start'
          } px-3 py-3 text-sm rounded-md transition-colors ${
            isActive('/settings')
              ? 'bg-sidebar-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className={collapsed ? '' : 'mr-3'}>
            <Settings className="h-5 w-5" />
          </span>
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
}
