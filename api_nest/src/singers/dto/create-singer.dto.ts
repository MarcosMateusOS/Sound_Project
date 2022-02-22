import { IsNotEmpty } from 'class-validator';

export class CreateSingerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  artistic_name: string;
}
