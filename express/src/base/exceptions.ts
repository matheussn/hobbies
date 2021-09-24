export class NotFoundException implements Error {
    constructor(message: string = "Not Found") {
        this.message = message
        this.name = 'NotFoundException'
        this.status = 404
    }
    status: number;
    name: string;
    message: string;
    stack?: string;
}

export class BadRequestException implements Error {
    constructor(message: string = "Bad Request") {
        this.message = message
        this.name = 'BadRequestException'
        this.status = 400
    }
    status: number;
    name: string;
    message: string;
    stack?: string;
}