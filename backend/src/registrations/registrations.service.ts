import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration, RegistrationStatus } from './entities/registration.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class RegistrationsService extends BaseService<Registration> {
  constructor(
    @InjectRepository(Registration)
    repo: Repository<Registration>,
  ) {
    super(repo, 'Registration');
  }

  create(dto: CreateRegistrationDto): Promise<Registration> {
    return this.baseCreate(dto);
  }

  findAll(
    status?: RegistrationStatus,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<Registration>> {
    const where = status ? { status } : {};
    return this.paginate(where, { createdAt: 'DESC' }, page, limit);
  }

  findOne(id: string): Promise<Registration> {
    return this.baseFindOne(id);
  }

  update(id: string, dto: UpdateRegistrationDto): Promise<Registration> {
    return this.baseUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
