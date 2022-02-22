import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Singer } from 'src/singers/singer.entity';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Sound {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne((_type) => User, (user) => user.sounds, { eager: false })
  @Exclude({ toPlainOnly: true })
  registerd_user: User;

  @ManyToOne((_type) => Singer, (singer) => singer.sounds, { eager: false })
  singer: Singer;
}
