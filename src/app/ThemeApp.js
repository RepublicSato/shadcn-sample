import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select.jsx"
import { Button } from "../components/ui/button.jsx"
import { useState } from "react";
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "../components/ui/use-toast"

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})


const ThemeApp = () => {
    const { toast } = useToast()
    const form = useForm({
      resolver: zodResolver(FormSchema),
    })
    const [selectedColor, setSelectedColor] = useState('red');
    const handleColorChange = (color) => {
        setSelectedColor(color);        
    };
    const onSubmitTheme = () => {
        var oldColor = localStorage.getItem("theme");
        if(oldColor === selectedColor) return
        document.documentElement.classList.remove(oldColor)
        document.documentElement.classList.add(selectedColor)
        localStorage.setItem("theme",selectedColor)
        toast({
          description: "Theme has been changed",
        })
    }

    const onSubmit = (data) => {
      console.log("saddsa")
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }

    return (
      <div className={`dark h-screen flex flex-col items-center justify-center`}>
        <h1>Color Theme Changer</h1>
        <Select onValueChange={(event) => handleColorChange(event)}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
        </SelectContent>
        </Select>
        <Button onClick={()=>onSubmitTheme()}>Submit</Button>

        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <a href="/examples/forms">email settings</a>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </div>
    );
};

export default ThemeApp;