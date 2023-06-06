import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { FindOptionsWhere, MoreThan, Repository } from 'typeorm';
import { CategoryService } from '@category/service/category.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category } from '@category/entities/category.entity';

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
        const category = await this.findCategory(name);
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
        return await this.productRepository.find({ where: { count: MoreThan(0) }, relations: { category: true } });
    }

    async findByCategory(name: string): Promise<Product[]>
    {
        const categoryFind = await this.findCategory(name);
        const id = categoryFind.id;
        const product = await this.productRepository.find({ where: { count: MoreThan(0), category: { id } }, relations: { category: true } });
        return product;
    }

    async findById(id: number): Promise<Product>
    {
        return await this.productRepository.findOne({ where: {id: id}, relations: { category: true } });
    }

    private async findCategory(name: string): Promise<Category>
    {
        return await this.categoryService.findOne({name});
    }
}