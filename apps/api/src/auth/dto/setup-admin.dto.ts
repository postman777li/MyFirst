import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SetupAdminDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(60)
  displayName!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(72)
  password!: string;
}
