import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGrowthEntryDto } from './dto/create-growth-entry.dto';
import { UpdateGrowthEntryDto } from './dto/update-growth-entry.dto';

@Injectable()
export class GrowthService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.growthEntry.findMany({
      orderBy: [{ sortOrder: 'asc' }, { happenedAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const entry = await this.prisma.growthEntry.findUnique({ where: { id } });
    if (!entry) throw new NotFoundException('Growth entry not found');
    return entry;
  }

  create(input: CreateGrowthEntryDto) {
    return this.prisma.growthEntry.create({
      data: { ...input, happenedAt: new Date(input.happenedAt) },
    });
  }

  async update(id: string, input: UpdateGrowthEntryDto) {
    await this.findOne(id);
    return this.prisma.growthEntry.update({
      where: { id },
      data: {
        ...input,
        happenedAt: input.happenedAt ? new Date(input.happenedAt) : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.growthEntry.delete({ where: { id } });
  }
}
