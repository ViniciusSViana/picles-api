export default class GetPetByIUsecaseOutput {
    id: string
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;
    photo: string;
    cratedAt: Date;
    updatedAt: Date;


    constructor(data: Partial<GetPetByIUsecaseOutput>) {

        Object.assign(this, data);
    }
}