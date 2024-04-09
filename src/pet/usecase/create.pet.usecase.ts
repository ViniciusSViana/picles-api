import { IUseCase } from "src/domain/iusecase.interface";
import createPetControllerOutput from "./dtos/create.pet.usecase.output";
import createUsecasePetInput from "./dtos/create.pet.usecase.input";
import createUsecasePetOutput from "./dtos/create.pet.usecase.output";
import createPetUsecaseInput from "./dtos/create.pet.usecase.input";
import createPetUsecaseOutput from "./dtos/create.pet.usecase.output";

export default class CreatePetUsecase implements IUseCase<createPetUsecaseInput, createPetUsecaseOutput> {
    run(input: createPetUsecaseInput): Promise<createPetUsecaseOutput>{
        throw new Error ('')
    }
}