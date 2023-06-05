import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { EmailUserDto } from './dto/EmailUser.dto';
import { UserResponseDto } from './dto/UserResponse.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { Roles } from '@common/enums/roles.enum';
import { RolesDecorator } from './roles.decorator';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('sign-in')
    async signIn(@Body() emailUserDto: EmailUserDto): Promise<UserResponseDto>
    {
        return await this.authService.signIn(emailUserDto);
    }

    @UseGuards(JWTAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<any> {
        return req.user;
    }

    @UseGuards(JWTAuthGuard, RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    @Get('admin')
    async admin(@Request() req): Promise<any> {
        return req.user;
    }
}
