import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateGrowthEntryDto } from './dto/create-growth-entry.dto';
import { UpdateGrowthEntryDto } from './dto/update-growth-entry.dto';
import { GrowthService } from './growth.service';

@Controller('growth')
export class GrowthController {
  constructor(private readonly growthService: GrowthService) {}

  @Get()
  findAll() {
    return this.growthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.growthService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() input: CreateGrowthEntryDto) {
    return this.growthService.create(input);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() input: UpdateGrowthEntryDto) {
    return this.growthService.update(id, input);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.growthService.remove(id);
  }
}
