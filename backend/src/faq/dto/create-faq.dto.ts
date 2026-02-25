import { IsString, IsOptional, IsInt, IsBoolean, Min, Max, MinLength, MaxLength } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  question: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  answer: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  category?: string;

  @IsInt()
  @Min(0)
  @Max(9999)
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
