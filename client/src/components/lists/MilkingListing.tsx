import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MilkingForm from '../forms/MilkingForm';
import { DialogDescription } from '@radix-ui/react-dialog';
import { z } from 'zod';
import { formSchema } from '../utils/FormSchema';

import { useMilking } from '@/context/MilkingContext';
import { Delete } from 'lucide-react';


// interface MilkingData {
//   id: number;
//   beginTime: string;
//   milkingNumber: number;
//   duration: string;
//   yield: number;
//   occ: number;
//   milkingInterval: string;
//   lf: number;
//   rf: number;
//   lr: number;
//   rr: number;
//   udder: number;
//   milkDestination: string;
// }

// interface MilkingListingProps {
//   milkingData: MilkingData[];
// }


// interface MilkingListingProps {
//     milkingData: z.infer<typeof formSchema>[];
// }


const MilkingListing : React.FC = () => {
    const {milkingData, deleteMilking} = useMilking();
    const [selectedMilking, setSelectedMilking] = useState<z.infer<typeof formSchema> | null>(null);
    const [fetchedMilkingData, setFetchedMilkingData] = useState<z.infer<typeof formSchema>[]>([]);

      // State to control the "ADD" dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

    // State to control the "EDIT" dialog for each row
    const [editDialogState, setEditDialogState] = useState<{ [key: string]: boolean }>({});

    const handleCloseEditDialog = (milkingId: string) => {
      setEditDialogState(prevState => ({ ...prevState, [milkingId]: false }));
      
    };
    const handleOpenEditDialog = (milkingId: string) => {
      setEditDialogState(prevState => ({ ...prevState, [milkingId]: true }));
    };
    const handleDeleteMilking = (milkingId: string) => {
      if (window.confirm("Are you sure you want to delete this milking record?")) {
        deleteMilking(milkingId);
        handleCloseEditDialog(milkingId); // Close the dialog after deletion
      }
    };


    // useEffect(() => {
    //     const fetchMilkingData = async () => {
    //     try {
            
    //         const response = await fetch('http://localhost:5001/api/milking');
    //         console.log('Response:', response);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         // console.log('Data:', data[0]._id);
    //         setFetchedMilkingData(data);
            
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     };

    //     fetchMilkingData();
    // }, []);

    // const handleEdit = (milking: z.infer<typeof formSchema>) => {
    //     setSelectedMilking(milking);
    //   };
    
    //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     try {
    //       const response = await fetch(`http://localhost:5001/api/milking/${selectedMilking?._id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(selectedMilking),
    //       });
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    //       const updatedMilkingData = await response.json();
    //       setFetchedMilkingData((prevData) => prevData.map((milking) => milking._id === updatedMilkingData._id ? updatedMilkingData : milking));
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    

    // console.log('Fetched Milking Data from Listing:', milkingData);


    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-end mb-4">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
            <MilkingForm onFormSubmit={() => setIsAddDialogOpen(false)}/>
        </DialogContent>

      </Dialog>
            
      </div>
      <Table className="">
        <TableHeader className='bg-gray-200 px-4 mx-auto'>
            <TableRow className=''>
                {/* <TableHead>Begin Date</TableHead>
                <TableHead>Begin Time</TableHead> */}
                <TableHead className=' py-4'>Milking Number</TableHead>
                <TableHead className=' py-4'>Duration (mm:ss)</TableHead>
                <TableHead className=' py-4'>Yield (kg)</TableHead>
                <TableHead className=' py-4'>OCC (*1000 cells/ml)</TableHead>
                <TableHead className=' py-4'>Milking Interval (hh:mm)</TableHead>
                <TableHead className=' py-4'>LF</TableHead>
                <TableHead className=' py-4'>RF</TableHead>
                <TableHead className=' py-4'>LR</TableHead>
                <TableHead className=' py-4'>RR</TableHead>
                <TableHead className=' py-4'>Udder</TableHead>
                <TableHead className=' py-4'>Milk Destination</TableHead>
                <TableHead className=' py-4'>Actions</TableHead>

            </TableRow>
        </TableHeader>
       
        <TableBody>
        {milkingData.map((milking, index) => {
    // console.log('Milking Data to check id:', milking); // Check if _id exists here
    
    return (
      <TableRow key={milking._id || `milking-${index}`}>
        {/* Displaying the milking data in table cells */}
        <TableCell>{milking["Milking Number"]}</TableCell>
        <TableCell>{milking["Duration (mm:ss)"]}</TableCell>
        <TableCell>{milking["Yield (kg)"]}</TableCell>
        <TableCell>{milking["OCC(*1000 cells/ml)"]}</TableCell>
        <TableCell>{milking["Milking Interval (hh:mm)"]}</TableCell>
        <TableCell>{milking.LF}</TableCell>
        <TableCell>{milking.RF}</TableCell>
        <TableCell>{milking.LR}</TableCell>
        <TableCell>{milking.RR}</TableCell>
        <TableCell>{milking.Udder}</TableCell>
        <TableCell>{milking["Milk Destination"]}</TableCell>
        
        {/* Render the MilkingEditForm, passing in the current milking data */}
        <TableCell>
        {/* <Button onClick={() => handleEditClick(milking)}>Edit</Button> */}
       
        <Dialog open={editDialogState[milking._id || `milking-${index}`]} onOpenChange={(isOpen) => {
                  if (!isOpen) handleCloseEditDialog(milking._id || `milking-${index}`);
                }}>
            <DialogTrigger asChild>
            <Button variant='outline' onClick={() => handleOpenEditDialog(milking._id || `milking-${index}`)} className=' my-2'>EDIT</Button>
            </DialogTrigger>
            <DialogContent className="h-screen overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Edit Milking Data</DialogTitle>
                <DialogDescription>
                    Please edit the necessary fields to update
                </DialogDescription>
            </DialogHeader>
            <MilkingForm selectedMilking={milking} onFormSubmit={() => handleCloseEditDialog(milking._id || `milking-${index}`)} />
            </DialogContent>
            <DialogFooter>
              <Button variant='destructive' onClick={() => handleDeleteMilking(milking._id || `milking-${index}`)}>
                <Delete size={32} strokeWidth={2.5} />
              </Button>
            </DialogFooter>
      
        </Dialog>
            
        </TableCell>
      </TableRow>
    );
  })}
          {/* {milkingData.map((milking, index) => (
            <TableRow key={milking._id || `milking-${index}`}>
              {/* <TableCell className="px-4 py-2 w-24 text-center">{milking["Begin Date"]} </TableCell>
              <TableCell className="px-4 py-2 w-24 text-center">{milking["Begin Time"]} </TableCell> */}
              {/* <TableCell>{milking["Milking Number"]}</TableCell>
              <TableCell>{milking["Duration (mm:ss)"]}</TableCell>
              <TableCell>{milking["Yield (kg)"]}</TableCell>
              <TableCell>{milking["OCC(*1000 cells/ml)"]}</TableCell>
              <TableCell>{milking["Milking Interval (hh:mm)"]}</TableCell>
              <TableCell>{milking.LF}</TableCell>
              <TableCell>{milking.RF}</TableCell>
              <TableCell>{milking.LR}</TableCell>
              <TableCell>{milking.RR}</TableCell>
              <TableCell>{milking.Udder}</TableCell>
              <TableCell>{milking["Milk Destination"]}</TableCell>
              <TableCell>
                <MilkingEditForm currentmilkingdata={milking} /> */}
              {/* </TableCell> */}
            {/* </TableRow> */}
          {/* // ))} */}
        </TableBody>
      </Table>
      {/* Render the Edit Form if a milking is selected */}
      {/* {isEditing && selectedMilking && (
          <MilkingEditForm 
            currentmilkingdata={selectedMilking} 
            onEditClick={handleEditClick} 
          />
        )} */}
    </div>
  );
};

export default MilkingListing;
