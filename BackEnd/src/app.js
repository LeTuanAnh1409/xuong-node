import express from "express";
import cors from "cors";
import authRouter from "./router/auth";
import mongoose from 'mongoose'
import productRouter from "./router/products";
import cartRouter from "./router/cart";
// import Category from "./router/category";
import orderRouter from "./router/order";
const app = express();
app.use(cors()); 
app.use(express.json());
// app.use(Category);
app.use(authRouter); 
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);
    const connectdb = async ()=>{
        try{
        await mongoose.connect('mongodb+srv://anhltph32383:gpS8nDR1gsBFRJHH@qwert.xrgdsiv.mongodb.net/')
            console.log('connect success')
        }
        catch(err){
            console.log(err)
        }
    }
    connectdb();    

export const viteNodeApp = app; 
