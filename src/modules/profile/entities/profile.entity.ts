import {
    IsDate,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ProfileProperties } from '../interfaces/profile.interface';

@Entity('profiles')
export class Profile extends BaseEntity implements ProfileProperties {
  @IsNotEmpty()
  @IsUUID('4')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Column({
    type: 'varchar',
    length: 100,
  })
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Column({
    type: 'varchar',
    length: 100,
  })
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  patronym?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Column({
    type: 'varchar',
    length: 100,
  })
  address!: string;

  @IsNotEmpty()
  @IsPhoneNumber('RU')
  @Column({
    type: 'varchar',
    length: 20,
  })
  phone!: string;

  @IsDate()
  @CreateDateColumn()
  createdAt?: Date;

  @IsDate()
  @UpdateDateColumn()
  updateAt?: Date;
}
