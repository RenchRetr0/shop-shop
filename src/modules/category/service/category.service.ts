import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCategoryDto } from '@category/dto/create-category.dto';

@Injectable()
export class CategoryService
{
    constructor (
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>
    {
        const category: Category = Category.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async findOne(categoryFilterQuery: FindOptionsWhere<Category>): Promise<Category>
    {
        return await this.categoryRepository.findOne({where: categoryFilterQuery});
    }

    async findAll(): Promise<Category[]>
    {
        return await this.categoryRepository.find();
    }
}