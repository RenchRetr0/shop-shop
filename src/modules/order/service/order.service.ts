import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrderItem } from '../entities/order-items.entity';
import { UserService } from '@user/service/user.service';
import { ProductService } from '@product/service/product.service';
import { AddOrderDto } from '../dto/add-order.dto';
import { UsersNotFound } from '@user/errors/user-not-found.error';
import { Profile } from '@profile/entities/profile.entity';
import { User } from '@user/entities/user.entity';
import { Product } from '@product/entities/product.entity';

@Injectable()
export class OrderService
{
    constructor (
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>,
        private userService: UserService,
        private productService: ProductService
    ) {}

    async addOrder(productId, userId: number)
    {
        const user = await this.findUser(userId);
        const product = await this.productService.findById(productId);
        const existOrder = await this.findOrder(userId);
        if(!existOrder)
        {
            return await this._createOrder(user, product);
        }
        else {
            const orderItemsOrNull = await this._findOrderItems(existOrder, product);
        
            if(orderItemsOrNull)
            {
                return orderItemsOrNull;
            }
            else
            {
                return await this._addOrdersItems(existOrder, product);
            }
        }

    }

    async findOrder(id: number): Promise<Order>
    {
        return await this.orderRepository.findOne({where: { user: { id }, isOrder: false}, relations: { user: true, orderItems: true }});
    }

    async findOneOrder(orderFilterOptrions: FindOptionsWhere<Order>)
    {
        return await this.orderRepository.findOne({where: orderFilterOptrions, relations: { user: true, orderItems: true }})
    }

    private async _findOrderItems(order: Order, product: Product): Promise<Order | boolean>
    {
        let id = order.id;
        const orderFilterOptrions: FindOptionsWhere<Order> = {id};

        id = product.id;
        const productFilterOptrions: FindOptionsWhere<Product> = {id};

        const existOrderItem = await this.orderItemsRepository.findOne({where: { order: orderFilterOptrions, product: productFilterOptrions }, relations: { product: true }});
        if(existOrderItem)
        {
            return await this._updateOrderItems(existOrderItem, order);
        }
        else {
            return false;
        }
    }

    private async _addOrdersItems(order: Order, product: Product): Promise<Order>
    {
        const orderItem: OrderItem = OrderItem.create({
            product: product,
            count: 1,
            price: product.price,
            total: product.price,
            order: order
        });
        await this.orderItemsRepository.save(orderItem);
        const id = order.id;
        return await this.findOneOrder({id});
    }

    private async _updateOrderItems(orderItem: OrderItem, order: Order): Promise<Order>
    {
        let id = orderItem.id;
        const orderItemCount = orderItem.count;
        let count = +orderItem.count;
        console.log(count);
        count += 1;
        console.log(count);
        const orderItemTotal = orderItem.total;
        const total = orderItemTotal + orderItemTotal;
        // await this.orderItemsRepository.update({ id }, {count: count, total: total});
        const price = order.price + orderItem.price;
        id = order.id;
        // await this.orderRepository.update({ id }, {price: price});
        return await this.findOneOrder({id});
    }

    private async _createOrder(user:User, product: Product): Promise<Order>
    {
        const order: Order = Order.create({
            price: product.price,
            user
        });
        const newOrder = await this.orderRepository.save(order);
        const orderItem: OrderItem = OrderItem.create({
            product: product,
            count: 1,
            price: product.price,
            total: product.price,
            order: newOrder
        });
        await this.orderItemsRepository.save(orderItem);
        return await this.findOrder(user.id);
    }

    private async findUser(id: number): Promise<User>
    {
        const user = await this.userService.findOne({id});

        if(!user)
        {
            throw new UsersNotFound();
        }

        return user;
    }
}