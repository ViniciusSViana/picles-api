import { IUseCase } from "src/domain/iusecase.interface";
import GetPetByIdUsecaseInput from "../dto/get.petbyid.usecase.input";
import GetPetByIUsecaseOutput from "../dto/get.petbyid.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetReposiry from "../interface/pet.repository.interface";
import { Pet } from "../schema/pet.schema";
import PetNotFounderError from "src/domain/errors/pet.not.found.error";

@Injectable()
export default class GetPetByIdUsecase implements IUseCase<GetPetByIdUsecaseInput, GetPetByIUsecaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetReposiry
    ) { }

    async run(input: GetPetByIdUsecaseInput): Promise<GetPetByIUsecaseOutput> {
        const pet = await this.getById(input.id)

        if (pet === null) {
            throw new PetNotFounderError();
        }

        return new GetPetByIUsecaseOutput({
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