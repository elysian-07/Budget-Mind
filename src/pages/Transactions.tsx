
import { useState } from "react";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/ThemeContext";

export default function Transactions() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { theme } = useTheme();
  
  const budgetMindColor = "rgb(137 84 238)";
  
  return (
    <div className={`container py-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          style={{ backgroundColor: budgetMindColor }}
          className="hover:opacity-90"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>
      
      <TransactionList />
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className={`max-w-md ${theme === 'dark' ? 'theme-card' : ''}`}>
          <DialogHeader>
            <DialogTitle className={theme === 'dark' ? 'text-gray-200' : ''}>Add New Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm onSave={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
