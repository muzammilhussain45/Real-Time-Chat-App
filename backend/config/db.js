import mongoose from 'mongoose';

const connectDB = async () => {
    try {
       

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'RealTimeChatApp',
        });
        console.log("Database Connected");
        
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

export default connectDB;