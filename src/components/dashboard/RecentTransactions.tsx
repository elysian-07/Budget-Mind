
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
  return (
    <div className="flex items-center py-3 border-b last:border-0">
      <div className="p-2 rounded-full bg-gray-100 mr-4">
        {categoryIcons[transaction.category]}
      </div>
      
      <div className="flex-1">
        <div className="font-medium text-sm">{transaction.description}</div>
        <div className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
      </div>
      
      <div className={`font-semibold ${
        transaction.type === 'income' 
          ? 'text-finance-income'
          : 'text-finance-expense'
      }`}>
        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
      </div>
    </div>
  );
}

export function RecentTransactions() {
  const { state } = useFinance();
  
  const recentTransactions = useMemo(() => {
    return [...state.transactions]
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, 5);
  }, [state.transactions]);
  
  return (
    <Card>
      <CardHeader>
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
          <div className="text-center py-8 text-gray-500">
            No recent transactions found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
