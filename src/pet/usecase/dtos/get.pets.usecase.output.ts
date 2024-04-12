import PetResponse from "src/pet/dto/pet.responsive";

export default class GetPetsUsecaseOutput {
    currentPage: number;
    totalPages: number;
    items: PetResponse[];

    constructor(data: Partial<GetPetsUsecaseOutput>) {
        Object.assign(this,data);
    }
}