import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class ContactsService extends BaseService<Contact> {
  constructor(
    @InjectRepository(Contact)
    repo: Repository<Contact>,
  ) {
    super(repo, 'Contact');
  }

  create(dto: CreateContactDto): Promise<Contact> {
    return this.baseCreate(dto);
  }

  findAll(page = DEFAULT_PAGE, limit = DEFAULT_LIMIT): Promise<PaginatedResult<Contact>> {
    return this.paginate({}, { createdAt: 'DESC' }, page, limit);
  }

  findOne(id: string): Promise<Contact> {
    return this.baseFindOne(id);
  }

  async markAsRead(id: string): Promise<Contact> {
    await this.repository.update(id, { isRead: true });
    return this.baseFindOne(id);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
