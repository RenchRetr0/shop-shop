import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { FindOptionsOrder, FindOptionsWhere, MoreThan, Repository, UpdateResult } from 'typeorm';
import { CategoryService } from '@category/service/category.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category } from '@category/entities/category.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { updateProductDto } from '@product/dto/update-product.dto';
import { LikeService } from '@like/service/like.service';
import { FindByCategoryDto } from '@product/dto/findByCategory.dto';

@Injectable()
export class ProductService
{
    constructor (
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private categoryService: CategoryService,
        private likeService: LikeService,
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
            relations: { category: true, like: true } 
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
            relations: { category: true, like: true }
        });
        return product;
    }

    async getCatalog(findByCategoryDto: FindByCategoryDto): Promise<Product[]>
    {
        const sort = await this._sort(findByCategoryDto.sortFilter);
        const categoryId = findByCategoryDto.categoryId;
        const userId = findByCategoryDto.userId;
        if(userId)
        {
            return await this.findAllCatalog(
                {
                    count: MoreThan(0),
                    category: { id: categoryId },
                    like: {user: {id: userId || null} }
                },
                sort
            );
        }
        else
        {
            return await this.findAllCatalog(
                {
                    count: MoreThan(0),
                    category: { id: categoryId },
                },
                sort
            )
        }
        
    }

    async findAllCatalog(productFilterQuery: FindOptionsWhere<Product>, sort: FindOptionsOrder<Product>): Promise<any>
    {
        return await this.productRepository
            .find({ where: productFilterQuery, order: sort, relations: { category: true, like: {user: true} }})
    }

    async findByProductForAdmin(): Promise<Product[]>
    {
        return await this.productRepository.find();
    }

    async findById(id: number): Promise<Product>
    {
        return await this.productRepository.findOne({ where: {id: id}, relations: { category: true } });
    }

    async updateProductForOrder(id: number, count: number): Promise<void>
    {
        await this.productRepository.update({id}, {count: count});
    }

    async updateProductReqwest(
        id: number,
        updateProductDto: updateProductDto,
        photoUrl: string | null
    ): Promise<void>
    {
        if(photoUrl)
        {
            updateProductDto.link = `http://shop-b6zj.onrender.com/uploads/${photoUrl}`;
            await this._updateWithPgoto(id, updateProductDto);
        }
        else
        {
            await this._updateWithPgoto(id, updateProductDto);
        }
        
    }

    async updateProduct(productFindOption: FindOptionsWhere<Product>, productUpdateData: QueryDeepPartialEntity<Product>): Promise<void>
    {
        await this.productRepository.update(productFindOption, productUpdateData);
    }

    async addLikeProduct(productId: number, userId: number, isLike: boolean)
    {
        const product = await this.findById(productId);
        await this.likeService.like(product, userId, isLike);
    }

    private async _updateWithPgoto(
        id: number,
        updateProductDto: updateProductDto,
    ): Promise<void>
    {
        await this.productRepository
            .update({id}, updateProductDto)
            .then((x: UpdateResult) => x.raw as Product);
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