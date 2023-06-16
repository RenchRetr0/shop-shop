import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { UserModule } from '@user/user.module';
import { ProductModule } from '@product/product.module';
import { LikeService } from './service/like.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Like])
  ],
  controllers: [LikeController],
  providers: [
    LikeService
  ],
  exports: [
    LikeService
  ]
})
export class LikeModule {}
