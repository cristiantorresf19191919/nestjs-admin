import { IsNotEmpty } from 'class-validator';

export class ProductCreateDTO {
  id: string;
  description: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  price: number;
}
