import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
