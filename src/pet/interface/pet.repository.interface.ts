import { Pet } from "../schema/pet.schema";
import FindByFilterAndTotal from "../usecase/dtos/find.by.filter.and.total";
import GetPetsUsecaseInput from "../usecase/dtos/get.pets.usecase.input";

export default interface IPetReposiry {
    create (data: Partial <Pet>): Promise<Pet>
    getById (id: string): Promise<Pet>
    updateById(data: Partial<Pet>): Promise<void>
    deleteById(id: string): Promise<void>
    findByFilter(input: GetPetsUsecaseInput): Promise<FindByFilterAndTotal>
}