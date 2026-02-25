import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class FaqService extends BaseService<Faq> {
  constructor(
    @InjectRepository(Faq)
    repo: Repository<Faq>,
  ) {
    super(repo, 'FAQ');
  }

  create(dto: CreateFaqDto): Promise<Faq> {
    return this.baseCreate(dto);
  }

  findAll(
    isActive?: boolean,
    category?: string,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<Faq>> {
    const where: FindOptionsWhere<Faq> = {};
    if (isActive !== undefined) where.isActive = isActive;
    if (category) where.category = category;
    return this.paginate(where, { order: 'ASC', createdAt: 'DESC' }, page, limit);
  }

  findOne(id: string): Promise<Faq> {
    return this.baseFindOne(id);
  }

  update(id: string, dto: UpdateFaqDto): Promise<Faq> {
    return this.baseUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
