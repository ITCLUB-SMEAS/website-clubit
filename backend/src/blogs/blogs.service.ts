import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class BlogsService extends BaseService<Blog> {
  constructor(
    @InjectRepository(Blog)
    repo: Repository<Blog>,
  ) {
    super(repo, 'Blog');
  }

  create(dto: CreateBlogDto): Promise<Blog> {
    return this.baseCreate(dto);
  }

  findAll(
    published?: boolean,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<Blog>> {
    const where = published !== undefined ? { published } : {};
    return this.paginate(where, { createdAt: 'DESC' }, page, limit);
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.repository.findOne({ where: { slug } });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  findOne(id: string): Promise<Blog> {
    return this.baseFindOne(id);
  }

  update(id: string, dto: UpdateBlogDto): Promise<Blog> {
    return this.baseUpdate(id, dto);
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
