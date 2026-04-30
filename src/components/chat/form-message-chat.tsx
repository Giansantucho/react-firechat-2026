import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMessageActions } from "@/hooks/use-messages-actions";
import { toast } from "sonner";
import {useTransition } from "react";


interface Props{
    roomId: string
}

const FormMessageChat = ({roomId}: Props) => {
    
    const [isLoading, startTransition] = useTransition()

    const {sendMessage} = useMessageActions(roomId)

    const form = useForm<MessageZodSchemaType>({
        resolver: zodResolver(messageZodSchema),
        defaultValues: {
          text: ""
        },
      });

    async function onSubmit(values: MessageZodSchemaType){
        startTransition(async () => {
            try{
            await sendMessage(values.text)
            form.reset()
        }
        catch(error){
            console.log(error)
            toast.error("no se pudo enviar el mensaje")
        }
        })

    }
 
    return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Ingrese mensaje"
                  {...field}
                />
              </FormControl>
              <FormMessage name = "text"/>
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled = {isLoading}>
        {isLoading ? "ENVIANDO MENSAJE" : "ENVIAR"}
        </Button>
      </form>
    </Form>
  )
}

export default FormMessageChat