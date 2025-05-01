
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="notifications">Enable Notifications</Label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Get notified about important events
        </p>
      </div>
      <Switch
        id="notifications"
        checked={notifications}
        onCheckedChange={setNotifications}
        className="data-[state=checked]:bg-finance-primary"
      />
    </div>
  );
}
