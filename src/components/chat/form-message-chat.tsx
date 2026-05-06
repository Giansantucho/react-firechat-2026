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
import { Send } from "lucide-react";


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
        const cleanText = values.text?.trim();
        if(!cleanText) return;
        startTransition(async () => {
            try{
            await sendMessage(cleanText)
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
        className="flex items-end gap-2"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Escribe un mensaje…"
                  {...field}
                />
              </FormControl>
              <FormMessage name = "text"/>
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !form.watch("text")?.trim()}
          aria-label="Enviar mensaje"
          title="Enviar"
        >
          <Send />
        </Button>
      </form>
    </Form>
  )
}

export default FormMessageChat