
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SpendingChart } from "@/components/dashboard/SpendingChart";

export default function Dashboard() {
  return (
    <div className="container py-6">
      <DashboardHeader />
      
      <AccountSummary />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentTransactions />
        <SpendingChart />
      </div>
    </div>
  );
}
