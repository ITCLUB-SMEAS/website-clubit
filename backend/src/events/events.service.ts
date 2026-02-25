import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventStatus } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class EventsService extends BaseService<Event> {
  constructor(
    @InjectRepository(Event)
    repo: Repository<Event>,
  ) {
    super(repo, 'Event');
  }

  create(dto: CreateEventDto): Promise<Event> {
    return this.baseCreate(dto);
  }

  findAll(
    status?: EventStatus,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<Event>> {
    const where = status ? { status } : {};
    return this.paginate(where, { startDate: 'ASC' }, page, limit);
  }

  findOne(id: string): Promise<Event> {
    return this.baseFindOne(id);
  }

  update(id: string, dto: UpdateEventDto): Promise<Event> {
    return this.baseUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
