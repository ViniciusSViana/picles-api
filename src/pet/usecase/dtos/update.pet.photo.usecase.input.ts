export default class UpdatePetPhotoUsecaseInput{
    id: string
    photoPath: string
    
    constructor(data: Partial<UpdatePetPhotoUsecaseInput>) 
    {Object.assign (this, data)}
}