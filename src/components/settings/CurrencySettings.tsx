
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Currency options
const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", name: "Australian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
];

export function CurrencySettings() {
  const { toast } = useToast();
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("preferred-currency") || "USD";
  });

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    toast({
      title: "Currency Updated",
      description: `Currency has been changed to ${currencies.find(c => c.code === value)?.name}`,
    });
    localStorage.setItem("preferred-currency", value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currency" className="text-base">Select Currency</Label>
        <Select
          value={currency}
          onValueChange={handleCurrencyChange}
        >
          <SelectTrigger className="w-full border-finance-primary/20">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((curr) => (
              <SelectItem key={curr.code} value={curr.code}>
                <div className="flex items-center">
                  <span className="mr-2">{curr.symbol}</span>
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
