import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { JWTAuthGuard } from '@auth/guards/jwt-auth.guard';
import { AddOrderDto } from './dto/add-order.dto';
import { Order } from './entities/order.entity';
import { RolesDecorator } from '@auth/roles.decorator';
import { Roles } from '@common/enums/roles.enum';
import { UpdateStatusOrderDto } from './dto/update-status-order.dto';
import { Status } from '@common/enums/status.enum';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    @UseGuards(JWTAuthGuard)
    @Get('order/:id')
    async addOrder(@Param() { id }: AddOrderDto, @Request() req): Promise<Order>
    {
        const userId = req.user.userId;
        const productId = +id;
        return await this.orderService.addOrder(productId, userId);
    }

    @UseGuards(JWTAuthGuard)
    @Get('orders')
    async findOrders(@Request() req): Promise<Order>
    {
        const userId = req.user.userId;
        return await this.orderService.findOrder(userId);
    }

    @UseGuards(JWTAuthGuard)
    @Get('is-order/:id')
    async isOrder(@Param() { id }: AddOrderDto)
    {
        const order = +id;
        return await this.orderService.isOrderUser(order);
    }

    @UseGuards(JWTAuthGuard)
    @RolesDecorator(Roles.ADMIN)
    @Get('is-orders')
    async isAllOrders()
    {
        return await this.orderService.findOneOrder({isOrder: true, isStatus: Status.Undefined});
    }

    @UseGuards(JWTAuthGuard)
    @RolesDecorator(Roles.ADMIN)
    @Get(':orderId/:status')
    async isStatus(@Param() {orderId, status}: UpdateStatusOrderDto )
    {
        const id = +orderId;
        return await this.orderService.adminIsStatus(id, status);
    }

}
