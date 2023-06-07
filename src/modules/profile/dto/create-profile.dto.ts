import { CreateDto } from '@common/dto/base.dto';

export class CreateProfileDto extends CreateDto {
  // @IsNotEmpty({ message: 'First name cannot be null.' })
  // @IsString()
  // @IsAlpha('ru-RU')
  // @MinLength(1)
  // @MaxLength(100)
  readonly firstName!: string;

  // @IsNotEmpty({ message: 'Last name cannot be null.' })
  // @IsString()
  // @IsAlpha('ru-RU')
  // @MinLength(1)
  // @MaxLength(100)
  readonly lastName!: string;

  // @IsOptional()
  // @IsString()
  // @IsAlpha('ru-RU')
  // @MinLength(1)
  // @MaxLength(100)
  readonly patronym?: string;

  // @IsOptional()
  // @IsString()
  // @IsAlpha('ru-RU')
  // @MinLength(1)
  // @MaxLength(100)
  readonly address!: string;

  // @IsNotEmpty({ message: 'Phone cannot be empty.' })
  // @IsPhoneNumber('RU')
  readonly phone!: string;
}
