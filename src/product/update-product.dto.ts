import { IsNotEmpty } from "class-validator";

export class UpdateProductDTO{
    id?: string;
    description?: string;
    @IsNotEmpty()
    title?: string;
    @IsNotEmpty()
    image?: string;
    @IsNotEmpty()
    price?: number;

}