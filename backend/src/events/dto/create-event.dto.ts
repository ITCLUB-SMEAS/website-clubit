import { IsString, IsOptional, IsDate, IsEnum, IsInt, Min, Max, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { EventStatus } from '../entities/event.entity';

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  image?: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  location?: string;

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  @IsInt()
  @Min(1)
  @Max(10000)
  @IsOptional()
  maxParticipants?: number;
}
