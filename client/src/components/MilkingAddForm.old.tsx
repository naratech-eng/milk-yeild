import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const MilkingAddForm = () => {
  const [data, setData] = useState({
    "Begin Time": "",
    "Milking Number": 0,
    "Duration (mm:ss)": "",
    "Yield (kg)": 0,
    "OCC (*1000 cells/ml)": 0,
    "Milking Interval (hh:mm)": "",
    LF: 0,
    RF: 0,
    LR: 0,
    RR: 0,
    Udder: 0,
    "Milk Destination": ""
  });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/milking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const newMilking = await response.json();
      // reset the form after submission
      setData({
        "Begin Time": "",
        "Milking Number": 0,
        "Duration (mm:ss)": "",
        "Yield (kg)": 0,
        "OCC (*1000 cells/ml)": 0,
        "Milking Interval (hh:mm)": "",
        LF: 0,
        RF: 0,
        LR: 0,
        RR: 0,
        Udder: 0,
        "Milk Destination": ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">ADD</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>ADD a Record</DialogTitle>
                <DialogDescription>
                    Add new data here. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="beginTime" className="text-right">
                        Begin Time:
                        </Label>
                        <Input
                        id="beginTime"
                        type="datetime-local"
                        name="Begin Time"
                        value={data["Begin Time"]}
                        onChange={handleChange}
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="milkingNumber" className="text-right">
                            Milking Number:
                            </Label>
                            <Input
                            id="milkingNumber"
                            type="number"
                            name="Milking Number"
                            value={data["Milking Number"]}
                            onChange={handleChange}
                            className="col-span-3"
                            />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                            Duration (mm:ss):
                            </Label>
                            <Input
                            id="duration"
                            type="string"
                            name="Duration (mm:ss)"
                            value={data["Duration (mm:ss)"]}
                            onChange={handleChange}
                            className="col-span-3"
                            />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="yield" className="text-right">
                            Yield (kg):
                            </Label>
                            <Input
                            id="yield"
                            type="number"
                            name="Yield (kg)"
                            value={data["Yield (kg)"]}
                            onChange={handleChange}
                            className="col-span-3"
                            />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="occ" className="text-right">
                            OCC (*1000 cells/ml):
                            </Label>
                            <Input
                            id="occ"
                            type="number"
                            name="OCC (*1000 cells/ml)"
                            value={data["OCC (*1000 cells/ml)"]}
                            onChange={handleChange}
                            className="col-span-3"
                            />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="milkingInterval" className="text-right">
                        Milking Interval (hh:mm):
                        </Label>
                        <Input
                        id="milkingInterval"
                        type="string"
                        name="Milking Interval (hh:mm)"
                        value={data["Milking Interval (hh:mm)"]}
                        onChange={handleChange}
                        className="col-span-3"
                            />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lf" className="text-right">
                            LF:
                            </Label>
                            <Input
                            id="lf"
                            type="number"
                            name="LF"
                            value={data.LF}
                            onChange={handleChange}
                            className="col-span-3"
                            />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rf" className="text-right">
                            RF:
                            </Label>
                            <Input
                            id="rf"
                            type="number"
                            name="LF"
                            value={data.LF}
                            onChange={handleChange}
                            className="col-span-3"
                            />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lr" className="text-right">
                        LR:
                        </Label>
                        <Input
                        id="lr"
                        type="number"
                        name="LR"
                        value={data.LR}
                        onChange={handleChange}
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rr" className="text-right">
                        RR:
                        </Label>
                        <Input
                        id="rr"
                        type="number"
                        name="RR"
                        value={data.RR}
                        onChange={handleChange}
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="udder" className="text-right">
                        Udder:
                        </Label>
                        <Input
                        id="udder"
                        type="number"
                        name="Udder"
                        value={data.Udder}
                        onChange={handleChange}
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="milkDestination" className="text-right">
                        Milk Destination:
                        </Label>
                        <Input
                        id="milkDestination"
                        type="string"
                        name="Milk Destination"
                        value={data["Milk Destination"]}
                        onChange={handleChange}
                        className="col-span-3"
                        />
                    </div>

                </div>
                <DialogFooter>
                <DialogClose asChild>

                    <Button type="submit" >Save changes</Button>
                </DialogClose>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
    
  );
};

export default MilkingAddForm;