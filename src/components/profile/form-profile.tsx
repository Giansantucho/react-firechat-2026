import { useProfileActions } from "@/hooks/use-profile-actions";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { updateProfileZodSchema, type UpdateProfileZodSchemaType } from "@/lib/zod.schema";
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
import type { User } from "firebase/auth";
import { toast } from "sonner";
//import { toast } from "sonner";

interface FormProfileProps{
    user: User;
}

const FormProfile = ({user}: FormProfileProps) => {
  
  const {loading, updateUserProfile} = useProfileActions();
  

  const form = useForm<UpdateProfileZodSchemaType>({
    resolver: zodResolver(updateProfileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL ||  "",
    },
  })

  async function onSubmit(values: UpdateProfileZodSchemaType) {
    const result = await updateUserProfile(values)
    if(result.success){
    return toast.success("Profile updated successfylly")
    }
    toast.error("error updating")
  }

    return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="displayName" render ={({field}) => (
                <FormItem>
                   <FormLabel>Username</FormLabel> 
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage name="displayName"/>
                </FormItem>
              )}
              
              />

              <FormField
              control={form.control}
              name="photoURL" render ={({field}) => (
                <FormItem>
                   <FormLabel>FOTO</FormLabel> 
                    <FormControl>
                      <Input placeholder="https://example.com/photo.jpg" {...field} />
                    </FormControl>
                    <FormMessage name="photoURL"/>
                </FormItem>
              )}
              
              />




          <Button type="submit" disabled = {loading}>
            {loading ? "Updating" : "Update Profile"}
          </Button>
          </form>
        </Form>
  )
}

export default FormProfile