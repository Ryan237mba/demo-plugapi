import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'me@aboubak.art' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 'Secret123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
