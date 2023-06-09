import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductProperties } from "../interfaces/product.interface";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "@category/entities/category.entity";
import { Type } from "class-transformer";
import { Like } from "@like/entities/like.entity";
import { Comment } from "@comments/entities/comment.entity";

@Entity('products')
export class Product extends BaseEntity implements ProductProperties
{
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({
        type: 'varchar',
        length: 255
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @Column({
        type: 'varchar',
        length: 255
    })
    countre: string;

    @IsNotEmpty()
    @IsString()
    @Column({
        type: 'varchar',
    })
    description: string;

    @Type(() => Category)
    @ManyToOne(() => Category)
    @JoinColumn()
    category: Category;

    @IsNotEmpty()
    @IsNumber()
    @Column({
        type: 'int8',
    })
    count: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({
        type: 'int8',
    })
    price: number;

    @IsNotEmpty()
    @IsString()
    @Column({
        type: 'varchar',
        length: 60,
    })
    link!: string;

    @Type(() => Like)
    @OneToMany(() => Like, (Like) => Like.product)
    @JoinColumn()
    like: Like;

    @Type(() => Comment)
    @OneToMany(() => Comment, (Comment) => Comment.product)
    @JoinColumn()
    comment: Comment;
}