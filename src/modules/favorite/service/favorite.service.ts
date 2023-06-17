import { Favorites } from "@favorite/entitties/favorite.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@product/entities/product.entity";
import { ProductService } from "@product/service/product.service";
import { User } from "@user/entities/user.entity";
import { UserService } from "@user/service/user.service";
import { Repository } from "typeorm";

@Injectable()
export class FavoriteService
{
    constructor (
        @InjectRepository(Favorites) private favoriteRepository: Repository<Favorites>,
        private userService: UserService,
        private productService: ProductService,
    ) {}

    async addFavorite(productId: number, userId: number): Promise<void>
    {
        const product = await this.findProduct(productId);
        const user = await this.findUser(userId);
        const favorite = Favorites.create({
            product,
            user
        });
        await this.favoriteRepository.save(favorite);
    }

    async getAll(userId: number): Promise<Favorites[]>
    {
        return await this.favoriteRepository.find({where: { user: {id: userId} }, relations: {product: true} });
    }

    async deleteFavorite(productId: number, userId: number): Promise<void>
    {
        const favorite = await this.favoriteRepository.findOne({
            where: {
                product: {id: productId},
                user: {id: userId}
            }
        })
        await this.favoriteRepository.remove(favorite);
    }

    private async findUser(userId: number): Promise<User>
    {
        return await this.userService.findOne({id: userId});
    }

    private async findProduct(productId: number): Promise<Product>
    {
        return await this.productService.findById(productId);
    }
}