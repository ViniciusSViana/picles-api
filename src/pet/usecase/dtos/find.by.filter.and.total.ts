import { Pet } from "src/pet/schema/pet.schema";

export default class FindByFilterAndTotal {
    total: number;
    items: Pet [];

    constructor(data: Partial<FindByFilterAndTotal>){
        Object.assign(this, data);
    }
}