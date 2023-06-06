import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '@category/service/category.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService
{
    constructor (
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private categoryService: CategoryService,
    ) {}

    async create(
        createProductDto: CreateProductDto,
        photoUrl: string
    ): Promise<Product>
    {
        const name = createProductDto.categoryName;
        const category = await this.categoryService.findOne({name})
        const product: Product = Product.create({
            name: createProductDto.name,
            countre: createProductDto.countre,
            description: createProductDto.description,
            category,
            count: +createProductDto.count,
            price: +createProductDto.price,
            link: photoUrl
        });

        return await this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]>
    {
        return await this.productRepository.find({ relations: { category: true } });
    }
}