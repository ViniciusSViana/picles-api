import { Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdateShelterDetailsUsecaseInput from "./dtos/update.shelter.details.usecases.input";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.output";

@Injectable()
export default class UpdateShelterDetailsUsecase implements IUseCase<UpdateShelterDetailsUsecaseInput, UpdateShelterDetailsUseCaseOutput> {
    run(input: UpdateShelterDetailsUsecaseInput):
        Promise<UpdateShelterDetailsUseCaseOutput> {
        throw new Error('Method not implemented.');

    }
}
