import { Category } from '@category/entities/category.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { OrderItem } from '@order/entities/order-items.entity';
import { Order } from '@order/entities/order.entity';
import { Product } from '@product/entities/product.entity';
import { Profile } from '@profile/entities/profile.entity';
import { User } from '@user/entities/user.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('APP_DB_HOST'),
      port: configService.get<number>('APP_DB_PORT'),
      username: configService.get<string>('APP_DB_USERNAME'),
      database: configService.get<string>('APP_DB_NAME'),
      password: configService.get<string>('APP_DB_PASSWORD'),
      entities: [User, Profile, Product, Category, Order, OrderItem],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    };
  },
};
