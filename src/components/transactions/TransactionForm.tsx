
import { useState } from "react";
import { useFinance, Category, Transaction } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { predictCategory } from "@/services/aiService";

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
  const { addTransaction, updateTransaction } = useFinance();
  const { toast } = useToast();
  
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editTransaction ? 'Edit Transaction' : 'Add New Transaction'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="0.00"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Grocery shopping at Walmart"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Category</label>
              <div className="flex items-center space-x-2">
                <label className="text-xs text-gray-500">AI Categorization</label>
                <input
                  type="checkbox"
                  checked={isAIEnabled}
                  onChange={(e) => setIsAIEnabled(e.target.checked)}
                  className="rounded text-finance-primary focus:ring-finance-primary"
                />
              </div>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full p-2 border border-gray-300 rounded-md"
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
            <label className="text-sm font-medium">Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="expense"
                  checked={type === 'expense'}
                  onChange={() => setType('expense')}
                  className="text-finance-primary focus:ring-finance-primary"
                />
                <span className="ml-2">Expense</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="income"
                  checked={type === 'income'}
                  onChange={() => setType('income')}
                  className="text-finance-primary focus:ring-finance-primary"
                />
                <span className="ml-2">Income</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-finance-primary hover:bg-finance-secondary">
              {editTransaction ? 'Update' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
