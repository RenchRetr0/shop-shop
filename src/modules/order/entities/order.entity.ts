import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProperties } from "../interfaces/order.interface";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { User } from "@user/entities/user.entity";
import { OrderItem } from "./order-items.entity";

@Entity('orders')
export class Order extends BaseEntity implements OrderProperties
{
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({
        type: 'int8'
    })
    price!: number;

    @Type(() => User)
    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItem)
    @OneToMany(() => OrderItem, (orderItems) => orderItems.order)
    orderItems!: OrderItem[];

    @IsNotEmpty()
    @Column({
        type: 'boolean',
        default: 0,
    })
    isOrder: boolean;

    @IsNotEmpty()
    @Column({
        type: 'boolean',
        default: 0,
    })
    isConfirm: boolean;
}