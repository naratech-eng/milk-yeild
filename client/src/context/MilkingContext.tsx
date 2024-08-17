import React, { createContext, useContext, useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/components/utils/FormSchema';


interface MilkingData extends z.infer<typeof formSchema> {
  // _id?: string
}

interface MilkingContextProps {
  milkingData: MilkingData[];
  addMilking: (data: MilkingData) => void;
  updateMilking: (id: string, data: MilkingData) => void;
  deleteMilking: (id: string) => void;
  getMilkingById: (id: string) => MilkingData | undefined;
}

const MilkingContext = createContext<MilkingContextProps | undefined>(undefined);

export const useMilking = () => {
  const context = useContext(MilkingContext);
  if (!context) {
    throw new Error('useMilking must be used within a MilkingProvider');
  }
  return context;
};

export const MilkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [milkingData, setMilkingData] = useState<MilkingData[]>([]);
  useEffect(() => {
    // Fetch initial data if needed
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/milking');
        const data: MilkingData[] = await response.json();
        console.log("milking data fetched: ", response)
        setMilkingData(data);
      } catch (error) {
        console.error('Failed to fetch milking data:', error);
      }
    };
    fetchData();
  }, []);

  const addMilking = async (data: MilkingData) => {
    console.log("Adding milking data:", data);
    // setMilkingData((prevData) => [...prevData, data]);
    try {
      // POST request to backend here
      const response = await fetch('http://localhost:5001/api/milking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Milking data added:', result);
      setMilkingData((prevData) => [...prevData, result]);
  
    } catch (error) {
      console.error('Failed to add milking data:', error);
    }
  };

  const updateMilking = async (id: string, updatedData: MilkingData) => {
    try {
      
  
      // Make a PATCH request to the backend to update the data
      const response = await fetch(`http://localhost:5001/api/milking/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update milking data: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Update successful:', result);
      // Update the local state with the new data
      setMilkingData((prevData) =>
        prevData.map((milking) => (milking._id === id ? { ...milking, ...updatedData } : milking))
      );
    } catch (error) {
      console.error('Error updating milking data:', error);
      // Optionally, you might want to roll back the state update if the backend request fails
    }
  };

  const deleteMilking = async (id: string) => {
    try {
      //update the local record by removing with the matching ID
      setMilkingData((prevData) => prevData.filter((milking) => milking._id !== id));
      // make a delete request to backend/database
      const response = await fetch(`http://localhost:5001/api/milking/${id}`, {
        method: 'DELETE',
      })

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to delete milking record: ${response.statusText}`);
      }
      console.log(`Milking record with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting milking record:', error);
      // Optionally, you could restore the deleted record to the state if the backend request fails
      // setMilkingData((prevData) => [...prevData, previouslyDeletedRecord]);
    }
    // Add DELETE request to backend here
  };

  const getMilkingById = (id: string) => {
    return milkingData.find((milking) => milking._id === id);
  };

  return (
    <MilkingContext.Provider value={{ milkingData, addMilking, updateMilking, deleteMilking, getMilkingById }}>
      {children}
    </MilkingContext.Provider>
  );
};
