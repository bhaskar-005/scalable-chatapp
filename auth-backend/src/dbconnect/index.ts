import mongoose from "mongoose";


export const dbConnection = async()=>{
    const dbURI = process.env.DBURL||"mongodb://localhost:27017/auth-service"
    try {
        const db = await mongoose.connect(dbURI);
        console.log('db connection successfull.');
        
    } catch (error) {
        console.log('db connection failed :: ',error);
        process.exit(0);
    }
}