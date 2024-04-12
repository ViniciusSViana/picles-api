import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import createPetControllerInput from './dto/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import PetTokens from './pet.tokens';
import createPetUsecaseOutput from './usecase/dtos/create.pet.usecase.output';
import createPetUsecaseInput from './usecase/dtos/create.pet.usecase.input';
import GetPetByIdUsecaseInput from './dto/get.petbyid.usecase.input';
import GetPetByIUsecaseOutput from './dto/get.petbyid.usecase.output';
import UpdatePetControllerInput from './dto/update.pet.controller.input';
import UpddatePetUsecaseOutput from './usecase/dtos/update.pet.usecase.output';
import UpdatePetUsecaseOutput from './usecase/dtos/update.pet.usecase.output';
import UpdatePetUsecaseInput from './usecase/dtos/update.pet.usecase.input';
import DeletePetUsecaseInput from './usecase/dtos/delete.pet.usecase.input';
import DeletePetUsecaseOutput from './usecase/dtos/delete.pet.usecase.output';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multer.config';
import UpdatePetPhotoUsecaseInput from './usecase/dtos/update.pet.photo.usecase.input';
import UpdatePetPhotoUsecaseOutput from './usecase/dtos/update.pet.photo.usecase.output';
import GetPetsUsecaseInput from './usecase/dtos/get.pets.usecase.input';
import GetPetsUsecaseOutput from './usecase/dtos/get.pets.usecase.output';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly creatPetUseCase: IUseCase<createPetUsecaseInput, createPetUsecaseOutput>

    @Inject(PetTokens.getPetByIdUsecase)
    private readonly getPetByIdUsecase: IUseCase<GetPetByIdUsecaseInput, GetPetByIUsecaseOutput>

    @Inject(PetTokens.updatePetUsecase)
    private readonly updatePetUsecase: IUseCase<UpdatePetUsecaseInput, UpdatePetUsecaseOutput>

    @Inject(PetTokens.deletePetUsecase)
    private readonly deletePetUsecase: IUseCase<DeletePetUsecaseInput, DeletePetUsecaseOutput>

    @Inject(PetTokens.updatePetPhotoUsecase)
    private readonly updatePetPhotoUsecase: IUseCase<UpdatePetPhotoUsecaseInput, UpdatePetPhotoUsecaseOutput>

    @Inject(PetTokens.getPetsUsecase)
    private readonly getPetsUsecase: IUseCase<GetPetsUsecaseInput, GetPetsUsecaseOutput>

    @Post()
    async createPet(@Body() input: createPetControllerInput): Promise<createPetUsecaseOutput> {
        const createPetUseCaseInput = new createPetUsecaseInput({
            ...input
        })
        return await this.creatPetUseCase.run(createPetUseCaseInput)
    }

    @Get()
    async getPets(
        @Query('type') type?: string,
        @Query('size') size?: string,
        @Query('gender') gender?: string,
        @Query('page') page?: string,
        @Query('itemsPerPage') itemsPerPage?: string,
    ) {
        const FIRST_PAGE = 1
        const DEFAULT_ITENS_PER_PAGE = 10
        const useCaseInput = new GetPetsUsecaseInput({
            type: !!type ? type : null,
            size: !!size ? size : null,
            gender: !!gender ? gender : null,
            page: !!page ? parseInt(page) : FIRST_PAGE,
            itemsPerPage: !!itemsPerPage ? parseInt(itemsPerPage) : DEFAULT_ITENS_PER_PAGE
        })
    }
    @Get(':id')
    async getPetById(@Param('id') id: string): Promise<GetPetByIUsecaseOutput> {
        try {
            const useCaseInput = new GetPetByIdUsecaseInput({ id })
            return await this.getPetByIdUsecase.run(useCaseInput)

        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }

    }

    @Put(':id')
    async updatePet(@Body() input: UpdatePetControllerInput, @Param('id') id: string): Promise<UpddatePetUsecaseOutput> {
        try {
            const useCaseInput = new UpdatePetUsecaseInput({ ...input, id })

            return await this.updatePetUsecase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }
    }

    @Delete(':id')

    async deletePet(@Param('id') id: string): Promise<DeletePetUsecaseOutput> {
        try {
            const useCaseInput = new DeletePetUsecaseInput({ id })
            return await this.deletePetUsecase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }
    }

    @Patch(':id/photo')
    @UseInterceptors(FileInterceptor('photo', multerConfig))
    async updatePhoto(
        @UploadedFile() photo: Express.Multer.File,
        @Param('id') id: string,
    ): Promise<UpdatePetPhotoUsecaseOutput> {

        try {
            const useCaseInput = new UpdatePetPhotoUsecaseInput({
                id,
                photoPath: photo.path
            })

            return await this.updatePetPhotoUsecase.run(useCaseInput)

        } catch (error) {

        }
    }
}
