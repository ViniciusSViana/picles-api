export default class createPetUsecaseOutput {
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;
    photo: string;
    cratedAt: Date;
    updateAt: Date;


    constructor(data: Partial<createPetUsecaseOutput >) {

        Object.assign(this, data);
    }
}