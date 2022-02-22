import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

//Modules
import { SoundsModule } from './sounds/sounds.module';
import { AuthModule } from './auth/auth.module';
import { SingersModule } from './singers/singers.module';
@Module({
  imports: [
    SoundsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'music-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    SingersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
