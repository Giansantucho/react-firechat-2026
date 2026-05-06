import { useAuthActions } from "@/hooks/use-auth-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, LogOut, Mail, User } from "lucide-react";
import { useUser } from "reactfire"

const DashboardPage = () => {
  
  const {data: user} = useUser();
  const {logout} = useAuthActions();
  
  return (
    <div className="py-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            Dashboard
          </CardTitle>
          <CardDescription>Resumen rápido de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 ring-1 ring-border">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">Nombre</div>
                <div className="truncate text-sm font-medium">
                  {user?.displayName || "Guest"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 ring-1 ring-border">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="truncate text-sm font-medium">
                  {user?.email || "Not available"}
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={logout} className="w-full sm:w-auto">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
    
  )
}

export default DashboardPage