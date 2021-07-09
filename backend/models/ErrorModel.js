class ServerError extends Error{
    constructor(errorMessage, errorName, errorCode){
        super(errorMessage);
        this.name = errorName;
        this.status = statusCode;
    }
}

module.exports = ServerError;