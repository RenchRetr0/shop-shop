import { 
    Body, 
    Controller, 
    FileTypeValidator, 
    Get, 
    MaxFileSizeValidator, 
    Param, 
    ParseFilePipe, 
    Post, 
    UploadedFile, 
    UseGuards, 
    UseInterceptors,
    Put,
    Request
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
import { FindByCategoryDto } from './dto/findByCategory.dto';
import { FindByProductIdDto } from './dto/findByProductId.dto';
import { FindByIdDto, updateProductDto } from './dto/update-product.dto';
import { LikeProductDto } from './dto/like-product.dto';
import { AddCommentDto } from './dto/add-comment.dto';

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

    @Post('catalog')
    async catalog(@Body() findByCategoryDto: FindByCategoryDto): Promise<Product[]>
    {
      return await this.productService.getCatalog(findByCategoryDto);
    }

    @Get('getOne/:productid')
    async findOne(@Param() { productid }: FindByProductIdDto): Promise<Product>
    {
      const id = +productid;
      return await this.productService.findById(id);
    }

    @Get('delete/:productid')
    @UseGuards(JWTAuthGuard)
    @RolesDecorator(Roles.ADMIN)
    async delete(@Param() { productid }: FindByProductIdDto): Promise<void>
    {
      const id = +productid;
      return await this.productService.updateProduct({id}, {count: 0});
    }

    @Put('update/:productId')
    @UseInterceptors(
      FileInterceptor('photo', {
          storage: MulterStorageConfig,
      }),
  )
    @UseGuards(JWTAuthGuard)
    @RolesDecorator(Roles.ADMIN)
    async update(
      @Param() { productId }: FindByIdDto,
      @Body() updateProductDto: updateProductDto,
      @UploadedFile()
      file: Express.Multer.File | null,
    ): Promise<void>
    {
      const id = +productId;
      return await this.productService.updateProductReqwest(id, updateProductDto, file?.filename);
    }

    @Get('products/admin')
    @UseGuards(JWTAuthGuard)
    @RolesDecorator(Roles.ADMIN)
    async adminProducts(): Promise<Product[]>
    {
      return await this.productService.findByProductForAdmin();
    }

    @Post('like')
    @UseGuards(JWTAuthGuard)
    async addLike(@Body() likeProductDto: LikeProductDto, @Request() req)
    {
      const userId = +req.user.userId;
      const productId = likeProductDto.productId;
      const isLike = likeProductDto.isLike;
      return await this.productService.addLikeProduct(productId, userId, isLike);
    }

    @Post('comment')
    @UseGuards(JWTAuthGuard)
    async addComment(@Body() addCommentDto: AddCommentDto, @Request() req)
    {
      const userId = +req.user.userId;
      const productId = addCommentDto.productId;
      const comment = addCommentDto.comment;
      return await this.productService.addComment(productId, userId, comment);
    }
}
