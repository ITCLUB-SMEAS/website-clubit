import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class TestimonialsService extends BaseService<Testimonial> {
  constructor(
    @InjectRepository(Testimonial)
    repo: Repository<Testimonial>,
  ) {
    super(repo, 'Testimonial');
  }

  create(dto: CreateTestimonialDto): Promise<Testimonial> {
    return this.baseCreate(dto);
  }

  findAll(
    isActive?: boolean,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<Testimonial>> {
    const where = isActive !== undefined ? { isActive } : {};
    return this.paginate(where, { createdAt: 'DESC' }, page, limit);
  }

  findOne(id: string): Promise<Testimonial> {
    return this.baseFindOne(id);
  }

  update(id: string, dto: UpdateTestimonialDto): Promise<Testimonial> {
    return this.baseUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
