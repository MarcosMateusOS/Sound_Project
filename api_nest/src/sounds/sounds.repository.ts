import { EntityRepository, Repository } from 'typeorm';
import { Sound } from './sound.entity';
import { CreateSoundDto } from './dto/create-sound.dto';
import { GetSoundsFilterDto } from './dto/get-sound-filter-dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Sound)
export class SoundsRepository extends Repository<Sound> {
  async getSounds(filterDto: GetSoundsFilterDto): Promise<Sound[]> {
    const { singer, search } = filterDto;

    const query = this.createQueryBuilder('sound');

    if (singer) {
      query.andWhere('sound.artist = :artist', { singer });
    }

    if (search) {
      //
      query.andWhere(
        'sound.title LIKE :search OR sound.artist = :search OR sound.description = :search',
        { search: `%${search}%` },
      );
    }

    const sounds = await query.getMany();

    return sounds;
  }

  async getSoundsByUser(
    filterDto: GetSoundsFilterDto,
    user: User,
  ): Promise<Sound[]> {
    const { singer, search } = filterDto;
    console.log(user);
    const query = this.createQueryBuilder('sound');
    query.where({ registerd_user: user });

    if (singer) {
      query.andWhere('sound.artist = :artist', { singer });
    }

    if (search) {
      //
      query.andWhere(
        'sound.title LIKE :search OR sound.artist = :search OR sound.description = :search',
        { search: `%${search}%` },
      );
    }

    const sounds = await query.getMany();

    return sounds;
  }

  async createSound(
    createsoundDto: CreateSoundDto,
    user: User,
  ): Promise<Sound> {
    const { title, description } = createsoundDto;

    const sound = this.create({
      title,
      description,
      registerd_user: user,
    });

    await this.save(sound);
    return sound;
  }
}
