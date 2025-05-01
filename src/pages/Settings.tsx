
import { CurrencyIcon, Palette, User } from "lucide-react";
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

export default function Settings() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="border-finance-primary/20 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-finance-primary/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile Settings</CardTitle>
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
          <CardContent>
            <ProfileSettings />
          </CardContent>
        </Card>

        {/* Appearance */}
        <SettingsCard 
          title="Appearance" 
          description="Customize your app experience"
          icon={<Palette className="h-5 w-5 text-finance-primary" />}
        >
          <AppearanceSettings />
        </SettingsCard>

        {/* Currency Settings */}
        <SettingsCard 
          title="Currency Settings"
          description="Set your preferred currency for the app"
          icon={<CurrencyIcon className="h-5 w-5 text-finance-primary" />}
        >
          <CurrencySettings />
        </SettingsCard>

        {/* Notifications */}
        <SettingsCard
          title="Notifications"
          description="Manage how you receive notifications"
        >
          <NotificationSettings />
        </SettingsCard>

        {/* Advanced Settings */}
        <Card className="border-finance-primary/20 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-finance-primary/10 to-transparent">
            <AdvancedSettings />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
