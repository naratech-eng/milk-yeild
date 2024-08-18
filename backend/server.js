require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT

const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URI,
    optionsSuccessStatus: 200,
  }));

// Connect to MongoDB

const dbConnect = async () => {
    try {
      await mongoose.connect( process.env.MONGODB_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected', process.env.MONGODB_URI );
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };
dbConnect();

// Define a schema for MilkingData
// const milkingDataSchema = new mongoose.Schema({
//   beginTime: String,
//   milkingNumber: Number,
//   duration: String,
//   yield: Number,
//   occ: Number,
//   milkingInterval: String,
//   lf: Number,
//   rf: Number,
//   lr: Number,
//   rr: Number,
//   udder: Number,
//   milkDestination: String,
// });

const milkingDataSchema = new mongoose.Schema({
  // _id?: mongoose.Schema.Types.ObjectId, 
  "Milking Number": Number,
  "Duration (mm:ss)": String,
  "Yield (kg)": Number,
  "OCC (*1000 cells/ml)": Number,
  "Milking Interval (hh:mm)": String,
  LF: Number,
  RF: Number,
  LR: Number,
  RR: Number,
  Udder: Number,
  "Milk Destination": String
});

// Create a model for MilkingData
const MilkingData = mongoose.model('MilkingData', milkingDataSchema);

// Create an endpoint to get all milking data
app.get('/api/milking', async (req, res) => {
  const milkingData = await MilkingData.find();
  res.json(milkingData);
});

// Create an endpoint to create new milking data
app.post('/api/milking', async (req, res) => {
  const newMilkingData = new MilkingData(req.body);
  await newMilkingData.save();
  res.json(newMilkingData);
  console.log('Request body:', newMilkingData);
});

// Create an endpoint to edit existing milking data
app.put('/api/milking/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  const updatedMilkingData = await MilkingData.findByIdAndUpdate(id, req.body, { new: true });
  console.log('Updated document:', updatedMilkingData);
  res.json(updatedMilkingData);
});

// Create an endpoint to delete milking data
app.delete('/api/milking/:id', async (req, res) => {
  const id = req.params.id;
  await MilkingData.findByIdAndDelete(id);
  console.log('Request body:', req.body);
  res.json({ message: 'Milking data deleted successfully' });
});

// Start the server
// const port = 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

