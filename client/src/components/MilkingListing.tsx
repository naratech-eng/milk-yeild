import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MilkingForm from './MilkingForm';
import { DialogDescription } from '@radix-ui/react-dialog';
import { z } from 'zod';
import { formSchema } from './utils/FormSchema';
import MilkingAddForm from './MilkingAddForm';


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


interface MilkingListingProps {
    milkingData: typeof formSchema[];
}


const MilkingListing = ({ milkingData }: MilkingListingProps) => {

    const [selectedMilking, setSelectedMilking] = useState<z.infer<typeof formSchema> | null>(null);
    const [fetchedMilkingData, setFetchedMilkingData] = useState<z.infer<typeof formSchema>[]>([]);

    useEffect(() => {
        const fetchMilkingData = async () => {
        try {
            
            const response = await fetch('http://localhost:5001/api/milking');
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // console.log('Data:', data[0]._id);
            setFetchedMilkingData(data);
            
        } catch (error) {
            console.error(error);
        }
        };

        fetchMilkingData();
    }, []);

    const handleEdit = (milking: z.infer<typeof formSchema>) => {
        setSelectedMilking(milking);
      };
    
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await fetch(`http://localhost:5001/api/milking/${selectedMilking?._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedMilking),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const updatedMilkingData = await response.json();
          setFetchedMilkingData((prevData) => prevData.map((milking) => milking._id === updatedMilkingData._id ? updatedMilkingData : milking));
        } catch (error) {
          console.error(error);
        }
      };
    

    console.log('Fetched Milking Data:', fetchedMilkingData);


    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-end mb-4">
        
            <MilkingAddForm />
      </div>
      <Table className="">
        <TableHeader className='bg-gray-200 py-6 px-4 mx-auto h-4'>
            <TableRow>
                <TableHead>Begin Time</TableHead>
                <TableHead>Milking Number</TableHead>
                <TableHead>Duration (mm:ss)</TableHead>
                <TableHead>Yield (kg)</TableHead>
                <TableHead>OCC (*1000 cells/ml)</TableHead>
                <TableHead>Milking Interval (hh:mm)</TableHead>
                <TableHead>LF</TableHead>
                <TableHead>RF</TableHead>
                <TableHead>LR</TableHead>
                <TableHead>RR</TableHead>
                <TableHead>Udder</TableHead>
                <TableHead>Milk Destination</TableHead>
                <TableHead>Actions</TableHead>

            </TableRow>
        </TableHeader>
       
        <TableBody>
          {fetchedMilkingData.map((milking) => (
            <TableRow key={milking._id}>
              <TableCell className="px-4 py-2 w-24 text-center">{milking["Begin Time"]} </TableCell>
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
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleEdit(milking)} variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]" aria-describedby="milking-data-description">
                    <DialogHeader>
                      <DialogTitle>Edit Milking Data</DialogTitle>
                      <DialogDescription>Please edit the neccessary field to update</DialogDescription>
                    </DialogHeader>
                    <MilkingForm 
                      selectedMilking={fetchedMilkingData}
                      onSubmit={(data) => console.log(data)}
                    />
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MilkingListing;
