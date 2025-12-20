import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri, {
        });
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

export default connectToDatabase;