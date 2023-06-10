import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrderItem } from '../entities/order-items.entity';
import { UserService } from '@user/service/user.service';
import { ProductService } from '@product/service/product.service';
import { ProductOutOfStock } from '../errors/product-out-of-stock';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
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

    // Добавляем продукт в корзину в корзину
    async addProduct(productId: number, userId: number): Promise<Order>
    {
        const product = await this.productService.findById(productId);
        const order = await this.findOrder({user: {id: userId}, isOrder: false });

        const existOrderItem = await this._existsAddProductInOrder(+order.id, productId);
        if(existOrderItem)
        {
            const orderItems = await this._findOrderItem({order: { id: order.id } });
            if( +product.count > orderItems.count)
            {
                const newCount = +orderItems.count + 1;
                const newTotal = +orderItems.price * newCount;
                const newOrderPrice = +order.price + +product.price;
                console.log(newOrderPrice);
                await this._updateOrderItems({id: orderItems.id}, { count: newCount, total: newTotal});
                await this._updateOrder({user: {id: userId} }, {price: newOrderPrice});
                return await this.findOrder({user: {id: userId}, isOrder: false });
            }
            else
            {
                throw new ProductOutOfStock(order)
            }
        }
        else
        {
            const orderItems = OrderItem.create({
                price: product.price,
                total: product.price,
                count: 1,
                product,
                order
            });
            const newOrderPrice = +order.price + +product.price;
            await this.orderItemsRepository.save(orderItems);
            await this._updateOrder({user: {id: userId} }, {price: newOrderPrice});
            return await this.findOrder({user: {id: userId}, isOrder: false });
        }
    }

    // Админ меняет статус оформленного заказа
    async updateStatus(orderId: number, status: number): Promise<Order>
    {
        if(status == 1)
        {
            await this._updateOrder({id: orderId}, {isStatus: Status.Ready});
            return await this.findOrder({id: orderId});
        }
        else
        {
            await this._updateOrder({id: orderId}, {isStatus: Status.NotReady});
            return await this.findOrder({id: orderId});
        }
    }

    // Удалить товар в корзине
    async deletOrderItem(productId: number, userId: number): Promise<Order>
    {
        const orderItems = await this._findOrderItem({ product: {id: productId} });
        const order = await this.findOrder({user: {id: userId}, isOrder: false });
        const newPriceOrder = +order.price - +orderItems.total;
        await this.orderItemsRepository.remove(orderItems);
        await this._updateOrder({id: order.id}, {price: newPriceOrder});
        return await this.findOrder({user: {id: userId}, isOrder: false });
    }

    // Пользователь офоримил заказ и получил новую карзину
    async checkoutOrder(orderId: number, userId: number): Promise<Order>
    {
        await this._updateOrder({id: orderId}, {isOrder: true});
        await this._createOrder(userId);
        return await this.findOrder({user: {id: userId}, isOrder: false });
    }

    // Убавить колличество товара в корзине
    async minusCountOrderItem(productId: number, userId: number): Promise<Order>
    {
        const order = await this.findOrder({user: {id: userId}, isOrder: false });
        const orderItems = await this._findOrderItem({ order: {id: order.id} });
        if(+orderItems.count == 1)
        {
            return await this.deletOrderItem(productId, userId);
        }
        else
        {
            const newCount = +orderItems.count - 1;
            const newTotal = +orderItems.price * newCount;
            await this._updateOrderItems({ order: {id: order.id} }, {count: newCount, total: newTotal});
            return await this.findOrder({user: {id: userId}, isOrder: false });
        }
    }

    // Очистить всю корзину
    async clearOrder(orderId: number): Promise<Order>
    {
        await this._updateOrder({id: orderId}, {price: 0});
        const orderItems = await this._findOrderItems({order: {id: +orderId} });
        const countOrderItems = orderItems.length;
        for(let i: number = 0; i < countOrderItems; i++)
        {
            const orderItem = orderItems[i];
            await this.orderItemsRepository.remove(orderItem);
        }
        return await this.findOrder({id: orderId, isOrder: false });
    }

    // После регистриции или оформленного заказа, создаёться новая корзина 
    async _createOrder(userId: number): Promise<Order>
    {
        const user = await this.userService.findOne({id: userId});
        const order: Order = Order.create({
            user
        });
        
        return await this.orderRepository.save(order);
    }

    // Находим заказ(-ы);
    async findOrders(orderFilterQuery: FindOptionsWhere<Order>): Promise<Order | Order[]>
    {
        return await this.orderRepository.find({where: orderFilterQuery, relations: { user: true, orderItems: { product: true } } });
    }

    // Находим корзину;
    async findOrder(orderFilterQuery: FindOptionsWhere<Order>): Promise<Order>
    {
        return await this.orderRepository.findOne({where: orderFilterQuery, relations: { user: true, orderItems: { product: true } } });
    }

    private async _updateOrder(
        orderFliterQuery: FindOptionsWhere<Order>,
        orderQueryEntity: QueryDeepPartialEntity<Order>
    ): Promise<void>
    {
        await this.orderRepository.update(orderFliterQuery, orderQueryEntity);
    }

    // обновляет Товар в корзине
    private async _updateOrderItems(
        orderItemsFliterQuery: FindOptionsWhere<OrderItem>,
        orderItemsQueryEntity: QueryDeepPartialEntity<OrderItem>
    ): Promise<void>
    {
        await this.orderItemsRepository.update(orderItemsFliterQuery, orderItemsQueryEntity);
    }

    private async _existsAddProductInOrder(orderId: number, productId: number): Promise<boolean>
    {
        const existsOrNull = await this._findOrderItem({ order: { id: orderId}, product: {id: productId} });
        if (existsOrNull)
        {
            return true;
        }

        return false;
    }

    private async _findOrderItem(orderItemsFliterQuery: FindOptionsWhere<OrderItem>): Promise<OrderItem>
    {
        return await this.orderItemsRepository.findOne({where: orderItemsFliterQuery, relations: { product:  true } });
    }

    private async _findOrderItems(orderItemsFliterQuery: FindOptionsWhere<OrderItem>): Promise<OrderItem[]>
    {
        return await this.orderItemsRepository.find({where: orderItemsFliterQuery, relations: { product:  true } });
    }

}