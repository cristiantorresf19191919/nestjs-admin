import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly first_name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly last_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

}

export class UpdateUserDto extends PartialType(UserDTO) {}
