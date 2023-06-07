import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotFound extends HttpException {
  constructor() {
    super(
      {
        message: 'Order not found, please try later.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
