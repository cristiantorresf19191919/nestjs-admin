import { IsEmail, IsNotEmpty } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class OrderCreateDTO{
    
    id?: string;
    @IsNotEmpty()
    first_name: string;
    
    @IsNotEmpty()
    last_name: string;
    @IsEmail()
    email: string;
    
    @CreateDateColumn()
    created_at: string;

}