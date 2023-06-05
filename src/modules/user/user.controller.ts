import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.userService.createUser(createUserDto);
    }

    @Get('get-user')
    @UseGuards(JWTAuthGuard)
    async getOne(@Request() req): Promise<User>
    {
        const id = req.user.userId
        return await this.userService.findOne({ id });
    }
}
