// error.js
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ErrorHandler;


export const errors = {
    NOT_FOUND: (msg = "Resource Not Found") => new ErrorHandler(404, msg),
    UNAUTHORIZED: (msg = "Unauthorized Access") => new ErrorHandler(401, msg),
    BAD_REQUEST: (msg = "Bad Request") => new ErrorHandler(400, msg),
    FORBIDDEN: (msg = "Access Forbidden") => new ErrorHandler(403, msg),
    UNPROCESSABLE_ENTITY: (msg = "Unprocessable Entity") => new ErrorHandler(422, msg),
    INTERNAL_SERVER_ERROR: (msg = "Internal Server Error") => new ErrorHandler(500, msg),
    INVALID_CREDENTIALS: (msg = "Invalid email or password") => new ErrorHandler(401, msg),
};
// export const errors = {
//     NOT_FOUND: new ErrorHandler(404, "Resource Not Found"),
//     UNAUTHORIZED: new ErrorHandler(401, "Unauthorized Access"),
//     BAD_REQUEST: new ErrorHandler(400, "Bad Request"),
//     FORBIDDEN: new ErrorHandler(403, "Access Forbidden"),
//     UNPROCESSABLE_ENTITY: new ErrorHandler(422, "Unprocessable Entity"),
//     INTERNAL_SERVER_ERROR: new ErrorHandler(500, "Internal Server Error"),
//     INVALID_CREDENTIALS: new ErrorHandler(401, "Invalid email or password")
// };
