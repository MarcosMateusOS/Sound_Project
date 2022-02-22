import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSingerDto } from './dto/create-singer.dto';
import { Singer } from './singer.entity';
import { SingersService } from './singers.service';

@Controller('singers')
@UseGuards(AuthGuard())
export class SingersController {
  constructor(private singersService: SingersService) {}

  @Post()
  createSinger(@Body() createSingerDto: CreateSingerDto): Promise<Singer> {
    return this.singersService.createSinger(createSingerDto);
  }
}
