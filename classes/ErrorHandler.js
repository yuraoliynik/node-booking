class ErrorHandler extends Error {
    constructor(massage, status) {
        super(massage);
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
