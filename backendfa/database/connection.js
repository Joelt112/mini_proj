import mongoose from "mongoose";

export const connection =() =>{
    mongoose.connect(process.env.MONGO_URI,
        {
            dbName:"moviedb",
        }
    )
    .then(()=>{
        console.log("Connected to database")
    })
    .catch(err=>{
      console.log(`some error occured ${err}`)
    });
    
};