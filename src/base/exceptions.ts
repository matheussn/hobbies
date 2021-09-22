export class NotFoundException implements Error {
    constructor(message: string = "Not Found") {
        this.message = message
    }
    name: string;
    message: string;
    stack?: string;
}