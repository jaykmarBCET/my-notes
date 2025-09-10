import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Server connected at host:", connectionInstance.connection.host);

        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });

    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
};

export  {dbConnect}
