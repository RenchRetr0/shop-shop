import { HttpException, HttpStatus } from '@nestjs/common';

export class UserWithCurrentEmailAlreadyExists extends HttpException {
  constructor(email: string) {
    super(
      {
        message: `Cannot update email. User with current 'email' already exists: ${email}.`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
