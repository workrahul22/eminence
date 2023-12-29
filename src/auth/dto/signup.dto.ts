import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
