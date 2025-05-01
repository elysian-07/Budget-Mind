
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingsCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  children: ReactNode;
  gradientHeader?: boolean;
}

export function SettingsCard({ 
  title, 
  description, 
  icon, 
  children,
  gradientHeader = true,
}: SettingsCardProps) {
  return (
    <Card className="border-finance-primary/20 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className={gradientHeader ? "bg-gradient-to-r from-finance-primary/10 to-transparent" : ""}>
        <div className="flex items-center">
          {icon && <div className="mr-2">{icon}</div>}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
