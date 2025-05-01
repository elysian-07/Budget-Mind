
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/components/ui/use-toast";

export function AppearanceSettings() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleToggleTheme = () => {
    toggleTheme();
    toast({
      title: "Theme Changed",
      description: `Theme switched to ${theme === 'light' ? "dark" : "light"} mode.`,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Switch between light and dark theme
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-amber-500' : 'text-gray-500 dark:text-gray-400'}`} />
        <Switch
          id="dark-mode"
          checked={theme === "dark"}
          onCheckedChange={handleToggleTheme}
          className="data-[state=checked]:bg-finance-primary"
        />
        <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-finance-primary' : 'text-gray-500 dark:text-gray-400'}`} />
      </div>
    </div>
  );
}
