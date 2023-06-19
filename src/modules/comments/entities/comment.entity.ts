import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentProperties } from "../interfaces/comment.interface";
import { Type } from "class-transformer";
import { User } from "@user/entities/user.entity";
import { Product } from "@product/entities/product.entity";

@Entity('comments')
export class Comment extends BaseEntity implements CommentProperties
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    comment: string;

    @Type(() => User)
    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Type(() => Product)
    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;
}