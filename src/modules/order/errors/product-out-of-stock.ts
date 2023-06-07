import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductOutOfStock extends HttpException {
  constructor() {
    super(
      {
        message: 'Товар закончился закончился.',
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
