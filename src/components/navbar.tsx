import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  LayoutDashboard,
  MessageCircle,
  User,
  LogOut,
  ClipboardCheck,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/admin", icon: LayoutDashboard },
    { name: "Chat", href: "/admin/chat", icon: MessageCircle },
    { name: "Profile", href: "/admin/profile", icon: User },
    { name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck} 

]

const Navbar = () => {

    const { logout } = useAuthActions();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <nav className="container mx-auto flex items-center gap-2 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary ring-1 ring-border">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">
              Admin
            </span>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto px-1">
            {
            navigation.map((item) => (
                <NavLink key={item.name} 
                to={item.href} 
                aria-label={item.name}
                className={({isActive})=>(cn(
                  "flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors",
                  "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isActive && "bg-muted text-foreground"
                ))}
                end>
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                </NavLink>
            ))
            }
          </div>

        <Button onClick={logout} variant="outline" className="ml-auto shrink-0">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
        </Button>
        </nav>

    </header>
  )
}

export default Navbar