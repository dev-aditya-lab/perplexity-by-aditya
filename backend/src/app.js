import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import chatRoute from './routes/chat.routes.js';

app.use(morgan('dev')); // Use morgan for logging HTTP requests
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/** --------Routes------------ **/
// Auth routes
app.use("/api/auth", authRouter);
// Chat routes
app.use("/api/chats", chatRoute);


//helthcheck
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    methods: req.method,
    path: req.path,
    host: req.hostname,
    ip: req.ip,
    device: req.get('User-Agent'),
    deviceType: req.get('User-Agent')?.includes('Mobile') ? 'Mobile' : 'Desktop',
    deviceOS: (() => {
      const ua = req.get('User-Agent');
      if (ua?.includes('Windows')) return 'Windows';
      if (ua?.includes('Macintosh')) return 'macOS';
      if (ua?.includes('Linux')) return 'Linux';
      return 'Unknown';
    })(),
    browser: (() => {
      const ua = req.get('User-Agent');
      if (ua?.includes('Chrome')) return 'Chrome';
      if (ua?.includes('Firefox')) return 'Firefox';
      if (ua?.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
      if (ua?.includes('Edge')) return 'Edge';
      return 'Unknown';
    })(),
    deviceUniqueId: req.get('X-Device-Id') || 'N/A',
    performance: {
      responseTime: res.get('X-Response-Time') || 'N/A',
    },
    project: 'Perplexity  by Aditya Gupta',
    author: 'Aditya Gupta',
   });
});

export default app;

