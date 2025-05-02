
import { useState } from "react";
import { useFinance, Category, Transaction } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { predictCategory } from "@/services/aiService";
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
  'income',
  'other'
];

type TransactionFormProps = {
  editTransaction?: Transaction;
  onSave?: () => void;
};

export function TransactionForm({ editTransaction, onSave }: TransactionFormProps) {
  const { addTransaction, updateTransaction, state } = useFinance();
  const { toast } = useToast();
  const { theme } = useTheme();
  
  const [amount, setAmount] = useState(editTransaction?.amount.toString() || '');
  const [description, setDescription] = useState(editTransaction?.description || '');
  const [category, setCategory] = useState<Category>(editTransaction?.category || 'other');
  const [date, setDate] = useState(editTransaction?.date || new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'income' | 'expense'>(editTransaction?.type || 'expense');
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid positive amount",
        variant: "destructive"
      });
      return;
    }
    
    const transactionData = {
      amount: parsedAmount,
      description,
      category,
      date,
      type
    };
    
    if (editTransaction) {
      updateTransaction({
        ...transactionData,
        id: editTransaction.id
      });
      toast({
        title: "Success",
        description: "Transaction updated successfully",
      });
    } else {
      addTransaction(transactionData);
      toast({
        title: "Success",
        description: "Transaction added successfully",
      });
      
      // Reset form
      setAmount('');
      setDescription('');
      setCategory('other');
      setDate(new Date().toISOString().split('T')[0]);
      setType('expense');
    }
    
    if (onSave) {
      onSave();
    }
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    
    // Use AI to predict category if enabled and description has some content
    if (isAIEnabled && newDescription.length > 3 && !editTransaction) {
      const predictedCategory = predictCategory(newDescription);
      setCategory(predictedCategory);
    }
  };

  const inputClasses = `w-full p-2 rounded-md ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 text-gray-200 focus:border-finance-primary' 
      : 'border-gray-300'
  }`;
  
  return (
    <Card className={theme === 'dark' ? 'bg-gray-900 border-gray-800' : ''}>
      <CardHeader className={theme === 'dark' ? 'border-b border-gray-800' : ''}>
        <CardTitle className={theme === 'dark' ? 'text-gray-200' : ''}>
          {editTransaction ? 'Edit Transaction' : 'Add New Transaction'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>Amount</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={inputClasses}
                placeholder="0.00"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClasses}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>Description</label>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              className={inputClasses}
              placeholder="e.g., Grocery shopping at Walmart"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>Category</label>
              <div className="flex items-center space-x-2">
                <label className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>AI Categorization</label>
                <input
                  type="checkbox"
                  checked={isAIEnabled}
                  onChange={(e) => setIsAIEnabled(e.target.checked)}
                  className={`rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''} text-finance-primary focus:ring-finance-primary`}
                />
              </div>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputClasses}
              required
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>Type</label>
            <div className="flex space-x-4">
              <label className={`inline-flex items-center ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                <input
                  type="radio"
                  value="expense"
                  checked={type === 'expense'}
                  onChange={() => setType('expense')}
                  className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''} text-finance-primary focus:ring-finance-primary`}
                />
                <span className="ml-2">Expense</span>
              </label>
              <label className={`inline-flex items-center ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                <input
                  type="radio"
                  value="income"
                  checked={type === 'income'}
                  onChange={() => setType('income')}
                  className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''} text-finance-primary focus:ring-finance-primary`}
                />
                <span className="ml-2">Income</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              style={{ backgroundColor: "rgb(137 84 238)" }}
              className="hover:opacity-90"
            >
              {editTransaction ? 'Update' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
