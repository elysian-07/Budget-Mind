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
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  onSidebarStateChange?: (isOpen: boolean) => void;
}

export function Sidebar({ onSidebarStateChange }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  // Handle resizing and mobile menu
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileOpen(false);
  }, [location.pathname]);

  // Notify parent component about sidebar state changes
  useEffect(() => {
    if (onSidebarStateChange) {
      if (isMobile) {
        onSidebarStateChange(mobileOpen);
      } else {
        onSidebarStateChange(!collapsed);
      }
    }
  }, [collapsed, mobileOpen, isMobile, onSidebarStateChange]);

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

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    const newState = !mobileOpen;
    setMobileOpen(newState);
    if (isMobile && onSidebarStateChange) {
      onSidebarStateChange(newState);
    }
  };

  // Desktop sidebar toggle
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    if (!isMobile && onSidebarStateChange) {
      onSidebarStateChange(!newState);
    }
  };

  return (
    <>
      {/* Mobile header with hamburger */}
      {isMobile && (
        <div className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 z-40 border-b flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="mr-4"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center">
            <PieChart className="h-6 w-6 text-[#7B5EED]" />
            <span className="ml-2 font-bold text-lg text-[#7B5EED]">BudgetMind</span>
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar for both mobile and desktop */}
      <div 
        className={`${
          collapsed && !isMobile ? 'w-16' : 'w-64'
        } h-screen bg-sidebar border-r border-gray-100 fixed left-0 top-0 transition-all duration-300 z-30
          ${isMobile ? (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${isMobile ? 'top-16 h-[calc(100vh-4rem)]' : 'top-0 h-screen'}
        `}
      >
        {/* Only show header on desktop */}
        {!isMobile && (
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
              onClick={toggleSidebar}
              className={collapsed ? 'mx-auto' : 'ml-auto'}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        <div className="mt-6 px-2">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center ${
                  collapsed && !isMobile ? 'justify-center' : 'justify-start'
                } px-3 py-3 text-sm rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-sidebar-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => isMobile && setMobileOpen(false)}
              >
                <span className={collapsed && !isMobile ? '' : 'mr-3'}>{item.icon}</span>
                {(!collapsed || isMobile) && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className={`absolute bottom-4 left-0 right-0 px-3 ${isMobile ? 'pb-4' : ''}`}>
          <Link
            to="/settings"
            className={`flex items-center ${
              collapsed && !isMobile ? 'justify-center' : 'justify-start'
            } px-3 py-3 text-sm rounded-md transition-colors ${
              isActive('/settings')
                ? 'bg-sidebar-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => isMobile && setMobileOpen(false)}
          >
            <span className={collapsed && !isMobile ? '' : 'mr-3'}>
              <Settings className="h-5 w-5" />
            </span>
            {(!collapsed || isMobile) && <span>Settings</span>}
          </Link>
        </div>
      </div>
    </>
  );
}
