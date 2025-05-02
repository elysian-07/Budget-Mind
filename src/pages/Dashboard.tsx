
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { useTheme } from "@/context/ThemeContext";

export default function Dashboard() {
  const { theme } = useTheme();
  
  return (
    <div className={`container py-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
      <DashboardHeader />
      
      <AccountSummary />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentTransactions />
        <SpendingChart />
      </div>
    </div>
  );
}
