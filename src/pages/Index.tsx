
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./Dashboard";
import { FinanceProvider } from "@/context/FinanceContext";
import { useTheme } from "@/context/ThemeContext";

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <FinanceProvider>
      <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 transition-all duration-300">
          <Header />
          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Index;
