// errorMiddleware.js
import ErrorHandler, {errors} from './error.js';

/**
 * Global error handling middleware
 * @param {Error} err - The error object
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next function
 */
export const errorMiddleware = (err, req, res, next) => {
    // Check if the error is an instance of ErrorHandler
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                statusCode: err.statusCode,
                message: err.message,
            },
        });
    }

    // For unhandled errors, log and respond with a 500 status
    console.error(err);  // Log the full error details (optional, can be customized)
    return res.status(500).json({
        success: false,
        error: {
            statusCode: 500,
            message: 'Internal Server Error',
        },
    });
};

/**
 * Middleware to handle 404 - Not Found
 */
export const notFoundMiddleware = (req, res, next) => {
    next(errors.NOT_FOUND);  // Using the standard 'Not Found' error
};

/**
 * Middleware to handle 401 - Unauthorized
 */
export const unauthorizedMiddleware = (req, res, next) => {
    next(errors.UNAUTHORIZED);
};

/**
 * Middleware to handle 400 - Bad Request
 */
export const badRequestMiddleware = (req, res, next) => {
    next(errors.BAD_REQUEST);
};

/**
 * Middleware to handle 403 - Forbidden
 */
export const forbiddenMiddleware = (req, res, next) => {
    next(errors.FORBIDDEN);
};

/**
 * Middleware to handle 422 - Unprocessable Entity
 */
export const unprocessableEntityMiddleware = (req, res, next) => {
    next(errors.UNPROCESSABLE_ENTITY);
};
