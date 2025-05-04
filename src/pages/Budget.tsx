
import { useState } from "react";
import { BudgetProgress } from "@/components/budget/BudgetProgress";
import { BudgetTable } from "@/components/budget/BudgetTable";
import { BudgetForm } from "@/components/budget/BudgetForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/context/FinanceContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/ThemeContext";

export default function Budget() {
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const handleOpenDialog = (existingCategory?: Category) => {
    setEditingCategory(existingCategory || null);
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
            <BudgetTable onEditBudget={handleOpenDialog} />
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
          
          <BudgetForm 
            onClose={handleCloseDialog}
            editingCategory={editingCategory}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
