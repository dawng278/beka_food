import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: 'beka', // Optional, already inside connection string if using Atlas
        });
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        throw new Error('MongoDB connection failed');
    }
};

export default connectDB;
