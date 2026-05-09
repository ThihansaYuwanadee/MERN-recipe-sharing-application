import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes.js';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use('/api', recipeRoutes);

app.listen(PORT,async()=>{
  await connectDB(process.env.MONGODB_URI);
  console.log("server is running")
})
