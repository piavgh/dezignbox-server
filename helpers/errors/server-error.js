"use strict";

class ServerError{
    constructor(status, message, data, code){
        this.message = message;
        this.status = status;
        this.data = data;
        this.code = code;
    }
    toJSON(){
        return {
            data: this.data,
            message: this.message,
            status: this.status,
            code: this.code
        };
    }
    toString(){
        return JSON.stringify(this.toJSON());
    }
}

module.exports = ServerError;