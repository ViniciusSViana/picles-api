export default class UpdateShelterDetailsUseCaseOutput {
    name: string;
    whatsapp: string;
    email: string;
    phone: string;

    constructor(data: Partial<UpdateShelterDetailsUseCaseOutput>) {
        Object.assign(this, data);
    }
}
