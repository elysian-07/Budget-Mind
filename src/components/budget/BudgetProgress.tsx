
import { useMemo } from "react";
import { useFinance, Category } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingBag,
  Coffee,
  Car,
  Home,
  Film,
  Music,
  Heart,
  Laptop,
  Zap,
  GraduationCap,
  Plane,
  Gift,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  food: <Coffee className="h-5 w-5 text-amber-500" />,
  transportation: <Car className="h-5 w-5 text-blue-500" />,
  housing: <Home className="h-5 w-5 text-indigo-500" />,
  utilities: <Zap className="h-5 w-5 text-yellow-500" />,
  entertainment: <Film className="h-5 w-5 text-pink-500" />,
  healthcare: <Heart className="h-5 w-5 text-red-500" />,
  education: <GraduationCap className="h-5 w-5 text-green-500" />,
  shopping: <ShoppingBag className="h-5 w-5 text-purple-500" />,
  personal: <Music className="h-5 w-5 text-teal-500" />,
  travel: <Plane className="h-5 w-5 text-cyan-500" />,
  gifts: <Gift className="h-5 w-5 text-rose-500" />,
  income: <Laptop className="h-5 w-5 text-emerald-500" />,
  other: <ShoppingBag className="h-5 w-5 text-gray-500" />,
};

interface BudgetItem {
  category: Category;
  budgeted: number;
  spent: number;
  percentage: number;
}

interface BudgetProgressProps {
  onAddBudget: () => void;
}

export function BudgetProgress({ onAddBudget }: BudgetProgressProps) {
  const { state } = useFinance();
  const currencySymbol = state.currency.symbol;
  
  const budgetData = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Filter transactions for current month
    const currentMonthTransactions = state.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.type === 'expense' &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });
    
    // Calculate spending by category
    const categorySpending = new Map<Category, number>();
    currentMonthTransactions.forEach(transaction => {
      const currentAmount = categorySpending.get(transaction.category) || 0;
      categorySpending.set(transaction.category, currentAmount + transaction.amount);
    });
    
    // Create budget items
    const budgetItems: BudgetItem[] = state.budgets.map(budget => {
      const spent = categorySpending.get(budget.category) || 0;
      const percentage = (budget.amount > 0) ? Math.min(Math.round((spent / budget.amount) * 100), 100) : 0;
      
      return {
        category: budget.category,
        budgeted: budget.amount,
        spent,
        percentage
      };
    });
    
    return budgetItems.sort((a, b) => b.percentage - a.percentage);
  }, [state.transactions, state.budgets]);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Budget Progress</CardTitle>
        <Button
          size="sm"
          onClick={onAddBudget}
          className="bg-finance-primary hover:bg-finance-secondary"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </CardHeader>
      <CardContent>
        {budgetData.length > 0 ? (
          <div className="space-y-5">
            {budgetData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2">{categoryIcons[item.category]}</div>
                    <span className="capitalize text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {currencySymbol}{item.spent.toFixed(2)} / {currencySymbol}{item.budgeted.toFixed(2)}
                  </div>
                </div>
                
                <div className="relative">
                  <Progress 
                    value={item.percentage} 
                    className={`h-2 ${
                      item.percentage >= 100 ? 'bg-red-200' : 
                      item.percentage >= 80 ? 'bg-yellow-200' : 
                      'bg-gray-200'
                    }`}
                  />
                  <div 
                    className={`absolute right-0 top-0 text-xs ${
                      item.percentage >= 100 ? 'text-red-600' : 
                      item.percentage >= 80 ? 'text-yellow-600' : 
                      'text-gray-600'
                    }`}
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No budgets set up yet. Click the "Add Budget" button to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
