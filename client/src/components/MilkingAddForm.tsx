import React, { useState } from 'react';
import { useMilking } from '../context/MilkingContext';
// import { MilkingForm } from './MilkingForm';
import { SubmitHandler } from 'react-hook-form';
import MilkingForm from './MilkingForm';
import { formSchema } from './utils/FormSchema';
import { z } from 'zod';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

type MilkingData = z.infer<typeof formSchema>;

// interface MilkingAddFormProps {
//   onAddClick: () => void;
// }

const MilkingAddForm: React.FC = () => {
  // const { addMilking } = useMilking();

  const [open, setOpen] = useState<boolean>(false);


  // const handleFormSubmit: SubmitHandler<MilkingData> = (data) => {
  //   console.log("added data: ", data)
  //   addMilking(data);
  //   setOpen(false)
  // };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild >
        <Button variant="outline" >ADD</Button>

        </DialogTrigger>
        <DialogContent className=" h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>ADD a Record</DialogTitle>
            <DialogDescription> 
              Add new data here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

            <MilkingForm />
          {/* <DialogFooter>
            <DialogClose asChild>

                <Button type="submit" >Save changes</Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>


      </Dialog>
    </div>
  );
};

export default MilkingAddForm;
