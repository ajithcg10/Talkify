import mongoose from 'mongoose'



export const connectDB = async () => {
    try {
      const MONGO_URI = process.env.MONGO_URI;
  
      if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in .env file");
      }
      const conn = await mongoose.connect(MONGO_URI);
      console.log("MONGODB CONNECTED:", conn.connection.host);
  
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  };
  