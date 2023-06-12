import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { FindOptionsOrder, FindOptionsWhere, MoreThan, Repository } from 'typeorm';
import { CategoryService } from '@category/service/category.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category } from '@category/entities/category.entity';
import { sortFileteDto } from '@product/dto/sort-filter.dto';

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
        const category = await this.findCategory({id: createProductDto.categoryId});
        const product: Product = Product.create({
            name: createProductDto.name,
            countre: createProductDto.countre,
            description: createProductDto.description,
            category,
            count: +createProductDto.count,
            price: +createProductDto.price,
            link: `http://shop-b6zj.onrender.com/uploads/${photoUrl}`
        });

        return await this.productRepository.save(product);
    }

    async findAll(sortFilete: string): Promise<Product[]>
    {
        const sort = await this._sort(sortFilete);
        
        return await this.productRepository.find({ 
            where: { count: MoreThan(0) },
            order: sort, 
            relations: { category: true } 
        });
    }

    async findByCategory(id: number, sortFilete: string): Promise<Product[]>
    {
        const sort = await this._sort(sortFilete);
        const product = await this.productRepository.find({
            where: {
                count: MoreThan(0),
                category: { id }
            },
            order: sort,
            relations: { category: true }
        });
        return product;
    }

    async findById(id: number): Promise<Product>
    {
        return await this.productRepository.findOne({ where: {id: id}, relations: { category: true } });
    }

    async updateProductForOrder(id: number, count: number)
    {
        await this.productRepository.update({id}, { count: count})
    }

    private async _sort(sortFilete: string): Promise<FindOptionsOrder<Product>>
    {
        if(sortFilete == 'new')
        {
            const sort: FindOptionsOrder<Product> = {id: 'DESC'};
            return sort;
        }
        if(sortFilete == 'old')
        {
            const sort: FindOptionsOrder<Product> = {id: 'ASC'};
            return sort;
        }
        if(sortFilete == 'expensive')
        {
            const sort: FindOptionsOrder<Product> = {price: 'ASC'};
            return sort;
        }
        if(sortFilete == 'cheap')
        {
            const sort: FindOptionsOrder<Product> = {price: 'DESC'};
            return sort;
        }
        if(sortFilete == 'alphabet')
        {
            const sort: FindOptionsOrder<Product> = {category: { name: 'ASC'}};
            return sort;
        }
        if(sortFilete == 'back')
        {
            const sort: FindOptionsOrder<Product> = {category: 'DESC'};
            return sort;
        }
    }

    private async findCategory(categoryFilterQuery: FindOptionsWhere<Category>): Promise<Category>
    {
        return await this.categoryService.findOne(categoryFilterQuery);
    }
}