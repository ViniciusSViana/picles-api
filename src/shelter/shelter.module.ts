import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelter.tokens';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelter, ShelterSchema } from './schemas/shelter.schemas';
import { shelterRepository } from './shelter.repository';
import UpdateShelterDetailsUsecase from './usecases/update.shelter.details.usecases';

@Module({
  controllers: [ShelterController],

  imports: [
    MongooseModule.forFeature([
      {
        name: Shelter.name,
        schema: ShelterSchema
      }
    ])
  ],

  providers: [
    {
      provide: ShelterTokens.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase
    },
    {
      provide: ShelterTokens.shelterRepository,
      useClass: shelterRepository
    },

    {
      provide: ShelterTokens.updateShelterDetailsUseCase,
      useClass: UpdateShelterDetailsUsecase
    }
  ]
})

export class ShelterModule { }
