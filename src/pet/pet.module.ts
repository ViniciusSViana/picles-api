import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import PetTokens from './pet.tokens';
import CreatePetUsecase from './usecase/create.pet.usecase';
import PetRepository from './pet.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schema/pet.schema';
import GetPetByIdUsecase from './usecase/get.petbyid.usecase';
import UpdatePetUsecase from './usecase/update.pet.usecase';
import DeletePetUsecase from './usecase/delete.pet.usecase';
import UpdatePetPhotoUsecase from './usecase/update.pet.photo.usecase';
import AppTokens from 'src/appToknes';
import FileService from 'src/file.services';
import GetPetsUsecase from './usecase/get.ptes.usecase';

@Module({
  controllers: [PetController],
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
  providers: [
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
    },

    {
      provide: PetTokens.updatePetUsecase,
      useClass: UpdatePetUsecase
    },
    {
      provide: PetTokens.deletePetUsecase,
      useClass: DeletePetUsecase
    },
    {
      provide: PetTokens.updatePetPhotoUsecase,
      useClass: UpdatePetPhotoUsecase
    },

    {
      provide: AppTokens.fileService,
      useClass: FileService
    },
    {
      provide: PetTokens.getPetsUsecase,
      useClass: GetPetsUsecase
    }
  ]
  
})
export class PetModule { }
