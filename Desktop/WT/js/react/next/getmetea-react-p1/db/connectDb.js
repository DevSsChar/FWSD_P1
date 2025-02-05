import mongoose from 'mongoose';

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/teadb`, {
        useNewUrlParser: true,
        connectTimeoutMS: 60000,
      })
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      console.log("connect not working")
      process.exit(1);
    }
  }
export default connectDB;