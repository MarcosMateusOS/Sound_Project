import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoundsRepository } from './sounds.repository';
import { SoundsController } from './sounds.controller';
import { SoundsService } from './sounds.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SoundsRepository]), AuthModule],
  controllers: [SoundsController],
  providers: [SoundsService],
})
export class SoundsModule {}
