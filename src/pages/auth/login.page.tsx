import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { loginZodSchema, type LoginZodSchema } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const LoginPage = () => {

  const {loading} = useAuthActions();

  const form = useForm<LoginZodSchema>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",}


  });

  const onSubmit = (data: LoginZodSchema) => {
    console.log("login data", data)
  }

  

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