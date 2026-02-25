import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class ProjectsService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    repo: Repository<Project>,
  ) {
    super(repo, 'Project');
  }

  create(dto: CreateProjectDto): Promise<Project> {
    return this.baseCreate(dto);
  }

  findAll(
    featured?: boolean,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<Project>> {
    const where = featured !== undefined ? { featured } : {};
    return this.paginate(where, { createdAt: 'DESC' }, page, limit);
  }

  findOne(id: string): Promise<Project> {
    return this.baseFindOne(id);
  }

  update(id: string, dto: UpdateProjectDto): Promise<Project> {
    return this.baseUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
