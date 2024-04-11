export default class DeletePetUsecaseInput {
    id: string

    constructor(data: Partial<DeletePetUsecaseInput>) 
    {
        Object.assign(this, data)
    }
}