import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  Length,
  IsBase64,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/[a-z]+/, {
    message: 'password must contain at least 1 lower case character.',
  })
  @Matches(/[A-Z]+/, {
    message: 'password must contain at leat 1 upper case character.',
  })
  @Matches(/[0-9]+/, { message: 'password must contain at leat 1 number.' })
  @Length(6)
  password: string;

  @ApiProperty()
  @IsBase64()
  token: string;
}
