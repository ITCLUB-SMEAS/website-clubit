import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumni } from './entities/alumni.entity';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class AlumniService extends BaseService<Alumni> {
  constructor(
    @InjectRepository(Alumni)
    repo: Repository<Alumni>,
  ) {
    super(repo, 'Alumni');
  }

  create(dto: CreateAlumniDto): Promise<Alumni> {
    return this.baseCreate(dto);
  }

  findAll(
    isActive?: boolean,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<Alumni>> {
    const where = isActive !== undefined ? { isActive } : {};
    return this.paginate(where, { createdAt: 'DESC' }, page, limit);
  }

  findOne(id: string): Promise<Alumni> {
    return this.baseFindOne(id);
  }

  update(id: string, dto: UpdateAlumniDto): Promise<Alumni> {
    return this.baseUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
