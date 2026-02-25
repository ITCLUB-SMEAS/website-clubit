import { IsString, IsOptional, IsDate, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAchievementDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  image?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  competitionName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  awardLevel?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  achievementDate?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  teamMembers?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
