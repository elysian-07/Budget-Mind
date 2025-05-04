
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./Dashboard";
import { FinanceProvider } from "@/context/FinanceContext";
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

const Index = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Handle sidebar state changes based on mobile state
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  return (
    <FinanceProvider>
      <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Sidebar onSidebarStateChange={(isOpen) => setSidebarOpen(isOpen)} />
        
        <div className={`flex-1 transition-all duration-300 ${
          isMobile 
            ? 'ml-0 pt-16' // Mobile view always has full width and padding for the header
            : sidebarOpen 
              ? 'ml-64' // Sidebar open on desktop
              : 'ml-16' // Sidebar collapsed on desktop
        }`}>
          {!isMobile && <Header />}
          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Index;
