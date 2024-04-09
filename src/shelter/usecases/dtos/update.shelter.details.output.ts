export default class UpdateShelterDetailsUseCaseOutput {
    name: string;
    whatsApp: string;
    email: string;
    phone: string;

    constructor(data: Partial<UpdateShelterDetailsUseCaseOutput>) {
        Object.assign(this, data);
    }
}
