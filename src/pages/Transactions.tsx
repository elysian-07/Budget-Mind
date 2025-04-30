
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

export default function Transactions() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-finance-primary hover:bg-finance-secondary"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>
      
      <TransactionList />
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm onSave={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
