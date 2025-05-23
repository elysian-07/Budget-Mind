
import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { useAuth } from "@/context/AuthContext";
import { suggestSavings } from "@/services/aiService";
import { Lightbulb } from "lucide-react";

export function DashboardHeader() {
  const { state } = useFinance();
  const { user } = useAuth();
  
  const aiSuggestion = useMemo(() => {
    if (state.transactions.length === 0) return null;
    
    const suggestions = suggestSavings(state.transactions);
    if (suggestions.length === 0) return null;
    
    // Return the top suggestion
    return {
      category: suggestions[0].category,
      potential: suggestions[0].potential
    };
  }, [state.transactions]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const userName = user?.name || "User";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">
        {greeting}, <span className="bg-gradient-to-r from-finance-primary via-finance-secondary to-finance-tertiary bg-clip-text text-transparent">{userName}</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Here's your financial overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
      
      {aiSuggestion && (
        <div className="p-4 bg-gradient-to-r from-white to-finance-purple/5 dark:from-gray-800/90 dark:to-finance-purple/20 border border-finance-primary/20 rounded-lg shadow-sm flex items-start space-x-3 animate-fade-in">
          <div className="p-2 bg-finance-purple/20 dark:bg-finance-purple/30 rounded-full">
            <Lightbulb className="h-5 w-5 text-finance-primary" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">AI Insight:</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You could save about <span className="font-semibold">{state.currency.symbol}{aiSuggestion.potential.toFixed(2)}</span> by 
              reducing your spending on <span className="capitalize">{aiSuggestion.category}</span>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
