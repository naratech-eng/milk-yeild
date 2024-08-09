
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

import { useForm } from 'react-hook-form';

interface MilkingData {
    "Begin Time": string;
    "Milking Number": string;
    "Duration (mm:ss)": string;
    "Yield (kg)": string;
    "OCC (*1000 cells/ml)": string;
    "Milking Interval (hh:mm)": string;
    LF: string;
    RF: string;
    LR: string;
    RR: string;
    Udder: string;
    "Milk Destination": string;
  }
  
  interface MilkingFormProps {
    selectedMilking?: MilkingData;
    onSubmit: (data: MilkingData) => void;
  }

const MilkingForm = ({ selectedMilking, onSubmit }: MilkingFormProps) => {
  const form = useForm({
    defaultValues: selectedMilking || {
      "Begin Time": '',
      "Milking Number": '',
      "Duration (mm:ss)": '',
      "Yield (kg)": '',
      "OCC (*1000 cells/ml)": '',
      "Milking Interval (hh:mm)": '',
      LF: '',
      RF: '',
      LR: '',
      RR: '',
      Udder: '',
      "Milk Destination": '',
    },
  });

  console.table(onSubmit)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Begin Time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Time</FormLabel>
              <FormControl>
                <Input placeholder="Begin Time" {...field} />
              </FormControl>
              <FormDescription>
                Enter the begin time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Milking Number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Milking Number</FormLabel>
              <FormControl>
                <Input placeholder="Milking Number" {...field} />
              </FormControl>
              <FormDescription>
                Enter the milking number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add more fields here */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default MilkingForm;