import { IsNotEmpty } from 'class-validator';

export class CreateSoundDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
