
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Settings() {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [notifications, setNotifications] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [exportTypes, setExportTypes] = useState({
    csv: true,
    pdf: false,
    json: false,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleToggleTheme = () => {
    toggleTheme();
    toast({
      title: "Theme Changed",
      description: `Theme switched to ${theme === 'light' ? "dark" : "light"} mode.`,
    });
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="button"
                onClick={handleSaveProfile}
                className="bg-finance-primary hover:bg-finance-secondary"
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize your app experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark theme
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={handleToggleTheme}
                />
                <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
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
          <Card>
            <CardHeader>
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
