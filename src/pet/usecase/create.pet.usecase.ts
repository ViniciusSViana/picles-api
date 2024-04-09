import { IUseCase } from "src/domain/iusecase.interface";
import createPetControllerOutput from "./dtos/create.pet.usecase.output";
import createUsecasePetInput from "./dtos/create.pet.usecase.input";
import createUsecasePetOutput from "./dtos/create.pet.usecase.output";
import createPetUsecaseInput from "./dtos/create.pet.usecase.input";
import createPetUsecaseOutput from "./dtos/create.pet.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetReposiry from "../interface/pet.repository.interface";

@Injectable()
export default class CreatePetUsecase implements IUseCase<createPetUsecaseInput, createPetUsecaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetReposiry
    ) { }

    async run(input: createPetUsecaseInput): Promise<createPetUsecaseOutput> {
        const newPet = await this.petRepository.create(input)
        return new createPetUsecaseOutput({
            id: newPet._id,
            name: newPet.name,
            type: newPet.type,
            size: newPet.size,
            gender: newPet.gender,
            bio: newPet.bio,
            photo: newPet.photo,
            cratedAt: newPet.createdAt,
            updatedAt: newPet.updatedAt
        })
    }
}