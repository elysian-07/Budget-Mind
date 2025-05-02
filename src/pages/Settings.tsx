
import { CurrencyIcon, Palette, User, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { CurrencySettings } from "@/components/settings/CurrencySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AdvancedSettings } from "@/components/settings/AdvancedSettings";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Show a welcome toast when the page loads
    const hasSeenWelcome = sessionStorage.getItem('settings-welcome-shown');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast({
          title: "Settings Page",
          description: "Customize your experience by adjusting the settings below",
          className: "bg-gradient-to-r from-finance-primary/80 to-finance-secondary/80 text-white border-finance-primary",
        });
        sessionStorage.setItem('settings-welcome-shown', 'true');
      }, 500);
    }
  }, [toast]);

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Customize your finance app experience</p>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="border-finance-primary/20 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <CardHeader className="bg-gradient-to-r from-finance-primary/20 to-transparent dark:from-finance-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-finance-primary" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </div>
              {user && (
                <Avatar className="h-12 w-12 ring-2 ring-finance-primary/30">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback className={`${theme === 'dark' ? 'bg-finance-secondary' : 'bg-finance-primary'} text-white`}>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ProfileSettings />
          </CardContent>
        </Card>

        {/* Appearance */}
        <SettingsCard 
          title="Appearance" 
          description="Customize your app experience"
          icon={<Palette className="h-5 w-5 text-finance-primary" />}
          gradientHeader={true}
        >
          <AppearanceSettings />
        </SettingsCard>

        {/* Currency Settings */}
        <SettingsCard 
          title="Currency Settings"
          description="Set your preferred currency for the app"
          icon={<CurrencyIcon className="h-5 w-5 text-finance-primary" />}
          gradientHeader={true}
        >
          <CurrencySettings />
        </SettingsCard>

        {/* Notifications */}
        <SettingsCard
          title="Notifications"
          description="Manage how you receive notifications"
          icon={<Bell className="h-5 w-5 text-finance-primary" />}
          gradientHeader={true}
        >
          <NotificationSettings />
        </SettingsCard>

        {/* Advanced Settings */}
        <Card className="border-finance-primary/20 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <CardHeader className="bg-gradient-to-r from-finance-primary/20 to-transparent dark:from-finance-primary/10">
            <AdvancedSettings />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
