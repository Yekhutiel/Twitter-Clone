import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoD.js";

dotenv.config();

// create express app
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());    // to parse req.body
app.use(express.urlencoded({extended: true}));  // to parse form data

// reroute every search to extensions starting with '/api/auth' to 'authroutes
app.use("/api/auth", authRoutes);



// listen for conncetions on specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});