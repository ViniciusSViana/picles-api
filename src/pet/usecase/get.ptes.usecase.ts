import { IUseCase } from "src/domain/iusecase.interface";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetReposiry from "../interface/pet.repository.interface";
import AppTokens from "src/appToknes";
import IFileService from "src/intertfaces/file.service.interface";
import GetPetsUsecaseInput from "./dtos/get.pets.usecase.input";
import GetPetsUsecaseOutput from "./dtos/get.pets.usecase.output";
import PetResponse from "../dto/pet.responsive";
import { query } from "express";
import GetPetByIUsecaseOutput from "../dto/get.petbyid.usecase.output";

@Injectable()
export default class GetPetsUsecase implements IUseCase<GetPetsUsecaseInput, GetPetsUsecaseOutput> {

   constructor(
    @Inject (PetTokens.petRepository)
    private readonly petRepository: IPetReposiry,

    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService

   ){}

   async run(input: GetPetsUsecaseInput): Promise<GetPetsUsecaseOutput>{
    const queryResponse = await this.petRepository.findByFilter(input);
    const petResponseList: PetResponse[] = [];

    for(const currentPet of queryResponse.items){
        if(currentPet.photo){
            const photoInBase64 = await this.fileService.readfile(currentPet.photo);
            currentPet.photo = photoInBase64.toString('base64')
        }

        petResponseList.push(PetResponse.fromPet(currentPet));
    }

    const totalPages = Math.ceil(queryResponse.total / input.itemsPerPage);

    return new GetPetsUsecaseOutput({
        currentPage: input.page,
        totalPages,
        items: petResponseList
    })
   }
    
    
    
}