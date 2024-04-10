import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import PetTokens from './pet.tokens';
import CreatePetUsecase from './usecase/create.pet.usecase';
import PetRepository from './pet.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schema/pet.schema';
import GetPetByIdUsecase from './usecase/get.petbyid.usecase';

@Module({
  controllers: [PetController],
  imports:[MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema}])],
  providers:[
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUsecase
    },
    {
      provide: PetTokens.petRepository,
      useClass: PetRepository
    },
    {
      provide: PetTokens.getPetByIdUsecase,
      useClass: GetPetByIdUsecase
    }
    
  ]
})
export class PetModule {}
