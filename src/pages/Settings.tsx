
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Moon, Sun, User, Loader2, Palette, CurrencyIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

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

export default function Settings() {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { user, updateProfile, logout, isLoading } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [exportTypes, setExportTypes] = useState({
    csv: true,
    pdf: false,
    json: false,
  });

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        name: profileData.name,
        email: profileData.email,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleToggleTheme = () => {
    toggleTheme();
    toast({
      title: "Theme Changed",
      description: `Theme switched to ${theme === 'light' ? "dark" : "light"} mode.`,
    });
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    toast({
      title: "Currency Updated",
      description: `Currency has been changed to ${currencies.find(c => c.code === value)?.name}`,
    });
    localStorage.setItem("preferred-currency", value);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

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
                  <AvatarFallback className="bg-finance-primary text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {user ? (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="border-finance-primary/20 focus:border-finance-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="border-finance-primary/20 focus:border-finance-primary/50"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-finance-primary to-finance-secondary hover:opacity-90 text-white shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLogout}
                    className="border-finance-primary/20 hover:bg-finance-primary/5"
                  >
                    Log Out
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">Not Logged In</h3>
                <p className="text-gray-500 mb-4">
                  Log in to manage your profile settings
                </p>
                <Button
                  onClick={() => window.location.href = "/login"}
                  className="bg-gradient-to-r from-finance-primary to-finance-secondary hover:opacity-90 text-white shadow-md"
                >
                  Login / Sign Up
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-finance-primary/20 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-finance-primary/10 to-transparent">
            <div className="flex items-center">
              <Palette className="h-5 w-5 text-finance-primary mr-2" />
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize your app experience
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Currency Settings */}
        <Card className="border-finance-primary/20 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-finance-primary/10 to-transparent">
            <div className="flex items-center">
              <CurrencyIcon className="h-5 w-5 text-finance-primary mr-2" />
              <div>
                <CardTitle>Currency Settings</CardTitle>
                <CardDescription>
                  Set your preferred currency for the app
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-finance-primary/20 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-finance-primary/10 to-transparent">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Collapsible
          open={advancedOpen}
          onOpenChange={setAdvancedOpen}
          className="w-full"
        >
          <Card className="border-finance-primary/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-finance-primary/10 to-transparent">
              <div className="flex items-center justify-between">
                <CardTitle>Advanced Settings</CardTitle>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {advancedOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CardDescription>
                Configure advanced application settings
              </CardDescription>
            </CardHeader>

            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data Export Format</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="csv"
                          checked={exportTypes.csv}
                          onCheckedChange={(checked) =>
                            setExportTypes({ ...exportTypes, csv: !!checked })
                          }
                          className="data-[state=checked]:bg-finance-primary data-[state=checked]:border-finance-primary"
                        />
                        <Label htmlFor="csv">CSV</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pdf"
                          checked={exportTypes.pdf}
                          onCheckedChange={(checked) =>
                            setExportTypes({ ...exportTypes, pdf: !!checked })
                          }
                          className="data-[state=checked]:bg-finance-primary data-[state=checked]:border-finance-primary"
                        />
                        <Label htmlFor="pdf">PDF</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="json"
                          checked={exportTypes.json}
                          onCheckedChange={(checked) =>
                            setExportTypes({ ...exportTypes, json: !!checked })
                          }
                          className="data-[state=checked]:bg-finance-primary data-[state=checked]:border-finance-primary"
                        />
                        <Label htmlFor="json">JSON</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
}
