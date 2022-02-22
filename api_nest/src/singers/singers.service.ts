import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSingerDto } from './dto/create-singer.dto';
import { Singer } from './singer.entity';
import { SingersRepository } from './singers.repository';

@Injectable()
export class SingersService {
  constructor(
    @InjectRepository(SingersRepository)
    private singersRepository: SingersRepository,
  ) {}

  async createSinger(createSingerDto: CreateSingerDto): Promise<Singer> {
    return this.singersRepository.createSinger(createSingerDto);
  }
}
