
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage - in a real app this would connect to a backend
const STORAGE_KEY = "finance-app-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check for existing user session
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in a real app, this would verify with your backend
      if (email && password) {
        // For demo, we'll create a user if the email contains "demo"
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: email.includes("demo") ? "Demo User" : "User",
          email: email,
        };
        
        setUser(mockUser);
        toast({
          title: "Login successful",
          description: `Welcome back, ${mockUser.name}!`,
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock signup - in a real app, this would register with your backend
      if (name && email && password) {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
        };
        
        setUser(newUser);
        toast({
          title: "Account created",
          description: `Welcome to Finance App, ${name}!`,
        });
      } else {
        throw new Error("Please fill all required fields");
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated",
        });
      } else {
        throw new Error("No user is logged in");
      }
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
