import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { UserModule } from '@user/user.module';
import { ProductModule } from '../product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './service/order.service';
import { OrderItem } from './entities/order-items.entity';

@Module({
  imports: [
    UserModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, OrderItem])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
