import { useMilking } from "@/context/MilkingContext";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MilkingForm from "./MilkingForm";
import { formSchema } from "./utils/FormSchema";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";

type MilkingData = z.infer<typeof formSchema>;
interface MilkingEditFormProps {
    currentmilkingdata?: z.infer<typeof formSchema>;
    // onEditClick:(milking: MilkingData)=> void
  }

const MilkingEditForm: React.FC<MilkingEditFormProps> = ({ currentmilkingdata}) => {
    // const { updateMilking, getMilkingById } = useMilking();
    const [open, setOpen] = useState<boolean>(false);
    console.log("trigered", currentmilkingdata)
    // const milkingData = currentmilkingdata?._id
    //     ? currentmilkingdata
    //     : currentmilkingdata?._id ? getMilkingById(currentmilkingdata._id) : undefined;

    // if (!milkingData) {
    //     console.error("No valid milking data found.");
    //     return null; // or handle this case as appropriate
    // }

    // console.log("Received the data from listing:", milkingData._id);

    // const handleFormSubmit:SubmitHandler< z.infer<typeof formSchema>> = (data) => {
    //     console.log("Updated data: ", data);
    //     updateMilking(currentmilkingdata.id, data);
    //     setOpen(false); // Close dialog after updating
   
    // };

    return (
        <div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button variant="outline">EDIT</Button>
            </DialogTrigger>
            <DialogContent className="h-screen overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Edit Milking Data</DialogTitle>
                <DialogDescription>
                    Please edit the necessary fields to update
                </DialogDescription>
            </DialogHeader>
            <MilkingForm selectedMilking={currentmilkingdata} />
            </DialogContent>
        </Dialog>
        </div>
    );
};

export default MilkingEditForm;
