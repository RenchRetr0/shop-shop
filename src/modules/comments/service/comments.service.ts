import { Comment } from "@comments/entities/comment.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@product/entities/product.entity";
import { User } from "@user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class CommentsService
{
    constructor (
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
    ) {}

    async createComment(
        product: Product,
        user: User,
        comment: string
    ): Promise<void>
    {
        const commentCreate = Comment.create({
            product,
            user,
            comment
        });
        await this.commentRepository.save(commentCreate);
    }
}