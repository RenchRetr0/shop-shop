import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './service/product.service';
import { CategoryModule } from '@category/category.module';
import { LikeModule } from '@like/like.module';

@Module({
    imports: [
        CategoryModule,
        LikeModule,
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}
