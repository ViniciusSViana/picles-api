export default class GetPetsUsecaseInput {
    type?: string;
    size?: string;
    gender? : string;
    page : number;
    itemsPerPage : number;

    constructor(data: Partial<GetPetsUsecaseInput>) {
        Object.assign(this, data);
      }
}