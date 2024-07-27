import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT
import app from "./app.js";
import { connectMongodb } from "./Db/connectDb.js";

 const server = app.listen(PORT, (err) => {
    if (err) throw err;
    connectMongodb()
    console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException",(error)=>{
    console.error(`Error: ${error.message}`);
    process.exit(1);
} )

process.on("unhandledRejection",(err)=>{
    console.error(`Error: ${err.message}`);
    server.close(()=> process.exit(1));
})
 
process.on("SIGTERM" , () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
        console.log("Server has been shut down.");
        process.exit(0);
    });
})