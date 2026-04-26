import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";


const LoginPage = () => {

  const {loading} = useAuthActions();

  

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
        <CardDescription className="text-center">Login to your account or with Google</CardDescription>

      </CardHeader>
      <CardContent>
        ....
      </CardContent>
      <CardFooterAuth type="login" loading={loading} />
      
    </Card>
  )
}

export default LoginPage