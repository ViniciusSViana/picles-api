import { Body, Controller, Inject, Post } from '@nestjs/common';
import createPetControllerInput from './dto/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import createPetControllerOutput from './usecase/dtos/create.pet.usecase.output';
import createUsecasePetInput from './usecase/dtos/create.pet.usecase.input';
import createUsecasePetOutput from './usecase/dtos/create.pet.usecase.output';
import PetTokens from './pet.tokens';
import createPetUsecaseOutput from './usecase/dtos/create.pet.usecase.output';
import createPetUsecaseInput from './usecase/dtos/create.pet.usecase.input';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly creatPetUseCase: IUseCase<createPetUsecaseInput, createPetUsecaseOutput>
    
    @Post()
    async createPet(@Body() input: createPetControllerInput):Promise <createPetUsecaseOutput>
     {
        const createPetUseCaseInput = new createPetUsecaseInput({
            ...input
        })
        return await this.creatPetUseCase.run(createPetUseCaseInput)
    }
}
