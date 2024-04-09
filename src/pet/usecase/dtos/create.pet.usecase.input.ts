export default class createPetUsecaseInput {
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;


    constructor(data: Partial<createPetUsecaseInput>) {

        Object.assign(this, data);
    }
}