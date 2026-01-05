import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// database connection
connectDB()
  .then(() => {
    console.log(
      "Connected to MongoDB Database successfully ✅ ✅ "
    );
    server.listen(PORT, () => {
      console.log(
        
            "🚀 Server is running on port " + PORT + " 🚀"
      );
    });
  })
  .catch((error) => {
    console.error(
     "❌Error in connecting to MongoDB Database :" + error.message
    );
    process.exit(1); // exit the process with an error status code 1
  });
// cloudinary connection    
connectCloudinary();

const app = express()
// enable cross-origin resourse sharing
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://yourdomain.com",
  "https://quick-stay-delta.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

//API for clerk Webhook
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res)=> res.send("API is working"))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));