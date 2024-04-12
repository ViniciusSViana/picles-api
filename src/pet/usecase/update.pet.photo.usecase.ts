import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetPhotoUsecaseInput from "./dtos/update.pet.photo.usecase.input";
import UpdatePetPhotoUsecaseOutput from "./dtos/update.pet.photo.usecase.output";
import { Pet } from "../schema/pet.schema";
import PetNotFounderError from "src/domain/errors/pet.not.found.error";
import IPetReposiry from "../interface/pet.repository.interface";
import { Inject } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import AppTokens from "src/appToknes";
import IFileService from "src/intertfaces/file.service.interface";

export default class UpdatePetPhotoUsecase implements IUseCase<UpdatePetPhotoUsecaseInput, UpdatePetPhotoUsecaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetReposiry,

        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
    ) { }

   async run(input: UpdatePetPhotoUsecaseInput): Promise<UpdatePetPhotoUsecaseOutput> {
        let pet = await this.getById(input.id);

        if (!pet) {
            throw new PetNotFounderError();
        }

        await this.petRepository.updateById({
            _id: input.id,
            photo: input.photoPath
        })

        const photo = await this.fileService.readfile(input.id);

        return new UpdatePetPhotoUsecaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo:photo.toString('base64'),
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