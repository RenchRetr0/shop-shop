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
import { ProductOutOfStock } from '../errors/product-out-of-stock';
import { OrderNotFound } from '../errors/order-not-found.error';
import { Status } from '@common/enums/status.enum';

@Injectable()
export class OrderService
{
    constructor (
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>,
        private userService: UserService,
        private productService: ProductService
    ) {}

    async addOrder(productId, userId: number): Promise<Order>
    {
        const user = await this.findUser(userId);
        const product = await this.productService.findById(productId);
        const coutProduct = +product.count;
        const existOrder = await this.findOrder(userId);
        if(!existOrder && coutProduct > 0)
        {
            return await this._createOrder(user, product);
        }

        if(coutProduct > 0) {
            const orderItemsOrNull = await this._findOrderItems(existOrder, product);
        
            return orderItemsOrNull;
        }
        if(coutProduct == 0)
        {
            throw new ProductOutOfStock();
        }
    }

    async isOrderUser(id: number): Promise<Order>
    {
        const order = await this.findOneOrder({id: id, isOrder: false});
        if(!order)
        {
            throw new OrderNotFound();
        }
        const orderItems:any = order.orderItems;
        const lengthOrderItems = orderItems.length;
        for(let i: number = 0; i < lengthOrderItems; i++)
        {
            const id = orderItems[i].product.id;
            const countProductItems = +orderItems[i].count;
            const product = await this.productService.findById(id);
            const productCount = +product.count;
            if(productCount > countProductItems)
            {
                const countAllProduct = productCount - countProductItems;
                await this.productService.updateProductForOrder(id, countAllProduct);
            }
            else
            {
                await this.productService.updateProductForOrder(id, 0);
            }
        }
        await this.orderRepository.update({id}, {isOrder: true});
        return await this.findOneOrder({id});
    }

    async findOrder(id: number): Promise<Order>
    {
        return await this.orderRepository.findOne({where: { user: { id }, isOrder: false}, relations: { user: true, orderItems: { product: true } }});
    }

    async adminIsStatus(id: number, status: any)
    {
        if(status == '1')
        {
            await this.orderRepository.update({id}, {isStatus: Status.Ready});
        }
        if(status == '0')
        {
            await this.orderRepository.update({id}, {isStatus: Status.NotReady});
        }
        return await this.findOneOrder({id});
    }

    async findAllOrder()
    {}

    async findOneOrder(orderFilterOptrions: FindOptionsWhere<Order>)
    {
        return await this.orderRepository.findOne({where: orderFilterOptrions, relations: { user: true, orderItems: { product: true } }})
    }

    private async _findOrderItems(order: Order, product: Product): Promise<Order>
    {
        let id = order.id;
        const orderFilterOptrions: FindOptionsWhere<Order> = {id};

        id = product.id;
        const productFilterOptrions: FindOptionsWhere<Product> = {id};

        const existOrderItem = await this.orderItemsRepository.findOne({where: { order: orderFilterOptrions, product: productFilterOptrions }, relations: { product: true }});

        const productCount = +product.count;
        if(existOrderItem)
        {
            const OrderItemCount = +existOrderItem.count;

            if(existOrderItem && productCount > OrderItemCount)
            {
                return await this._updateOrderItems(existOrderItem, order);
            }
            if( productCount == OrderItemCount)
            {
                throw new ProductOutOfStock();
            }
            if( productCount < OrderItemCount && productCount > 0)
            {
                let id = existOrderItem.id;
                const total = productCount * +product.price;
                const oldPriceItem = OrderItemCount * +existOrderItem.price;
                const price = +order.price - oldPriceItem + total;
                id = order.id;
                await this.orderItemsRepository.update({ id }, {count: productCount, total: total});
                await this.orderRepository.update({ id }, {price: price});
                // await this.orderItemsRepository.remove(existOrderItem);
                throw new ProductOutOfStock();
            }
        }
        
        else {
            return await this._addOrdersItems(order, product);;
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
        const newPriceOrder = +order.price + +product.price;
        await this.orderRepository.update({id}, {price: newPriceOrder} );
        return await this.findOneOrder({id: id, isOrder: false});
    }

    private async _updateOrderItems(orderItem: OrderItem, order: Order): Promise<Order>
    {
        let id = orderItem.id;
        let count = +orderItem.count + 1;
        const total = +orderItem.total + +orderItem.price;
        await this.orderItemsRepository.update({ id }, {count: count, total: total});
        const price = +order.price + +orderItem.price;
        id = order.id;
        await this.orderRepository.update({ id }, {price: price});
        return await this.findOneOrder({id: id, isOrder: false});
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

        if(!user || !user.profile)
        {
            throw new UsersNotFound();
        }

        return user;
    }
}