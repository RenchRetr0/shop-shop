import { Roles } from '@common/enums/roles.enum';
import { hash } from 'bcrypt';
import { Exclude, Type } from 'class-transformer';
import {
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserProperties } from '../interfaces/user.interface';
import { Profile } from '@profile/entities/profile.entity';

@Entity('users')
export class User extends BaseEntity implements UserProperties {
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column({
    type: 'varchar',
    unique: true,
    length: 256,
  })
  email!: string;

  @Exclude()
  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'varchar',
    length: 120,
  })
  password!: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  @Column({
    type: 'varchar',
    length: 20,
    default: Roles.USER,
    enum: Roles,
  })
  role: Roles;

  @Type(() => Profile)
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @IsDate()
  @CreateDateColumn()
  createdAt?: Date;

  @IsDate()
  @UpdateDateColumn()
  updateAt?: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await hash(password || this.password, 10);
  }
}
