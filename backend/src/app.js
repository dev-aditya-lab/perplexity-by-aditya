import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';

app.use(morgan('dev')); // Use morgan for logging HTTP requests
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRouter);


//helthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;

