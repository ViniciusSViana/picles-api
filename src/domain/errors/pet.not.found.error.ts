import { CustomError } from "./custumer.error";

export default class PetNotFounderError extends CustomError{
    constructor() {
        super("Pet Not Found","0001");
    }
}