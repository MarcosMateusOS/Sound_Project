import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sound } from './sound.entity';
import { CreateSoundDto } from './dto/create-sound.dto';
import { GetSoundsFilterDto } from './dto/get-sound-filter-dto';

import { SoundsRepository } from './sounds.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class SoundsService {
  constructor(
    @InjectRepository(SoundsRepository)
    private soundsRepository: SoundsRepository,
  ) {}

  getSounds(filterDto: GetSoundsFilterDto): Promise<Sound[]> {
    return this.soundsRepository.getSounds(filterDto);
  }

  getSoundsByUser(filterDto: GetSoundsFilterDto, user: User): Promise<Sound[]> {
    return this.soundsRepository.getSoundsByUser(filterDto, user);
  }

  async getSoundById(id: string): Promise<Sound> {
    const found = await this.soundsRepository.findOne(id);

    if (!found) {
      throw new NotAcceptableException(`Sound with ID ${id} not found`);
    }

    return found;
  }

  async deleteSound(id: string): Promise<void> {
    const found = await this.soundsRepository.findOne(id);

    if (!found) {
      throw new NotAcceptableException('Sound with ID ${id} not found');
    }

    await this.soundsRepository.delete(found);
  }

  async createSound(
    createsoundDto: CreateSoundDto,
    user: User,
  ): Promise<Sound> {
    return this.soundsRepository.createSound(createsoundDto, user);
  }

  async updateSound(id: string, data: any): Promise<Sound> {
    const { title, description } = data;
    const found = await this.soundsRepository.findOne(id);

    if (!found) {
      throw new NotAcceptableException('Sound with ID ${id} not found');
    }
    if (typeof title !== 'undefined' && title !== null && title !== '')
      found.title = title;

    if (
      typeof description !== 'undefined' &&
      description !== null &&
      description !== ''
    )
      found.description = description;

    await this.soundsRepository.save(found);

    return found;
  }
}
