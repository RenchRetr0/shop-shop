import { User } from "@user/entities/user.entity";

export class UserResponseDto {
    user: User;
    accessToken: string;
}
  