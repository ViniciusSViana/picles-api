import { Pet } from "src/pet/schema/pet.schema";

export default class FindByFilterAndTotal {
    items: Pet [];
    total: number;

    constructor(data: Partial<FindByFilterAndTotal>){
        Object.assign(this, data);
    }
}