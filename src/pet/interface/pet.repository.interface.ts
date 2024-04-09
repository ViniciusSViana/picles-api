import { Pet } from "../schema/pet.schema";

export default interface IPetReposiry {
    create (data: Partial <Pet>): Promise<Pet>
}