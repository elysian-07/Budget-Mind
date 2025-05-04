
import { useFinance, Category } from "@/context/FinanceContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

interface BudgetTableProps {
  onEditBudget: (category: Category) => void;
}

export function BudgetTable({ onEditBudget }: BudgetTableProps) {
  const { state } = useFinance();
  const { theme } = useTheme();

  if (state.budgets.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        No budgets set up yet. Click the "Add Budget" button to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">
              Category
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Monthly Budget
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700 bg-gray-900/20' : 'divide-gray-200 bg-white'}`}>
          {state.budgets.map((budget) => (
            <tr key={budget.category} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm capitalize">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeClass(budget.category, theme)}`}>
                  {budget.category}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                {state.currency.symbol}{budget.amount.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditBudget(budget.category)}
                  className="hover:text-finance-primary dark:hover:text-finance-primary"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Helper function for category badge colors
function getCategoryBadgeClass(category: Category, theme: string): string {
  const baseClasses = {
    food: theme === 'dark' ? 'bg-green-900/30 text-green-200' : 'bg-green-100 text-green-800',
    transportation: theme === 'dark' ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-100 text-blue-800',
    housing: theme === 'dark' ? 'bg-purple-900/30 text-purple-200' : 'bg-purple-100 text-purple-800',
    utilities: theme === 'dark' ? 'bg-yellow-900/30 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
    entertainment: theme === 'dark' ? 'bg-pink-900/30 text-pink-200' : 'bg-pink-100 text-pink-800',
    healthcare: theme === 'dark' ? 'bg-red-900/30 text-red-200' : 'bg-red-100 text-red-800',
    education: theme === 'dark' ? 'bg-indigo-900/30 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
    shopping: theme === 'dark' ? 'bg-cyan-900/30 text-cyan-200' : 'bg-cyan-100 text-cyan-800',
    personal: theme === 'dark' ? 'bg-teal-900/30 text-teal-200' : 'bg-teal-100 text-teal-800',
    travel: theme === 'dark' ? 'bg-amber-900/30 text-amber-200' : 'bg-amber-100 text-amber-800',
    gifts: theme === 'dark' ? 'bg-rose-900/30 text-rose-200' : 'bg-rose-100 text-rose-800',
    other: theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800',
  };

  return baseClasses[category] || baseClasses.other;
}
