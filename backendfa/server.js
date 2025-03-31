import app from "./app.js";
import {v2 as cloudinary} from "cloudinary";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config({ path: path.resolve("config", "config.env") });
// console.log("SMTP_MAIL:", process.env.SMTP_MAIL);
// console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT,()=>{
    console.log(`server listening ${process.env.PORT}`);
});