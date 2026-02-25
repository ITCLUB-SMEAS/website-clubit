import { IsString, IsOptional, IsBoolean, IsUrl, MinLength, MaxLength } from 'class-validator';

export class CreateAlumniDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  avatar?: string;

  @IsString()
  @IsOptional()
  @MaxLength(4)
  graduationYear?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  currentPosition?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  company?: string;

  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  bio?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
