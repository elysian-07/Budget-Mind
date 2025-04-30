
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChartBar } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

export default function Analytics() {
  const { state } = useFinance();
  
  // Group transactions by category for spending analysis
  const categoryData = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: Record<string, number>, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});
    
  // Convert to array format for charts
  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));
  
  // Monthly spending data (using current demo data)
  const monthlyData = [
    { month: 'Jan', spending: 1200 },
    { month: 'Feb', spending: 1400 },
    { month: 'Mar', spending: 1100 },
    { month: 'Apr', spending: 1600 },
    { month: 'May', spending: 1300 },
    { month: 'Jun', spending: 1500 },
  ];

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      
      <Alert className="mb-6">
        <ChartBar className="h-4 w-4" />
        <AlertTitle>Financial Analytics</AlertTitle>
        <AlertDescription>
          Visualize your spending patterns and financial trends with detailed charts and analytics.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
            <CardDescription>
              Track your spending trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  spending: {
                    label: "Spending",
                    color: "#8B5CF6"
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      content={
                        ({active, payload}) => active && payload && payload.length ? (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="flex flex-col">
                              <span className="font-bold">${payload[0]?.value}</span>
                              <span className="text-gray-500">{payload[0]?.payload.month}</span>
                            </div>
                          </div>
                        ) : null
                      }
                    />
                    <Legend />
                    <Bar dataKey="spending" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>
              Breakdown of your expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  value: {
                    label: "Amount",
                    color: "#D946EF"
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryChartData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 70,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent />
                      }
                    />
                    <Bar dataKey="value" fill="#D946EF" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Income vs. Expenses</CardTitle>
            <CardDescription>
              Compare your monthly income and expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  income: {
                    label: "Income",
                    color: "#22C55E"
                  },
                  expenses: {
                    label: "Expenses",
                    color: "#EF4444"
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: 'Jan', income: 3000, expenses: 1200 },
                      { month: 'Feb', income: 3000, expenses: 1400 },
                      { month: 'Mar', income: 3000, expenses: 1100 },
                      { month: 'Apr', income: 3200, expenses: 1600 },
                      { month: 'May', income: 3200, expenses: 1300 },
                      { month: 'Jun', income: 3200, expenses: 1500 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent />
                      }
                    />
                    <Legend />
                    <Bar dataKey="income" fill="#22C55E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Savings Trend</CardTitle>
            <CardDescription>
              Track your savings progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer
                config={{
                  savings: {
                    label: "Savings",
                    color: "#0EA5E9"
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: 'Jan', savings: 1800 },
                      { month: 'Feb', savings: 1600 },
                      { month: 'Mar', savings: 1900 },
                      { month: 'Apr', savings: 1600 },
                      { month: 'May', savings: 1900 },
                      { month: 'Jun', savings: 1700 },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent />
                      }
                    />
                    <Legend />
                    <Bar dataKey="savings" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
