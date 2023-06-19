import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "../entities/like.entity";
import { Repository } from "typeorm";
import { Product } from "@product/entities/product.entity";
import { User } from "@user/entities/user.entity";
import { UserService } from "@user/service/user.service";

@Injectable()
export class LikeService
{
    constructor (
        @InjectRepository(Like) private likeRepository: Repository<Like>,
        private userService: UserService,
    ) {}

    async like(product: Product, userId: number, isLike: boolean): Promise<void>
    {
        const productId = +product.id;
        const user = await this.userService.findOne({id: userId});
        const likeExzist = await this.likeExzist(productId, userId);
        if(!likeExzist)
        {
            await this.createLike(product, user, isLike);
        }
        if(likeExzist && likeExzist.like == isLike)
        {
            await this.likeRepository.remove(likeExzist);
        }
        if(likeExzist && likeExzist.like != isLike)
        {
            await this.likeRepository.update(
                {
                    product: { id: productId},
                    user: {id: userId}
                },
                {
                    like: isLike,
                },
            );
        }
    }

    async likeExzist(productId: number, userId: number)
    {
        return await this.likeRepository.findOne({
            where: { 
                product: { id: productId},
                user: {id: userId}
            }
        });
    }

    private async createLike(product: Product, user: User, isLike: boolean): Promise<Like>
    {
        const like = Like.create({
            product,
            user,
            like: isLike
        });
        return await this.likeRepository.save(like);
    }
}