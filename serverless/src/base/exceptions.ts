export class NotFoundException implements Error {
    constructor(message: string = "Not Found") {
        this.message = message
    }
    name: string;
    message: string;
    stack?: string;
}

export class BadRequestException implements Error {
    constructor(message: string = "Bad Request") {
        this.message = message
    }
    name: string;
    message: string;
    stack?: string;
}