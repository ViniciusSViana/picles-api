import PetResponse from "src/pet/dto/pet.responsive";

export default class GetPetUsecaseOutput {
    currentePage: number;
    totalPage: number;
    items: PetResponse[];

    constructor(data: Partial<GetPetUsecaseOutput>) {
        Object.assign(this,data);
    }
}