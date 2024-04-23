import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

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
}
