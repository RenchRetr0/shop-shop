import { Product } from "@product/entities/product.entity";
import { User } from "@user/entities/user.entity";
import { Type } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('likes')
export class Like extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => User)
    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Type(() => Product)
    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Column({
        type: 'boolean'
    })
    like: boolean;
}