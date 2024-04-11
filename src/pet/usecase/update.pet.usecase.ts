import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetUsecaseInput from "./dtos/update.pet.usecase.input";
import UpdatePetUsecaseOutput from "./dtos/update.pet.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetReposiry from "../interface/pet.repository.interface";
import PetNotFounderError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schema/pet.schema";


@Injectable()
export default class UpdatePetUsecase implements IUseCase<UpdatePetUsecaseInput, UpdatePetUsecaseOutput> {
    
    constructor(
        @Inject(PetTokens.petRepository)

        private readonly petRepository: IPetReposiry
    ) {}  

    async run(input: UpdatePetUsecaseInput): Promise<UpdatePetUsecaseOutput> {
        let pet = await this.getById(input.id)

        if(!pet){
            throw new PetNotFounderError()
        }

        await this.petRepository.updateById({
            ...input,
            _id: input.id
        });

        pet = await this.getById(input.id);

        return new UpdatePetUsecaseOutput({

            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: pet.photo,
            cratedAt: pet.createdAt,
            updatedAt: pet.updatedAt
        })


    }
    private async getById(id: string): Promise<Pet> {
        try {
            return await this.petRepository.getById(id)

        } catch (error) {
            return null
        }
    }
}
