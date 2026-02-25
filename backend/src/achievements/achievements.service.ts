import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class AchievementsService extends BaseService<Achievement> {
  constructor(
    @InjectRepository(Achievement)
    repo: Repository<Achievement>,
  ) {
    super(repo, 'Achievement');
  }

  create(dto: CreateAchievementDto): Promise<Achievement> {
    return this.baseCreate(dto);
  }

  findAll(
    isActive?: boolean,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<Achievement>> {
    const where = isActive !== undefined ? { isActive } : {};
    return this.paginate(where, { achievementDate: 'DESC' }, page, limit);
  }

  findOne(id: string): Promise<Achievement> {
    return this.baseFindOne(id);
  }

  update(id: string, dto: UpdateAchievementDto): Promise<Achievement> {
    return this.baseUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
