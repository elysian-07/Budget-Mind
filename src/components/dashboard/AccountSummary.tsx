
import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { ArrowDown, ArrowUp, DollarSign, Coins, CreditCard, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountSummary() {
  const { state } = useFinance();
  
  const summaryData = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthlyTransactions = state.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });
    
    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const balance = income - expenses;
    
    return { income, expenses, balance };
  }, [state.transactions]);

  const currencySymbol = state.currency.symbol;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-finance-green to-finance-green/60 dark:from-green-800/40 dark:to-green-900/20 border-0 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Coins className="w-4 h-4 mr-2 text-finance-income" /> Monthly Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {currencySymbol}{summaryData.income.toFixed(2)}
            </div>
            <div className="p-2 bg-white/50 dark:bg-black/20 rounded-full">
              <ArrowUp className="h-5 w-5 text-finance-income" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-finance-pink to-finance-pink/60 dark:from-red-800/40 dark:to-red-900/20 border-0 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-finance-expense" /> Monthly Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {currencySymbol}{summaryData.expenses.toFixed(2)}
            </div>
            <div className="p-2 bg-white/50 dark:bg-black/20 rounded-full">
              <ArrowDown className="h-5 w-5 text-finance-expense" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-finance-yellow to-finance-yellow/60 dark:from-amber-800/40 dark:to-amber-900/20 border-0 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <PiggyBank className="w-4 h-4 mr-2 text-finance-primary" /> Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {currencySymbol}{summaryData.balance.toFixed(2)}
            </div>
            <div className="p-2 bg-white/50 dark:bg-black/20 rounded-full">
              <DollarSign className="h-5 w-5 text-finance-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
