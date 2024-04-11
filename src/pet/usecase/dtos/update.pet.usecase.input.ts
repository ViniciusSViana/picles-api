import createPetUsecaseInput from "./create.pet.usecase.input";

export default class UpdatePetUsecaseInput extends createPetUsecaseInput{
    id: string

    constructor(data: Partial<UpdatePetUsecaseInput>) {
        super(data)
        Object.assign(this, data)
    }

}