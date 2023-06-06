import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { JWTAuthGuard } from '@auth/guards/jwt-auth.guard';
import { AddOrderDto } from './dto/add-order.dto';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    @UseGuards(JWTAuthGuard)
    @Get('order/:id')
    async addOrder(@Param() { id }: AddOrderDto, @Request() req)
    {
        const userId = req.user.userId;
        const productId = +id;
        return await this.orderService.addOrder(productId, userId);
    }

    @UseGuards(JWTAuthGuard)
    @Get('orders')
    async findOrders(@Request() req)
    {
        const userId = req.user.userId;
        return await this.orderService.findOrder(userId);
    }

}
