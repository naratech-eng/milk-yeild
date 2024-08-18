import React, { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '../utils/FormSchema';
import { z } from 'zod';
import { useMilking } from '@/context/MilkingContext';

type MilkingData = z.infer<typeof formSchema>;

interface MilkingFormProps {
  selectedMilking?: MilkingData;
  // onSubmit: SubmitHandler<MilkingData>;
  onFormSubmit: () => void;
  
}

const MilkingForm: React.FC<MilkingFormProps> = ({ selectedMilking, onFormSubmit}) => {
  const{addMilking, updateMilking} = useMilking()

  // const previousSelectedMilking = useRef<MilkingData | undefined>(undefined);

  const form = useForm<MilkingData>({
    resolver: zodResolver(formSchema),
    defaultValues: selectedMilking || {},
  });
  // console.log("Form data:", form.getValues())
  // console.log("Form errors:", form.formState.errors)
  
  // useEffect(()=>{
  //   if(selectedMilking !== previousSelectedMilking.current){
  //     form.reset(selectedMilking)
  //     previousSelectedMilking.current = selectedMilking
  //   }
  //   console.log("useffect worked: ", selectedMilking)
    
  // }, [selectedMilking])
  useEffect(() => {
    if (selectedMilking && !form.formState.isSubmitting) {
      form.reset(selectedMilking);
      console.log("useEffect worked: ", selectedMilking);
    }
  }, [selectedMilking]);
  
  // console.log("receiving from edit form(outside onsubmit): ",selectedMilking)

  const onSubmit:SubmitHandler<MilkingData> = (data)=>{
 
    console.log("receiving from edit form (within onsubmit): ",data)
    if(data._id){
      console.log("updating data: ", data)
      updateMilking(data._id, data)
      onFormSubmit()

    }else{
      console.log("adding data (milking form): ", data)
      addMilking(data)
      onFormSubmit()
    }
    form.reset()
    if (onFormSubmit) onFormSubmit()
  }

  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* <FormField
          control={form.control}
          name="Begin Date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Date</FormLabel>
              <FormControl>
                <Input type='date' placeholder="Begin Date" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Begin Time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Begin Time</FormLabel>
              <FormControl>
              <Input type='time' placeholder="Begin Time" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="Automaticaly Generated" {...field} readOnly/>
              </FormControl>
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
                <Input placeholder="Milking Number" {...field} onChange={(e) => field.onChange(Number(e.target.value))}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Duration (mm:ss)"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (mm:ss)</FormLabel>
              <FormControl>
                <Input placeholder="Duration (mm:ss)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Yield (kg)"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yield (kg)</FormLabel>
              <FormControl>
                <Input placeholder="Yield (kg)" {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="OCC(*1000 cells/ml)"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OCC(*1000 cells/ml)</FormLabel>
              <FormControl>
                <Input placeholder="OCC(*1000 cells/ml)" {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Milking Interval (hh:mm)"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Milking Interval (hh:mm)</FormLabel>
              <FormControl>
                <Input placeholder="Milking Interval (hh:mm)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="LF"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LF</FormLabel>
              <FormControl>
                <Input placeholder="LF" {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="RF"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RF</FormLabel>
              <FormControl>
                <Input placeholder="RF" {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="LR"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LR</FormLabel>
              <FormControl>
                <Input placeholder="LR" {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="RR"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RR</FormLabel>
              <FormControl>
                <Input placeholder="RR" {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Udder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Udder</FormLabel>
              <FormControl>
                <Input placeholder="Udder" {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Milk Destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Milk Destination</FormLabel>
              <FormControl>
                <Input placeholder="Milk Destination" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="md:col-span-2">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default MilkingForm;
