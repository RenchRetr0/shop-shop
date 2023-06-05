import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './service/profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post('create')
    @UseGuards(JWTAuthGuard)
    async create(
        @Request() req,
        @Body() createProfileDto: CreateProfileDto
    ): Promise<Profile>
    {
        return await this.profileService.createProfile(createProfileDto, req.user.userId);
    }
}
