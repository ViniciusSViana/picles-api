import { IUseCase } from "src/domain/iusecase.interface";
import DeletePetUsecaseInput from "./dtos/delete.pet.usecase.input";
import DeletePetUsecaseOutput from "./dtos/delete.pet.usecase.output";
import IPetReposiry from "../interface/pet.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import { Pet } from "../schema/pet.schema";
import PetNotFounderError from "src/domain/errors/pet.not.found.error";


@Injectable()
export default class DeletePetUsecase implements IUseCase<DeletePetUsecaseInput, DeletePetUsecaseOutput> {
    constructor(
        @Inject(PetTokens.petRepository)

        private readonly petRepository: IPetReposiry
    ) {}  
   

    async run(input: DeletePetUsecaseInput): Promise<DeletePetUsecaseOutput> {
        const pet = await this.getById(input.id)

        if(!pet){
            throw new PetNotFounderError()
        }

        await this.petRepository.deleteById(input.id)

        return new DeletePetUsecaseOutput
    }
    
    private async getById(id: string): Promise<Pet> {
        try {
            return await this.petRepository.getById(id)

        } catch (error) {
            return null
        }
    }

}