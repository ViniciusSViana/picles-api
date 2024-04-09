export default class UpdateShelterDetailsUsecaseInput {
    name: string;
    whatsApp: string;
    email: string;
    phone: string;

    constructor(data: Partial<UpdateShelterDetailsUsecaseInput>) {
        Object.assign(this, data);
    }
}