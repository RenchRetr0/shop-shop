import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { FavoriteService } from './service/favorite.service';
import { JWTAuthGuard } from '@auth/guards/jwt-auth.guard';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { Favorites } from './entitties/favorite.entity';

@Controller('favorite')
export class FavoriteController {
    constructor(
        private readonly favoriteService: FavoriteService
    ) {}

    @UseGuards(JWTAuthGuard)
    @Get('add/:productId')
    async addFavorite(@Param() { productId }: AddFavoriteDto, @Request() req): Promise<void>
    {
        const userId = +req.user.userId;
        return await this.favoriteService.addFavorite(+productId, userId);
    }

    @UseGuards(JWTAuthGuard)
    @Get('all')
    async getAllFavorite(@Request() req): Promise<Favorites[]>
    {
        const userId = +req.user.userId;
        return await this.favoriteService.getAll(userId);
    }

    @UseGuards(JWTAuthGuard)
    @Get('del/:productId')
    async delFavorite(@Param() { productId }: AddFavoriteDto, @Request() req): Promise<void>
    {
        const userId = +req.user.userId;
        return await this.favoriteService.deleteFavorite(+productId, userId);
    }
}
