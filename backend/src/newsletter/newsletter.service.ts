import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Newsletter } from './entities/newsletter.entity';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class NewsletterService extends BaseService<Newsletter> {
  constructor(
    @InjectRepository(Newsletter)
    repo: Repository<Newsletter>,
  ) {
    super(repo, 'Newsletter');
  }

  async subscribe(dto: CreateNewsletterDto): Promise<Newsletter> {
    const existing = await this.repository.findOne({ where: { email: dto.email } });

    if (existing) {
      if (existing.isSubscribed) throw new ConflictException('Email already subscribed');
      existing.isSubscribed = true;
      return this.repository.save(existing);
    }

    return this.baseCreate(dto);
  }

  async unsubscribe(email: string): Promise<Newsletter> {
    const record = await this.repository.findOne({ where: { email } });
    if (!record) throw new NotFoundException('Email not found');
    record.isSubscribed = false;
    return this.repository.save(record);
  }

  findAll(page = DEFAULT_PAGE, limit = DEFAULT_LIMIT): Promise<PaginatedResult<Newsletter>> {
    return this.paginate({}, { createdAt: 'DESC' }, page, limit);
  }

  findOne(id: string): Promise<Newsletter> {
    return this.baseFindOne(id);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
