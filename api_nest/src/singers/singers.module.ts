import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { SingersController } from './singers.controller';
import { SingersRepository } from './singers.repository';
import { SingersService } from './singers.service';

@Module({
  imports: [TypeOrmModule.forFeature([SingersRepository]), AuthModule],
  controllers: [SingersController],
  providers: [SingersService],
})
export class SingersModule {}
