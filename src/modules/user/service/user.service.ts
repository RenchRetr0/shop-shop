import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '@profile/entities/profile.entity';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { User } from '@user/entities/user.entity';
import { UserWithCurrentEmailAlreadyExists } from '@user/errors/user-with-current-email-exists.error';
import { profile } from 'console';
import { OrderService } from 'src/modules/order/service/order.service';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class UserService
{
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existsWithCurrentEmail = await this._emailExists(createUserDto.email);
        if (existsWithCurrentEmail) {
            throw new UserWithCurrentEmailAlreadyExists(createUserDto.email);
        }

        const user: User = User.create({
            email: createUserDto.email,
            password: createUserDto.password,
        });

        const newUser = await this.userRepository.save(user);

        return newUser;
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
          where: { email: Like(`%${email}%`) },
          relations: { profile: true }
        });
    }

    async findOne(userFilterQuery: FindOptionsWhere<User>): Promise<User> {
        return await this.userRepository.findOne({
          where: userFilterQuery,
          relations: { profile: true },
        });
    }

    async _profileUserUpdate(id: number, profile): Promise<void>
    {
        await this.userRepository
            .update({ id }, {profile: profile});
    }

    private async _emailExists(email: string): Promise<boolean> {
        return !!(await this.userRepository.countBy({ email: Like(`%${email}%`) }));
    }

    async _returProfiel(id: number): Promise<Profile>
    {
        return (await this.userRepository.findOne({where: {id: id}, relations: { profile: true }})).profile;
    }
}