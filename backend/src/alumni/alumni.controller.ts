import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from '../common/base.service';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Get()
  findAll(
    @Query('active') active?: string,
    @Query('page') page = String(DEFAULT_PAGE),
    @Query('limit') limit = String(DEFAULT_LIMIT),
  ) {
    return this.alumniService.findAll(
      active !== undefined ? active === 'true' : undefined,
      parseInt(page, 10),
      Math.min(parseInt(limit, 10), MAX_LIMIT),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumniService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateAlumniDto) {
    return this.alumniService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateAlumniDto) {
    return this.alumniService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.alumniService.remove(id);
  }
}
