import { InjectModel } from "@nestjs/mongoose";
import { Shelter } from "./schemas/shelter.schemas";
import { Model } from "mongoose";
import IShelterReposutory from "./interfaces/shelter.repository.interfaces";

export class shelterRepository implements IShelterReposutory {
    constructor(
        @InjectModel(Shelter.name)
        private readonly shelterModel: Model<Shelter>
    ){}

    async get(): Promise<Shelter>{
        return await this.shelterModel.findOne()
    }
    
}