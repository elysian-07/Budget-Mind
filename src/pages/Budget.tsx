
import { useState } from "react";
import { BudgetProgress } from "@/components/budget/BudgetProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFinance, Category } from "@/context/FinanceContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/ThemeContext";

const categoryOptions: Category[] = [
  'food',
  'transportation',
  'housing',
  'utilities',
  'entertainment',
  'healthcare',
  'education',
  'shopping',
  'personal',
  'travel',
  'gifts',
  'other'
];

export default function Budget() {
  const { state, addBudget, updateBudget, deleteBudget } = useFinance();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [category, setCategory] = useState<Category>('food');
  const [amount, setAmount] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const handleOpenDialog = (existingCategory?: Category) => {
    if (existingCategory) {
      const budget = state.budgets.find(b => b.category === existingCategory);
      if (budget) {
        setCategory(budget.category);
        setAmount(budget.amount.toString());
        setEditingCategory(existingCategory);
      }
    } else {
      setCategory('food');
      setAmount('');
      setEditingCategory(null);
    }
    setIsDialogOpen(true);
  };
  
  const handleSave = () => {
    const budgetAmount = parseFloat(amount);
    
    if (isNaN(budgetAmount) || budgetAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid positive amount",
        variant: "destructive"
      });
      return;
    }
    
    if (editingCategory) {
      updateBudget({ category, amount: budgetAmount });
      toast({
        title: "Success",
        description: "Budget updated successfully",
      });
    } else {
      // Check if budget for this category already exists
      const existingBudget = state.budgets.find(b => b.category === category);
      if (existingBudget) {
        toast({
          title: "Error",
          description: `Budget for ${category} already exists`,
          variant: "destructive"
        });
        return;
      }
      
      addBudget({ category, amount: budgetAmount });
      toast({
        title: "Success",
        description: "Budget added successfully",
      });
    }
    
    setIsDialogOpen(false);
  };
  
  const handleDelete = () => {
    if (editingCategory) {
      deleteBudget(editingCategory);
      toast({
        title: "Success",
        description: "Budget deleted successfully",
      });
      setIsDialogOpen(false);
    }
  };
  
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Budget Planning</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <BudgetProgress onAddBudget={() => handleOpenDialog()} />
        
        <Card className={`border ${theme === 'dark' ? 'border-gray-700 shadow-xl' : 'border-finance-primary/20 shadow-md'} hover:shadow-lg transition-all`}>
          <CardHeader className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-r from-finance-primary/10 to-transparent'} rounded-t-xl`}>
            <CardTitle className="text-xl">Budget Details</CardTitle>
          </CardHeader>
          <CardContent>
            {state.budgets.length > 0 ? (
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
                            onClick={() => handleOpenDialog(budget.category)}
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
            ) : (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No budgets set up yet. Click the "Add Budget" button to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Edit Budget' : 'Add New Budget'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className={`w-full p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                disabled={!!editingCategory}
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget Amount</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            {editingCategory && (
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <div className="flex space-x-2 ml-auto">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-finance-primary to-finance-secondary hover:opacity-90 text-white"
              >
                {editingCategory ? 'Update' : 'Add Budget'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
