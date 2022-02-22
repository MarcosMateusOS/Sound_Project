import { Sound } from '../sounds/sound.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Singer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  artistic_name: string;

  @OneToMany((_type) => Sound, (sound) => sound.singer, { eager: true })
  sounds: Sound[];
}
