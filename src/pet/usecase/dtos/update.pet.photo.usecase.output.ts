import UpdatePetUsecase from "../update.pet.usecase"
import UpdatePetUsecaseOutput from "./update.pet.usecase.output"

export default class UpdatePetPhotoUsecaseOutput extends UpdatePetUsecaseOutput{
    constructor(data: Partial<UpdatePetPhotoUsecaseOutput>) 
    {   super(data)
        Object.assign (this, data)}
}