import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Abhishek1:Abhishek123@cluster0.5b3va.mongodb.net/food-del?retryWrites=true&w=majority').then(()=> console.log("DB connected"));}