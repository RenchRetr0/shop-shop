import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './service/profile.service';
import { UserModule } from '@user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile]),
        UserModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule {}
