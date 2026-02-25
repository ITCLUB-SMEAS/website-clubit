import { IsString, IsOptional, IsBoolean, IsArray, IsUrl, MinLength, MaxLength, ArrayMaxSize } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(3000)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  image?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsUrl()
  @IsOptional()
  demoUrl?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(20)
  @IsOptional()
  technologies?: string[];

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
