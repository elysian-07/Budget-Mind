
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
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Budget Details</CardTitle>
          </CardHeader>
          <CardContent>
            {state.budgets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Budget
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.budgets.map((budget) => (
                      <tr key={budget.category}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {budget.category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                          ${budget.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(budget.category)}
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
              <div className="text-center py-10 text-gray-500">
                No budgets set up yet. Click the "Add Budget" button to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
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
                className="w-full p-2 border border-gray-300 rounded-md"
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
                className="w-full p-2 border border-gray-300 rounded-md"
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
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-finance-primary hover:bg-finance-secondary"
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
