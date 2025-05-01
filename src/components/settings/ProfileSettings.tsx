
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export function ProfileSettings() {
  const { user, updateProfile, logout, isLoading } = useAuth();
  const { toast } = useToast();
  
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

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <>
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
    </>
  );
}
