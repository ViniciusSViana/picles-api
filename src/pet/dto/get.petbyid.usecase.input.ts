export default class GetPetByIdUsecaseInput{
    id: string

    constructor(data:
        Partial<GetPetByIdUsecaseInput>) {
            Object.assign(this, data);
        }
    
}