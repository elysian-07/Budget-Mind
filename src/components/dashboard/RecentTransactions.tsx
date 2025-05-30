
import { useFinance, Transaction } from "@/context/FinanceContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { ShoppingBag, Coffee, Car, Home, Film, Music, Heart, Laptop, Zap, GraduationCap, Plane, Gift } from "lucide-react";
import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

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

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { state } = useFinance();
  const { theme } = useTheme();
  const currencySymbol = state.currency.symbol;
  
  return (
    <div className={`flex items-center py-3 border-b last:border-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mr-4`}>
        {categoryIcons[transaction.category]}
      </div>
      
      <div className="flex-1">
        <div className={`font-medium text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{transaction.description}</div>
        <div className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
      </div>
      
      <div className={`font-semibold ${
        transaction.type === 'income' 
          ? 'text-finance-income'
          : 'text-finance-expense'
      }`}>
        {transaction.type === 'income' ? '+' : '-'}{currencySymbol}{transaction.amount.toFixed(2)}
      </div>
    </div>
  );
}

export function RecentTransactions() {
  const { state } = useFinance();
  const { theme } = useTheme();
  
  const recentTransactions = useMemo(() => {
    return [...state.transactions]
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, 5);
  }, [state.transactions]);
  
  return (
    <Card className={`theme-card`}>
      <CardHeader className={theme === 'dark' ? 'border-b border-gray-800' : ''}>
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
        <CardDescription>Your latest 5 transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {recentTransactions.length > 0 ? (
          <div className="space-y-1">
            {recentTransactions.map((transaction) => (
              <TransactionItem 
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            No recent transactions found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
