import { Roles } from '@common/enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const RolesDecorator = (...roles: Roles[]) =>
  SetMetadata('roles', roles);
