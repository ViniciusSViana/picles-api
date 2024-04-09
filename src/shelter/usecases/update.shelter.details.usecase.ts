import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";

import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.output";
import ShelterTokens from "../shelter.tokens";
import { shelterRepository } from "../shelter.repository";
import IShelterRepository from "../interfaces/shelter.repository.interfaces";
import UpdateShelterDetailsUsecaseInput from "./dtos/update.shelter.details.usecases.input";


@Injectable()
export default class UpdateShelterDetailsUsecase implements IUseCase<UpdateShelterDetailsUsecaseInput, UpdateShelterDetailsUseCaseOutput> {
    constructor(
        @Inject(ShelterTokens.shelterRepository)
        private readonly shelterRepository: IShelterRepository
    ) { }
    async run(input: UpdateShelterDetailsUsecaseInput): Promise<UpdateShelterDetailsUseCaseOutput> {
        await this.shelterRepository.update(input)
        const shelter = await this.shelterRepository.get()
        return new UpdateShelterDetailsUseCaseOutput({
            ...shelter
        })
    }
}
