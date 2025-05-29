import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { swaggerUi, swaggerSpec } from "./utils/swagger.js";
import router from "./routers/mother_router.js";
import { errorMiddleware, notFoundMiddleware } from './middlewares/errormiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001','http://localhost:3000','http://127.0.0.1:3000','https://unugor-ochiname-portfolio.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
// CORS (General API requests)

    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// CORS specifically for Swagger UI
app.use('/api-docs', cors());

// Helmet (Security Headers) - Adjust CSP for Swagger
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https://task-manager-backend-txkr.onrender.com"],
            connectSrc: ["'self'", "http://localhost:3000", "https://task-manager-backend-txkr.onrender.com"]
        }
    }
}));

// Morgan (Logs)
app.use(morgan("dev"));

// Welcome route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
});

// Swagger documentation (MUST be before other routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api', router);

// Handle 404 errors
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

export default app;

