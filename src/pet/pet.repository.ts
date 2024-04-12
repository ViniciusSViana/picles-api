import { Injectable } from "@nestjs/common";
import IPetReposiry from "./interface/pet.repository.interface";
import { Pet } from "./schema/pet.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import GetPetsUsecaseInput from "./usecase/dtos/get.pets.usecase.input";
import FindByFilterAndTotal from "./usecase/dtos/find.by.filter.and.total";

@Injectable()
export default class petRepository implements IPetReposiry {

    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>,
    ) {}
   async getById(id: string): Promise<Pet> {
        return await this.petModel.findById(id)
    }
    async findByFilter(input: GetPetsUsecaseInput): Promise<FindByFilterAndTotal>{
        const FIRST_PAGE=1
        const skip =
        input.page == FIRST_PAGE ? 0 : input.itemsPerPage * (input.page -1);

        let query = this.petModel.find();

        if (input.type){
            query = query.find({ type: input.type})
        }
        if (input.size){
            query = query.find({ size: input.size})
        }
        if (input.gender){
            query = query.find({ gender: input.gender});

            const totalquery = query.clone().countDocuments();
            const skipQuery = query.clone().skip(skip).limit(input.itemsPerPage);

            const[items, total] = await Promise.all([
                skipQuery.exec(),
                totalquery.exec()
            ]);

            return new FindByFilterAndTotal({items, total});
        }

    }

    async create(data: Partial<Pet>): Promise<Pet> {
        return await this.petModel.create ({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async updateById(data: Partial<Pet>): Promise<void> {
        await this.petModel.updateOne({
            _id: data._id
        },{
            ...data,
            updatedAt: new Date()
        }
    )
    }

    async deleteById(id: string): Promise<void> {
        await this.petModel.findByIdAndDelete(id)
    }
    
}