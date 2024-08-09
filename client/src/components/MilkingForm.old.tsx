"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  beginTime: z.string().min(1, {
    message: "Begin Time is required.",
  }),
  milkingNumber: z.number().min(1, {
    message: "Milking Number must be at least 1.",
  }),
  duration: z.string().min(1, {
    message: "Duration is required.",
  }),
  yield: z.number().min(0, {
    message: "Yield must be at least 0.",
  }),
  occ: z.number().min(0, {
    message: "OCC must be at least 0.",
  }),
  milkingInterval: z.string().min(1, {
    message: "Milking Interval is required.",
  }),
  lf: z.number().min(0, {
    message: "LF must be at least 0.",
  }),
  rf: z.number().min(0, {
    message: "RF must be at least 0.",
  }),
  lr: z.number().min(0, {
    message: "LR must be at least 0.",
  }),
  rr: z.number().min(0, {
    message: "RR must be at least 0.",
  }),
  udder: z.number().min(0, {
    message: "Udder must be at least 0.",
  }),
  milkDestination: z.string().min(1, {
    message: "Milk Destination is required.",
  }),
})

interface MilkingFormProps {
    initialValues: z.infer<typeof formSchema> | null;
    onSubmit: (data: z.infer<typeof formSchema>) => void;
  }

export default function MilkingForm({ initialValues}: MilkingFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? {},
  })

  const { handleSubmit } = form;

  /* hanled this from Milk listing*/
//   const onSubmit = async (data: any) => {
//     try {
//       const response = await fetch('/api/milking', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })
//       const result = await response.json()
//       console.log(result)
//     } catch (error) {
//       console.error(error)
//     }
//   }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit({{}})} className="space-y-8">
        <FormField
          control={form.control}
          name="beginTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" placeholder="2022-01-01T00:00" {...field} value={field.value || ''} />
              </FormControl>
              <FormDescription>
                This is the begin time of milking.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="milkingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Milking Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter the number" {...field} value={field.value|| ''}/>
              </FormControl>
              <FormDescription>
                This is the milking number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add more fields here */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}