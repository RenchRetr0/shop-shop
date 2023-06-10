
export class EmailUserDto {
  // @IsNotEmpty({ message: 'Email cannot be empty.' })
  // @IsEmail()
  readonly email: string;

  // @IsNotEmpty({ message: 'Password cannot be empty.' })
  // @Length(8)
  // @Matches(REGEX.PASSWORD_RULE, { message: MESSAGE.PASSWORD_RULE_MESSAGE })
  readonly password: string;
}
