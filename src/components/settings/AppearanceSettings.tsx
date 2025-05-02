
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

export function AppearanceSettings() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleTheme = () => {
    setIsAnimating(true);
    toggleTheme();
    
    toast({
      title: "Theme Changed",
      description: `Theme switched to ${theme === 'light' ? "dark" : "light"} mode.`,
      className: "bg-gradient-to-r from-finance-primary/80 to-finance-secondary/80 border-finance-primary text-white",
    });
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl">
      <div className="space-y-0.5">
        <Label htmlFor="dark-mode" className="text-base font-medium">Dark Mode</Label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Switch between light and dark theme
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Sun className={`h-5 w-5 transition-all ${theme === 'light' 
          ? 'text-amber-500 scale-110' 
          : 'text-gray-400 dark:text-gray-600 scale-90'} 
          ${isAnimating ? 'animate-spin' : ''}`} 
        />
        
        <Switch
          id="dark-mode"
          checked={theme === "dark"}
          onCheckedChange={handleToggleTheme}
          className="data-[state=checked]:bg-finance-primary"
        />
        
        <Moon className={`h-5 w-5 transition-all ${theme === 'dark' 
          ? 'text-finance-primary scale-110' 
          : 'text-gray-400 scale-90'} 
          ${isAnimating ? 'animate-spin' : ''}`} 
        />
      </div>
    </div>
  );
}
