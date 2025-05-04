
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/context/ThemeContext";
import { useFinance, Category, Budget } from "@/context/FinanceContext";

interface BudgetFormProps {
  onClose: () => void;
  editingCategory: Category | null;
}

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

export function BudgetForm({ onClose, editingCategory }: BudgetFormProps) {
  const { state, addBudget, updateBudget, deleteBudget } = useFinance();
  const { toast } = useToast();
  const { theme } = useTheme();
  
  const existingBudget = editingCategory 
    ? state.budgets.find(b => b.category === editingCategory)
    : null;
  
  const [category, setCategory] = useState<Category>(
    existingBudget?.category || 'food'
  );
  const [amount, setAmount] = useState(
    existingBudget ? existingBudget.amount.toString() : ''
  );
  
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
    
    onClose();
  };
  
  const handleDelete = () => {
    if (editingCategory) {
      deleteBudget(editingCategory);
      toast({
        title: "Success",
        description: "Budget deleted successfully",
      });
      onClose();
    }
  };

  return (
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
            onClick={onClose}
            className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-finance-primary to-finance-secondary hover:opacity-90 text-white"
            style={{ backgroundColor: "rgb(137 84 238)" }}
          >
            {editingCategory ? 'Update' : 'Add Budget'}
          </Button>
        </div>
      </div>
    </div>
  );
}
