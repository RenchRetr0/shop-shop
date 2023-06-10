import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { JWTAuthGuard } from '@auth/guards/jwt-auth.guard';
import { AddOrderDto } from './dto/add-order.dto';
import { Order } from './entities/order.entity';
import { RolesDecorator } from '@auth/roles.decorator';
import { Roles } from '@common/enums/roles.enum';
import { GetHistoryDTO, MinesProductDTO, UpdateStatusOrderDto } from './dto/update-status-order.dto';
import { Status } from '@common/enums/status.enum';
import { Not } from 'typeorm';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    // добавление товара в корзину
    @UseGuards(JWTAuthGuard)
    @Get('addProduct/:productId')
    async addOrder(@Param() { productId }: AddOrderDto, @Request() req): Promise<Order>
    {
        const userId = +req.user.userId;
        const newProductId = +productId - 1;
        return await this.orderService.addProduct(newProductId, userId);
    }

    // Создание новой карзины
    @UseGuards(JWTAuthGuard)
    @Get('create')
    async createOrder(@Request() req): Promise<Order>
    {
        const userId = +req.user.userId;
        return await this.orderService._createOrder(userId);
    }

    // получение карзины
    @UseGuards(JWTAuthGuard)
    @Get('get-order')
    async findOrders(@Request() req): Promise<Order>
    {
        const userId = +req.user.userId - 1;
        return await this.orderService.findOrder({id: userId});
    }

    // оформление заказа пользователем
    @UseGuards(JWTAuthGuard)
    @Get('checkout-order/:productId')
    async isOrder(@Param() { productId }: AddOrderDto, @Request() req): Promise<Order>
    {
        const userId = +req.user.userId;
        return await this.orderService.checkoutOrder(+productId, userId);
    }

    // выводит все оформленные заказы без окончательного статуса
    @UseGuards(JWTAuthGuard)
    @RolesDecorator(Roles.ADMIN)
    @Get('admin/get-orders')
    async isAllOrders(@Request() req): Promise<Order | Order[]>
    {
        const userId = +req.user.userId;
        return await this.orderService.findOrders({user: {id: userId}, isStatus: Status.Undefined});
    }

    // меняет статус оформленного заказа
    @UseGuards(JWTAuthGuard)
    @RolesDecorator(Roles.ADMIN)
    @Get('update-status/:orderId/:status')
    async isStatus(@Param() {orderId, status}: UpdateStatusOrderDto ): Promise<Order>
    {
        return await this.orderService.updateStatus(+orderId, +status);
    }

    // Кнопка минус для корзины
    // order/mines-product/:orderItemsId J
    @UseGuards(JWTAuthGuard)
    @Get('minus-count/:productId')
    async minesProduct(@Param() {productId}: MinesProductDTO, @Request() req )
    {
        // переделать
        const userId = +req.user.userId;
        return await this.orderService.minusCountOrderItem(+productId, userId);
    }

    // История всех заказов
    // order/history/:role J
    @UseGuards(JWTAuthGuard)
    @Get('history/:role')
    async getHistoreOrder(@Param() {role}: GetHistoryDTO, @Request() req ): Promise<Order | Order[]>
    {
        if(role == 'ADMIN')
        {
            return await this.orderService.findOrders({isStatus: Not(Status.Undefined)})
        }
        if(role == 'USER')
        {
            const userId = +req.user.userId;
            return await this.orderService.findOrders({user: {id: userId}, isStatus: Not(Status.Undefined)})
        }
    }
}
