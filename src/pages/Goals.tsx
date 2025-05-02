
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Target, PlusCircle } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/context/ThemeContext";

type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description: string;
};

export default function Goals() {
  const { state } = useFinance();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem('financial-goals');
    if (savedGoals) {
      return JSON.parse(savedGoals);
    }
    return [
      { 
        id: '1', 
        name: 'Emergency Fund', 
        targetAmount: 10000, 
        currentAmount: 3500, 
        deadline: '2025-12-31',
        description: 'Save for unexpected expenses'
      },
      { 
        id: '2', 
        name: 'Vacation', 
        targetAmount: 2500, 
        currentAmount: 800, 
        deadline: '2025-08-31',
        description: 'Summer vacation fund'
      },
      { 
        id: '3', 
        name: 'New Laptop', 
        targetAmount: 1500, 
        currentAmount: 500, 
        deadline: '2025-09-30',
        description: 'Replace aging work computer'
      }
    ];
  });
  
  // Form state
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id'>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    description: ''
  });

  // Save goals to localStorage whenever they change
  const saveGoals = (updatedGoals: Goal[]) => {
    localStorage.setItem('financial-goals', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const goal: Goal = {
      ...newGoal,
      id: Math.random().toString(36).substring(2, 9)
    };
    
    const updatedGoals = [...goals, goal];
    saveGoals(updatedGoals);
    
    toast({
      title: "Goal Added",
      description: "Your financial goal has been added successfully",
      className: "bg-gradient-to-r from-finance-primary/80 to-finance-secondary/80 border-finance-primary text-white",
    });
    
    setNewGoal({
      name: '',
      targetAmount: 0,
      currentAmount: 0,
      deadline: '',
      description: ''
    });
    
    setIsDialogOpen(false);
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Financial Goals</h1>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-finance-primary hover:bg-finance-secondary"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>
      
      <Alert className="mb-6">
        <Target className="h-4 w-4" />
        <AlertTitle>Track Your Financial Goals</AlertTitle>
        <AlertDescription>
          Set targets and monitor your progress towards your financial objectives.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle>{goal.name}</CardTitle>
              <CardDescription>
                {goal.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Progress:</span>
                  <span className="text-sm font-medium">
                    {state.currency.symbol}{goal.currentAmount.toFixed(2)} / {state.currency.symbol}{goal.targetAmount.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Target date: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Goal Name</label>
              <input
                type="text"
                value={newGoal.name}
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                className={`w-full p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                placeholder="e.g. New Car, Vacation"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Amount</label>
              <input
                type="number"
                step="0.01"
                value={newGoal.targetAmount || ''}
                onChange={(e) => setNewGoal({...newGoal, targetAmount: parseFloat(e.target.value) || 0})}
                className={`w-full p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Current Amount</label>
              <input
                type="number"
                step="0.01"
                value={newGoal.currentAmount || ''}
                onChange={(e) => setNewGoal({...newGoal, currentAmount: parseFloat(e.target.value) || 0})}
                className={`w-full p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Date</label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                className={`w-full p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                className={`w-full p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                placeholder="What are you saving for?"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddGoal}
              className="bg-gradient-to-r from-finance-primary to-finance-secondary hover:opacity-90 text-white"
            >
              Add Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
