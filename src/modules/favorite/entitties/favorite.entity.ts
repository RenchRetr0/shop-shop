import { Product } from "@product/entities/product.entity";
import { User } from "@user/entities/user.entity";
import { Type } from "class-transformer";
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorites')
export class Favorites extends BaseEntity
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
}