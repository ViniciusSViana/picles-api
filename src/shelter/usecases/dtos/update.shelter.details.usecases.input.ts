export default class UpdateShelterDetailsUsecaseInput {
    name: string;
    whatsapp: string;
    email: string;
    phone: string;

    constructor(data: Partial<UpdateShelterDetailsUsecaseInput>) {
        Object.assign(this, data);
    }
}