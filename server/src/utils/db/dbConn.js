import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODBURL || 'mongodb+srv://smart_community:oaXMFoJ93ZTWrFx3@cluster0.hr27m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//console.log("DBconn file: " + MONGO_URI);
let connection = null;

export async function connectToDatabase() {
    if (!connection || mongoose.connection.readyState === 0) { // 0 means disconnected
      try {
        connection = await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB, readyState:'+mongoose.connection.readyState);
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    }
  }
  
  export async function closeDatabaseConnection() {
    if (mongoose.connection.readyState !== 0) { // Only close if connected
      try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error;
      }
    }
  }