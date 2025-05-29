import jwt from 'jsonwebtoken';
import dbConfig from '../config/environment.js';
import { errors } from '../middlewares/error.js'; // Import your error handlers

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Expecting "Bearer <token>"

    if (!token) {
        return next(errors.UNAUTHORIZED); // Use your 401 Unauthorized error
    }

    try {
        // Verify the token and attach the decoded payload to the request object
        const decoded = jwt.verify(token, dbConfig.jwtsecret);
        req.user = decoded; // Attach user info (id, role) to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return next(errors.FORBIDDEN); // Use your 403 Forbidden error for invalid token
    }
};
