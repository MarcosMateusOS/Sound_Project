import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateSoundDto } from './dto/create-sound.dto';
import { GetSoundsFilterDto } from './dto/get-sound-filter-dto';
import { Sound } from './sound.entity';
import { SoundsService } from './sounds.service';

@Controller('sounds')
@UseGuards(AuthGuard())
export class SoundsController {
  constructor(private soundsService: SoundsService) {}

  @Get('/:id')
  getSoundsById(@Param('id') id: string): Promise<Sound> {
    return this.soundsService.getSoundById(id);
  }

  @Post()
  createSound(
    @Body() createSoundDto: CreateSoundDto,
    @GetUser() user: User,
  ): Promise<Sound> {
    return this.soundsService.createSound(createSoundDto, user);
  }

  @Delete('/:id')
  deleteSound(@Param('id') id: string): Promise<void> {
    return this.soundsService.deleteSound(id);
  }

  @Patch('/:id')
  updateTitle(
    @Param('id') id: string,
    @Body() data: { title: string; description: string },
  ) {
    return this.soundsService.updateSound(id, data);
  }

  @Get()
  getSounds(@Query() filterDto: GetSoundsFilterDto): Promise<Sound[]> {
    return this.soundsService.getSounds(filterDto);
  }

  @Get('/user')
  getSoundsByUser(
    @Query() filterDto: GetSoundsFilterDto,
    @GetUser() user: User,
  ): Promise<Sound[]> {
    console.log(user);
    return this.soundsService.getSoundsByUser(filterDto, user);
  }
}
