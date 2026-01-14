import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes';
import profileRoutes from './modules/profile/profile.routes';
import courseRoutes from './modules/course/course.routes';
import organizationRoutes from './modules/organization/organization.routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

// Middlewares
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ],
  credentials: true,
}));
// Increase payload size limit for avatar uploads (base64 images)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api', profileRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
