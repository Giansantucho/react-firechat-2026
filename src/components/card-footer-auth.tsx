import { Button } from "D:/REACT TS NEXTJS/react7/src/components/ui/button.tsx";
import {CardFooter} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuthActions } from "@/hooks/use-auth-actions";

import {Mail} from "lucide-react";
import { Link } from "react-router";

interface CardFooterAuthProps {
    type: "login" | "register";
    loading: boolean;
}

const CardFooterAuth = ({ type, loading }: CardFooterAuthProps) => {

    const isLogin = type === "login";
    const {loginWithGoogle} = useAuthActions();
  
    const handleLoginWithGoogle = async () => {

    const result = await loginWithGoogle();
    if (result.success) {
      console.log("Login successful");
    } else {
      console.error("Login failed:", result.error);
      toast.error("Login failed: ");
    }
  };
  
    return (
    <CardFooter className="flex flex-col items-center gap-4">
        <Button onClick={handleLoginWithGoogle} className="w-full" disabled={loading} variant="outline">
          <Mail className="mr-2" />
          {isLogin ? "Login with Google" : "Register with Google"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Link to={isLogin ? "/auth/register" : "/auth/login"} className="ml-1 underline">
            <Button variant="link" className="p-0 h-auto font-normal">
                {isLogin ? "Register" : "Login"}
            </Button>
          </Link>
        </p>

      </CardFooter>
  )
}

export default CardFooterAuth


