import mongoose from "mongoose";

 const uri = "mongodb+srv://sasankadini:uF3RyUmo5jvqlwHL@cluster0.spnbiii.mongodb.net/?appName=Cluster0";
export const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`connected to database ${conn.connection.host}`)
  } catch (error) {
    console.log("can't connect to database");
    process.exit(1)
  }
}