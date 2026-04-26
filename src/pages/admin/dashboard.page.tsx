import { useAuthActions } from "@/hooks/use-auth-actions";
import { Button } from "D:/REACT TS NEXTJS/react7/src/components/ui/button.tsx";
import { useUser } from "reactfire"

const DashboardPage = () => {
  
  const {data: user} = useUser();
  const {logout} = useAuthActions();
  
  return (
    <div className = "container mx-auto p-4">
      <h1>DashboardPage</h1>
      <p>Welcome, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "Not available"}</p>
      <Button variant="destructive"
      onClick={logout}>Sign Out</Button>
    </div>
    
  )
}

export default DashboardPage