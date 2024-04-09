export default class createPetUsecaseOutput {
    id: string
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;
    photo: string;
    cratedAt: Date;
    updatedAt: Date;


    constructor(data: Partial<createPetUsecaseOutput >) {

        Object.assign(this, data);
    }
}