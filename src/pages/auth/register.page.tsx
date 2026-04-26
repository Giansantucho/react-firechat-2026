import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";

const RegisterPage= () => {
  
  const {loading} = useAuthActions();

  

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Register</CardTitle>
        <CardDescription className="text-center">Create a new account or sign up with Google</CardDescription>

      </CardHeader>
      <CardContent>
        ....
      </CardContent>
      <CardFooterAuth type="register" loading={loading} />
      
    </Card>
  )
}

export default RegisterPage