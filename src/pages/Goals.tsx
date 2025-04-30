
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Target } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useState } from "react";

export default function Goals() {
  const { state } = useFinance();
  const [goals] = useState([
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
  ]);

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Financial Goals</h1>
      
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
                    ${goal.currentAmount} / ${goal.targetAmount}
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
    </div>
  );
}
