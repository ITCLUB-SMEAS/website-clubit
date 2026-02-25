import { NotFoundException } from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  FindOptionsOrder,
  ObjectLiteral,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PaginatedResult } from './interfaces/paginated-result.interface';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

export abstract class BaseService<T extends ObjectLiteral & { id: string }> {
  constructor(
    protected readonly repository: Repository<T>,
    private readonly entityName: string,
  ) {}

  async baseCreate(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async baseFindOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    if (!entity) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
    return entity;
  }

  async baseUpdate(id: string, dto: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, dto);
    return this.baseFindOne(id);
  }

  async baseRemove(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
  }

  async paginate(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    order: FindOptionsOrder<T>,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<T>> {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(Math.max(1, limit), MAX_LIMIT);

    const [data, total] = await this.repository.findAndCount({
      where,
      order,
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    });

    return {
      data,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    };
  }
}
