import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { findFriendZodSchema, type FindFriendZodSchemaType } from "@/lib/zod.schema";
import { useTransition } from "react";
import { useRoomActions } from "@/hooks/use-room-actions";
import { toast } from "sonner";

interface Props{
    handleClickRoomId: (roomId: string) => void
}

const FormSearchFriend = ({handleClickRoomId}: Props) => {
    
    const  [isLoading, startTransition] = useTransition()
    const {findOrCreateRoom} = useRoomActions()

    const form = useForm<FindFriendZodSchemaType>({
    resolver: zodResolver(findFriendZodSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: FindFriendZodSchemaType) {
    startTransition(async() => {
        const response = await findOrCreateRoom(values.email)

        console.log(response)
        if(response.success){
            handleClickRoomId(response.roomId)
            toast.success("friend encontrado, comienza a chatear")
            form.reset()
            return 
        }

        toast.error(response.message)
    })
  }
  
    return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="email" render ={({field}) => (
                <FormItem>
                   <FormLabel>Email</FormLabel> 
                    <FormControl>
                      <Input placeholder="Email del amigo…" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage name="email"/>
                </FormItem>
              )}
              
              />

          <Button type="submit" variant={"outline"} disabled = {isLoading}>
            {
              isLoading ? "Buscando friend" : "Buscar"
            }
          </Button>
          </form>
        </Form>
  )
}

export default FormSearchFriend