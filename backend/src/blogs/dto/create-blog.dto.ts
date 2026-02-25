import { IsString, IsOptional, IsBoolean, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(220)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'slug must be lowercase kebab-case' })
  slug: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  excerpt?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  coverImage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  author?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
