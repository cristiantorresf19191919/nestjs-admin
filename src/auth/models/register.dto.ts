import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class _RegisterDTO{
    @IsNotEmpty()
    @IsString()
    first_name: string;    
    
    @IsNotEmpty()
    @ApiProperty()
    last_name: string;
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
    
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    @ApiProperty()
    password_confirm: string;

}

export class RegisterDTO extends PartialType(_RegisterDTO) {}