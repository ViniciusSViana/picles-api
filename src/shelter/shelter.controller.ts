import { Body, Controller, Get, Inject, Patch, Post, Put } from '@nestjs/common';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import ShelterTokens from './shelter.tokens';
import { IUseCase } from 'src/domain/iusecase.interface';
import UpdateShelterDetailsControllerInput from './dtos/update.shelter.controller.input';
import UpdateShelterDetailsUsecaseInput from './usecases/dtos/update.shelter.details.usecases.input';
import UpdateShelterDetailsUseCaseOutput from './usecases/dtos/update.shelter.details.output';

@Controller('shelter')
export class ShelterController {

    @Inject(ShelterTokens.getShelterDetailsUseCase)
    private readonly getShelterDetailsUsecase: IUseCase<null, GetShelterDetailsUseCaseOutput>

    @Inject(ShelterTokens.updateShelterDetailsUseCase)
    private readonly updateShelterDetailsUsecase: IUseCase<UpdateShelterDetailsUsecaseInput, UpdateShelterDetailsUseCaseOutput>

    @Get()
    async getShelterDetails(): Promise<GetShelterDetailsUseCaseOutput> {
        return await this.getShelterDetailsUsecase.run(null)
    }

    @Put()
    async updateShelterDetails(@Body() input: UpdateShelterDetailsControllerInput) {
        const usecaseInput = new UpdateShelterDetailsUsecaseInput({ ...input });
        return await this.updateShelterDetailsUsecase.run(usecaseInput);

    }


}

