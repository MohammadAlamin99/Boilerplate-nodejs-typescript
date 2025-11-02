import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const port = process.env.PORT;

// databse cennection
let URL = process.env.mongodbUrl;
let option = { user: process.env.user, pass: process.env.user, autoIndex: true }
mongoose.connect(URL as string, option as any).then(() => {
    console.log('Database connected...');
}).catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})