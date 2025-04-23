import connectDB from "./db/index.js";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/index.js";
dotenv.config()
const app  = express()  

const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://kmh-front-end.vercel.app' // Add your production frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use(express.static("public"))
app.use("/api/v1", router);
app.get("/", (req, res) => {
    res.send(new  Date())
})


connectDB()
.then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error in connecting to the database:", error);
  });
