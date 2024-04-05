import { Shelter } from "../schemas/shelter.schemas";

export default interface IShelterReposutory{
    get(): Promise<Shelter>
}