import { SchemaFactory } from "@nestjs/mongoose"

export interface IUseCase<Input, Output>{
    run(input: Input): Promise<Output>
}

