import { Injectable } from '@nestjs/common';
import { Profile } from '../entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UserService } from '@user/service/user.service';

@Injectable()
export class ProfileService
{
    constructor (
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        private userService: UserService,
    ) {}

    async createProfile(createProfileDto: CreateProfileDto, id: number) 
    {
        const profile: Profile = Profile.create(createProfileDto);

        const newProfile = await this.profileRepository.save(profile)

        await this.userService._profileUserUpdate(id, newProfile);
        return newProfile;
    }
}