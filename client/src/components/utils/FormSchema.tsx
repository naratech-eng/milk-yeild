import { z } from "zod"
// import mongoose from 'mongoose'

export const formSchema = z.object({
    _id: z.string().regex(/^[0-9a-f]{24}$/).optional(),
    // "Begin Date": z.string().min(1, {
    //   message: "Begin Date is required.",
    // }),
    // "Begin Time": z.string().min(1, {
    //   message: "Begin Time is required.",
    // }),
    "Milking Number": z.number().min(1, {
      message: "Milking Number must be at least 1.",
    }),
    "Duration (mm:ss)": z.string().min(1, {
      message: "Duration is required.",
    }),
    "Yield (kg)": z.number().min(0, {
      message: "Yield must be at least 0.",
    }),
    "OCC(*1000 cells/ml)": z.number().min(0, {
      message: "OCC must be at least 0.",
    }).optional(),
    "Milking Interval (hh:mm)": z.string().min(1, {
      message: "Milking Interval is required.",
    }),
    LF: z.number().min(0, {
      message: "LF must be at least 0.",
    }),
    RF: z.number().min(0, {
      message: "RF must be at least 0.",
    }),
    LR: z.number().min(0, {
      message: "LR must be at least 0.",
    }),
    RR: z.number().min(0, {
      message: "RR must be at least 0.",
    }),
    Udder: z.number().min(0, {
      message: "Udder must be at least 0.",
    }),
    "Milk Destination": z.string().min(1, {
      message: "Milk Destination is required.",
    }),
  })