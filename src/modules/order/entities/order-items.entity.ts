import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemsProperties } from "../interfaces/order-items.interface";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Product } from "@product/entities/product.entity";
import { Order } from "./order.entity";

@Entity('orderItems')
export class OrderItem extends BaseEntity implements OrderItemsProperties
{
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    @Type(() => Product)
    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;

    @IsNotEmpty()
    @IsNumber()
    @Column({
        type: 'int8'
    })
    count: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({
        type: 'int8'
    })
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({
        type: 'int8'
    })
    total: number;

    @Type(() => Order)
    @ManyToOne(() => Order)
    @JoinColumn()
    order: Order;
}