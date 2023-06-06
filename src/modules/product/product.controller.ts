import { 
    Body, 
    Controller, 
    FileTypeValidator, 
    Get, 
    MaxFileSizeValidator, 
    ParseFilePipe, 
    Post, 
    UploadedFile, 
    UseGuards, 
    UseInterceptors 
} from '@nestjs/common';
import { ProductService } from './service/product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterStorageConfig } from 'src/config/multer-storage.config';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { RolesDecorator } from '../auth/roles.decorator';
import { Roles } from '@common/enums/roles.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @UseInterceptors(
        FileInterceptor('photo', {
            storage: MulterStorageConfig,
        }),
    )
    @UseGuards(JWTAuthGuard, RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    @Post('create')
    async create(
        @UploadedFile(
          new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 10000000 }),
              new FileTypeValidator({
                fileType: new RegExp(/image\/(jpeg|jpg|png)/g),
              }),
            ],
          }),
        )
        file: Express.Multer.File,
        @Body() createProductDto: CreateProductDto,
      ): Promise<Product> {

        return await this.productService.create(
            createProductDto,
            file.filename,
        );
    }

    @Get()
    async findAll(): Promise<Product[]>
    {
        return await this.productService.findAll();
    }
}
