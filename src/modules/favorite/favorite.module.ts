import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entitties/favorite.entity';
import { ProductModule } from '@product/product.module';
import { UserModule } from '@user/user.module';
import { FavoriteService } from './service/favorite.service';
import { FavoriteController } from './favorite.controller';

@Module({
    imports: [
        ProductModule,
        UserModule,
        TypeOrmModule.forFeature([Favorites]),
    ],
    providers: [FavoriteService],
    controllers: [FavoriteController],
})
export class FavoriteModule {}
