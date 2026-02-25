import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService, DEFAULT_LIMIT, DEFAULT_PAGE } from '../common/base.service';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    repo: Repository<User>,
  ) {
    super(repo, 'User');
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.repository.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already exists');
    return this.baseCreate(dto);
  }

  async findAll(
    role?: UserRole,
    isActive?: boolean,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  ): Promise<PaginatedResult<User>> {
    const where: FindOptionsWhere<User> = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive;

    const result = await this.paginate(where, { createdAt: 'DESC' }, page, limit);
    // Strip password from response
    result.data = result.data.map((u) => {
      const { password: _pw, ...rest } = u as User & { password: string };
      return rest as User;
    });
    return result;
  }

  findOne(id: string): Promise<User> {
    return this.baseFindOne(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const updated = await this.baseUpdate(id, dto);
    const { password: _pw, ...rest } = updated as User & { password: string };
    return rest as User;
  }

  remove(id: string): Promise<void> {
    return this.baseRemove(id);
  }
}
