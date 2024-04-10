import { BadRequestException, Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import createPetControllerInput from './dto/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import createPetControllerOutput from './usecase/dtos/create.pet.usecase.output';
import createUsecasePetInput from './usecase/dtos/create.pet.usecase.input';
import createUsecasePetOutput from './usecase/dtos/create.pet.usecase.output';
import PetTokens from './pet.tokens';
import createPetUsecaseOutput from './usecase/dtos/create.pet.usecase.output';
import createPetUsecaseInput from './usecase/dtos/create.pet.usecase.input';
import GetPetByIdUsecaseInput from './dto/get.petbyid.usecase.input';
import GetPetByIUsecaseOutput from './dto/get.petbyid.usecase.output';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly creatPetUseCase: IUseCase<createPetUsecaseInput, createPetUsecaseOutput>

    @Inject(PetTokens.getPetByIdUsecase)
    private readonly getPetByIdUsecase: IUseCase<GetPetByIdUsecaseInput, GetPetByIUsecaseOutput>
    
    @Post()
    async createPet(@Body() input: createPetControllerInput):Promise <createPetUsecaseOutput>
     {
        const createPetUseCaseInput = new createPetUsecaseInput({
            ...input
        })
        return await this.creatPetUseCase.run(createPetUseCaseInput)
    }

    @Get(':id')
    async getPetById(@Param('id') id: string): Promise<GetPetByIUsecaseOutput> {
       try {
        const useCaseInput = new GetPetByIdUsecaseInput({id}) 
       return await this.getPetByIdUsecase.run(useCaseInput)

       } catch (error) {
        throw new BadRequestException(JSON.parse(error.message))
       }

    }
}
