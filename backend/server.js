import express from "express";
import authRoutes from "./routes/auth.routes.js";

// create express app
const app = express();

// reroute every search to extensions starting with '/api/auth' to 'authroutes
app.use("/api/auth", authRoutes);

// listen for conncetions on specified port
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});