import { CreateDto } from '@common/dto/base.dto';
// import { MESSAGE, REGEX } from 'src/app.utils';

export class CreateUserDto extends CreateDto {
  // @IsNotEmpty({ message: 'Email cannot be empty.' })
  // @IsEmail()
  // @Transform(({ value }) => (value as string).toLowerCase())
  readonly email!: string;

  // @IsNotEmpty({ message: 'Password cannot be empty.' })
  // @IsString()
  // @MinLength(8)
  // @Matches(REGEX.PASSWORD_RULE, { message: MESSAGE.PASSWORD_RULE_MESSAGE })
  readonly password!: string;
}
