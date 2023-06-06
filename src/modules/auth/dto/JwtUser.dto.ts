import { Roles } from '@common/enums/roles.enum';

export class JwtUserDto {
  userId: number;
  role: Roles;
}
