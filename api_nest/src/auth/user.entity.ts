import { Sound } from 'src/sounds/sound.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Sound, (sound) => sound.registerd_user, { eager: true })
  sounds: Sound[];
}
