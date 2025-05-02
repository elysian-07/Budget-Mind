
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useFinance } from "@/context/FinanceContext";

// Currency options
const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", name: "Australian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
];

export function CurrencySettings() {
  const { toast } = useToast();
  const { state, setCurrency } = useFinance();
  const [selectedCurrency, setSelectedCurrency] = useState(state.currency.code);

  useEffect(() => {
    setSelectedCurrency(state.currency.code);
  }, [state.currency.code]);

  const handleCurrencyChange = (value: string) => {
    const selected = currencies.find(c => c.code === value);
    if (!selected) return;
    
    setSelectedCurrency(value);
    setCurrency(selected);
    
    toast({
      title: "Currency Updated",
      description: `Currency has been changed to ${selected.name}`,
      className: "bg-gradient-to-r from-finance-primary/80 to-finance-secondary/80 border-finance-primary text-white",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currency" className="text-base">Select Currency</Label>
        <Select
          value={selectedCurrency}
          onValueChange={handleCurrencyChange}
        >
          <SelectTrigger className="w-full border-finance-primary/20 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm dark:bg-gray-800/95">
            {currencies.map((curr) => (
              <SelectItem key={curr.code} value={curr.code} className="hover:bg-finance-primary/10">
                <div className="flex items-center">
                  <span className="mr-2 font-bold">{curr.symbol}</span>
                  <span>{curr.name} ({curr.code})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
