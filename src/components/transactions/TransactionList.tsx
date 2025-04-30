
import { useState, useMemo } from "react";
import { useFinance, Transaction } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { TransactionForm } from "./TransactionForm";
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
  Edit,
  Trash,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

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

export function TransactionList() {
  const { state, deleteTransaction } = useFinance();
  const { toast } = useToast();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  
  const sortedAndFilteredTransactions = useMemo(() => {
    let filtered = state.transactions;
    
    // Apply filter
    if (filter === 'income') {
      filtered = filtered.filter(t => t.type === 'income');
    } else if (filter === 'expense') {
      filtered = filtered.filter(t => t.type === 'expense');
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });
  }, [state.transactions, sortBy, sortOrder, filter]);
  
  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedTransaction) {
      deleteTransaction(selectedTransaction.id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      });
    }
  };
  
  const toggleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-finance-primary' : ''}
            >
              All
            </Button>
            <Button
              variant={filter === 'income' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('income')}
              className={filter === 'income' ? 'bg-finance-income' : ''}
            >
              Income
            </Button>
            <Button
              variant={filter === 'expense' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('expense')}
              className={filter === 'expense' ? 'bg-finance-expense' : ''}
            >
              Expenses
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('date')}
              className="flex items-center space-x-1"
            >
              <span>Date</span>
              {sortBy === 'date' && (
                sortOrder === 'asc' ? 
                <ArrowUp className="h-4 w-4" /> : 
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('amount')}
              className="flex items-center space-x-1"
            >
              <span>Amount</span>
              {sortBy === 'amount' && (
                sortOrder === 'asc' ? 
                <ArrowUp className="h-4 w-4" /> : 
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        {sortedAndFilteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedAndFilteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            {categoryIcons[transaction.category]}
                          </div>
                        </div>
                        <span className="truncate max-w-[200px]">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {transaction.category}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${
                      transaction.type === 'income' ? 'text-finance-income' : 'text-finance-expense'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(transaction)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(transaction)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No transactions found with the selected filter.
          </div>
        )}
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            {selectedTransaction && (
              <TransactionForm 
                editTransaction={selectedTransaction}
                onSave={() => setIsEditDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete this transaction?</p>
              <p className="mt-2 text-sm text-gray-500">
                <strong>Description:</strong> {selectedTransaction?.description}<br />
                <strong>Amount:</strong> ${selectedTransaction?.amount.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
