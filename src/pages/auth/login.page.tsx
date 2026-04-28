import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CardFooterAuth from "@/components/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { loginZodSchema, type LoginZodSchema } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  //FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


const LoginPage = () => {

  const {loading, login} = useAuthActions();

  const form = useForm<LoginZodSchema>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",}


  });

  const onSubmit = async (data: LoginZodSchema) => {
    const response = await login(data);
    if(!response.success){
      console.log("login failed:",response.error);
      if(response.error?.code === "auth/invalid-login-credentials"){
        /*form.setError(
          "email",{type: "manual", message: "Invalid email or password"}
        );*/
        toast.error("Invalid email or password");
      }
    }
  }

  

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
        <CardDescription className="text-center">Login to your account or with Google</CardDescription>

      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email" render ={({field}) => (
                <FormItem>
                   <FormLabel>Email</FormLabel> 
                    <FormControl>
                      <Input type = "email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage name="email"/>
                </FormItem>
              )}
              
              />
              <FormField
              control={form.control}
              name="password" render ={({field}) => (
                <FormItem>
                   <FormLabel>Password</FormLabel> 
                    <FormControl>
                      <Input type = "password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage name="password"/>
                </FormItem>
              )}
              
              />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth type="login" loading={loading} />
      
    </Card>
  )
}

export default LoginPage