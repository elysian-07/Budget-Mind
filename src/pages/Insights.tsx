
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function Insights() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Insights</h1>
      
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>AI-Powered Insights</AlertTitle>
        <AlertDescription>
          Discover patterns in your spending and get personalized recommendations to improve your financial health.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spending Pattern Analysis</CardTitle>
            <CardDescription>
              AI analysis of your spending habits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Based on your recent transactions, you spend most on dining and entertainment. 
              Consider setting a budget for these categories to save more.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Savings Opportunities</CardTitle>
            <CardDescription>
              Potential ways to increase your savings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Reducing your weekly coffee expenses by 20% could save you approximately $25 per month.
              That's $300 per year towards your savings goals!
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Budget Recommendations</CardTitle>
            <CardDescription>
              Personalized budget suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Based on your income and spending patterns, we recommend allocating 50% to needs, 
              30% to wants, and 20% to savings for optimal financial health.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Financial Forecast</CardTitle>
            <CardDescription>
              Projections for your financial future
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              At your current saving rate, you're on track to reach your emergency fund goal 
              in approximately 8 months. Consider increasing monthly contributions to accelerate this timeline.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
