import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { Roles } from '@common/enums/roles.enum';
import { RolesDecorator } from '../auth/roles.decorator';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(JWTAuthGuard, RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    @Post('create')
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<void>
    {
        await this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    async findAll(): Promise<Category[]>
    {
        return await this.categoryService.findAll();
    }
}
