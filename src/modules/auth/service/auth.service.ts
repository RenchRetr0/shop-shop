import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/service/user.service';
import { EmailUserDto } from '../dto/EmailUser.dto';
import { User } from '@user/entities/user.entity';
import { compare } from 'bcrypt';
import { UserResponseDto } from '../dto/UserResponse.dto';
import { UsersNotFound } from '@user/errors/user-not-found.error';
import { UsersUnauthorized } from '@user/errors/user-unauthorizad.error';

@Injectable()
export class AuthService
{
    constructor (
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(emailUserDto: EmailUserDto): Promise<UserResponseDto> {
        const user = await this.userService.findOneByEmail(emailUserDto.email);
        if (!user) throw new UsersNotFound();
    
        const isCorrectPassword = await compare(
          emailUserDto.password,
          user.password,
        );
        if (!isCorrectPassword) {
          throw new UsersUnauthorized();
        }
    
        return {
          user: user,
          accessToken: await this.generateToken(user),
        };
    }

    async generateToken(user: User): Promise<string> {
        return this.jwtService.sign({
          userId: user.id,
          role: user.role,
        });
    }
}
