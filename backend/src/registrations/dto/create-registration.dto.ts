import { IsString, IsOptional, IsArray, IsEmail, MinLength, MaxLength, Matches, ArrayMaxSize } from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @Matches(/^\+?[0-9\s\-]{7,20}$/, { message: 'phone number is invalid' })
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  school?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  grade?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  motivation?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @IsOptional()
  interests?: string[];
}
