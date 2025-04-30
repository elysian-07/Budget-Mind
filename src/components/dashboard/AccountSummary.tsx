
import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-finance-green border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Monthly Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${summaryData.income.toFixed(2)}</div>
            <div className="p-2 bg-white bg-opacity-50 rounded-full">
              <ArrowUp className="h-5 w-5 text-finance-income" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-finance-pink border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${summaryData.expenses.toFixed(2)}</div>
            <div className="p-2 bg-white bg-opacity-50 rounded-full">
              <ArrowDown className="h-5 w-5 text-finance-expense" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-finance-yellow border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${summaryData.balance.toFixed(2)}</div>
            <div className="p-2 bg-white bg-opacity-50 rounded-full">
              <DollarSign className="h-5 w-5 text-finance-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
