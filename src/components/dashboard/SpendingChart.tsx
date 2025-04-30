
import { useFinance, Category } from "@/context/FinanceContext";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Define colors for categories
const CATEGORY_COLORS: Record<Category, string> = {
  food: '#FF9F40',
  transportation: '#36A2EB',
  housing: '#4BC0C0',
  utilities: '#FFCD56',
  entertainment: '#FF6384',
  healthcare: '#FF5252',
  education: '#4CAF50',
  shopping: '#9966FF',
  personal: '#00BCD4',
  travel: '#2196F3',
  gifts: '#E91E63',
  income: '#66BB6A',
  other: '#9E9E9E',
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent 
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function SpendingChart() {
  const { state } = useFinance();

  const chartData = useMemo(() => {
    // Group expenses by category
    const categoryTotals = new Map<Category, number>();
    
    state.transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        const currentTotal = categoryTotals.get(transaction.category) || 0;
        categoryTotals.set(transaction.category, currentTotal + transaction.amount);
      }
    });

    // Convert to array format for chart
    return Array.from(categoryTotals.entries())
      .map(([category, amount]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: amount,
        color: CATEGORY_COLORS[category]
      }))
      .filter(item => item.value > 0);
  }, [state.transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                  labelFormatter={(name) => name as string}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No expense data available
            </div>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
          {chartData.map((entry) => (
            <div key={entry.name} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="truncate">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
