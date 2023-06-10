import { User } from "@user/entities/user.entity";
import { Order } from "src/modules/order/entities/order.entity";

export class UserResponseDto {
    user: User;
    order: Order;
    accessToken: string;
}
  