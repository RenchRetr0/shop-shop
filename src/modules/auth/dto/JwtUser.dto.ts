import { Roles } from '@common/enums/roles.enum';

export class JwtUserDto {
  userId: string;
  role: Roles;
}
