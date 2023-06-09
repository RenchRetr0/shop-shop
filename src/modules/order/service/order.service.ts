import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrderItem } from '../entities/order-items.entity';
import { UserService } from '@user/service/user.service';
import { ProductService } from '@product/service/product.service';
import { User } from '@user/entities/user.entity';
import { ProductOutOfStock } from '../errors/product-out-of-stock';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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
                await this._updateOrderItems({id: orderItems.id}, { count: newCount, total: newTotal});
                await this._updateOrder({user: {id: userId} }, {price: newTotal});
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
            await this.orderItemsRepository.save(orderItems);
            return await this.findOrder({user: {id: userId}, isOrder: false });
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
        const user = await this.userService.findOne({id: userId});
        await this._createOrder(user);
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
    async createOrder(user: User): Promise<void>
    {
        const order: Order = Order.create({
            user
        });
        
        await this.orderRepository.save(order);
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

    // async isOrderUser(id: number): Promise<Order>
    // {
    //     const order = await this.findOneOrder({id: id, isOrder: false});
    //     if(!order)
    //     {
    //         throw new OrderNotFound();
    //     }
    //     const orderItems:any = order.orderItems;
    //     const lengthOrderItems = orderItems.length;
    //     for(let i: number = 0; i < lengthOrderItems; i++)
    //     {
    //         const id = orderItems[i].product.id;
    //         const countProductItems = +orderItems[i].count;
    //         const product = await this.productService.findById(id);
    //         const productCount = +product.count;
    //         if(productCount > countProductItems)
    //         {
    //             const countAllProduct = productCount - countProductItems;
    //             await this.productService.updateProductForOrder(id, countAllProduct);
    //         }
    //         else
    //         {
    //             await this.productService.updateProductForOrder(id, 0);
    //         }
    //     }
    //     await this.orderRepository.update({id}, {isOrder: true});
    //     return await this.findOneOrder({id,  isOrder: false});
    // }

    // async findOrderdfdfs(id: number): Promise<Order>
    // {
    //     return await this.orderRepository.findOne({where: { user: { id }, isOrder: false}, relations: { user: true, orderItems: { product: true } }});
    // }

    // async adminIsStatus(id: number, status: any): Promise<Order>
    // {
    //     if(status == '1')
    //     {
    //         await this.orderRepository.update({id}, {isStatus: Status.Ready});
    //     }
    //     if(status == '0')
    //     {
    //         await this.orderRepository.update({id}, {isStatus: Status.NotReady});
    //     }
    //     return await this.findOneOrder({id});
    // }

    // async minesProductInOrderItems(id: number)
    // {
    //     const orderItems = await this.orderItemsRepository.findOne({where: { id: id }});
    //     const orderId = +orderItems.order;
    //     const order = await this.orderRepository.findOne({where: {id: orderId}});

    //     const countOrderItems = +orderItems.count;
    //     if(countOrderItems == 1)
    //     {
    //         await this.orderItemsRepository.remove(orderItems);
    //     }
    //     if(countOrderItems > 1)
    //     {
    //         const countOrderItems = +orderItems.count - 1;
    //         const newTotalOrderItems = +orderItems.price * countOrderItems;
    //         await this.orderItemsRepository.update({id: id}, {count: countOrderItems, total: newTotalOrderItems});
    //     }
    //     const newPriceOrder = +order.price - +orderItems.price;
    //     return await this.orderRepository.update({id: orderId}, {price: newPriceOrder});
    // }

    // async findOneOrder(orderFilterOptrions: FindOptionsWhere<Order>)
    // {
    //     return await this.orderRepository.findOne({where: orderFilterOptrions, relations: { user: true, orderItems: { product: true } }})
    // }

    // async getHistoryOrders(role: string, id: number)
    // {
    //     if(role == Roles.ADMIN)
    //     {
    //         return await this.orderRepository.find({where: {isStatus: Not(Status.Undefined)}});
    //     }
    //     else
    //     {
    //         return await this.orderRepository.find({where: {user: {id}, isStatus: Not(Status.Undefined)}});
    //     }
    // }

    // private async _findOrderItems(order: Order, product: Product): Promise<Order>
    // {
    //     let id = order.id;
    //     const orderFilterOptrions: FindOptionsWhere<Order> = {id};

    //     id = product.id;
    //     const productFilterOptrions: FindOptionsWhere<Product> = {id};

    //     const existOrderItem = await this.orderItemsRepository.findOne({where: { order: orderFilterOptrions, product: productFilterOptrions }, relations: { product: true }});

    //     const productCount = +product.count;
    //     if(existOrderItem)
    //     {
    //         const OrderItemCount = +existOrderItem.count;

    //         if(existOrderItem && productCount > OrderItemCount)
    //         {
    //             return await this._updateOrderItems(existOrderItem, order);
    //         }
    //         if( productCount == OrderItemCount)
    //         {
    //             throw new ProductOutOfStock(order);
    //         }
    //         if( productCount < OrderItemCount && productCount > 0)
    //         {
    //             let id = existOrderItem.id;
    //             const total = productCount * +product.price;
    //             const oldPriceItem = OrderItemCount * +existOrderItem.price;
    //             const price = +order.price - oldPriceItem + total;
    //             id = order.id;
    //             await this.orderItemsRepository.update({ id }, {count: productCount, total: total});
    //             await this.orderRepository.update({ id }, {price: price});
    //             // await this.orderItemsRepository.remove(existOrderItem);
    //             throw new ProductOutOfStock(order);
    //         }
    //     }
        
    //     else {
    //         return await this._addOrdersItems(order, product);;
    //     }
        
    // }

    // private async _addOrdersItems(order: Order, product: Product): Promise<Order>
    // {
    //     const orderItem: OrderItem = OrderItem.create({
    //         product: product,
    //         count: 1,
    //         price: product.price,
    //         total: product.price,
    //         order: order
    //     });
    //     await this.orderItemsRepository.save(orderItem);
    //     const id = order.id;
    //     const newPriceOrder = +order.price + +product.price;
    //     await this.orderRepository.update({id}, {price: newPriceOrder} );
    //     return await this.findOneOrder({id: id, isOrder: false});
    // }

    // private async _updateOrderItems(orderItem: OrderItem, order: Order): Promise<Order>
    // {
    //     let id = orderItem.id;
    //     let count = +orderItem.count + 1;
    //     const total = +orderItem.total + +orderItem.price;
    //     await this.orderItemsRepository.update({ id }, {count: count, total: total});
    //     const price = +order.price + +orderItem.price;
    //     id = order.id;
    //     await this.orderRepository.update({ id }, {price: price});
    //     return await this.findOneOrder({id: id, isOrder: false});
    // }

    // private async _createOrder(user:User, product: Product): Promise<Order>
    // {
    //     const order: Order = Order.create({
    //         price: product.price,
    //         user
    //     });
    //     const newOrder = await this.orderRepository.save(order);
    //     const orderItem: OrderItem = OrderItem.create({
    //         product: product,
    //         count: 1,
    //         price: product.price,
    //         total: product.price,
    //         order: newOrder
    //     });
    //     await this.orderItemsRepository.save(orderItem);
    //     return await this.findOrder(user.id);
    // }

    // private async findUser(id: number): Promise<User>
    // {
    //     const user = await this.userService.findOne({id});

    //     if(!user)
    //     {
    //         throw new UsersNotFound();
    //     }

    //     return user;
    // }
}