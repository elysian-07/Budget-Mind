
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("notifications") === "true";
  });
  const { toast } = useToast();
  
  const handleToggleNotifications = (enabled: boolean) => {
    setNotifications(enabled);
    localStorage.setItem("notifications", String(enabled));
    
    toast({
      title: enabled ? "Notifications Enabled" : "Notifications Disabled",
      description: enabled ? 
        "You will now receive notifications about important events" : 
        "You won't receive any notifications",
      className: `${enabled ? "bg-gradient-to-r from-green-500/80 to-green-600/80" : "bg-gradient-to-r from-gray-500/80 to-gray-600/80"} text-white`,
    });
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl">
      <div className="space-y-0.5">
        <Label htmlFor="notifications" className="text-base font-medium flex items-center gap-2">
          {notifications ? 
            <Bell className="h-4 w-4 text-finance-primary" /> : 
            <BellOff className="h-4 w-4 text-gray-400" />
          }
          Enable Notifications
        </Label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Get notified about important events
        </p>
      </div>
      <Switch
        id="notifications"
        checked={notifications}
        onCheckedChange={handleToggleNotifications}
        className="data-[state=checked]:bg-finance-primary"
      />
    </div>
  );
}
