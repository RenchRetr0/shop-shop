import { HttpException, HttpStatus } from '@nestjs/common';
import { Order } from '../entities/order.entity';

export class ProductOutOfStock extends HttpException {
  constructor(order: Order) {
    super(
      {
        message: 'Товар закончился закончился.',
        order: order,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
