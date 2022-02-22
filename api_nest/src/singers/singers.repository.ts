import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSingerDto } from './dto/create-singer.dto';
import { Singer } from './singer.entity';

@EntityRepository(Singer)
export class SingersRepository extends Repository<Singer> {
  async createSinger(createSingerDto: CreateSingerDto): Promise<Singer> {
    const { name, artistic_name: artisticName } = createSingerDto;

    const singer = this.create({
      name,
      artistic_name: artisticName,
    });

    try {
      await this.save(singer);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Artistic Name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return singer;
  }
}
