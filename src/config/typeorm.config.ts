import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Profile } from '@profile/entities/profile.entity';
import { User } from '@user/entities/user.entity';
// import { Photo } from 'src/modules/restaurant/entities/photo.entity';
// import { Reservation } from 'src/modules/restaurant/entities/reservation.entity';
// import { Restaurant } from 'src/modules/restaurant/entities/restaurant.entity';
// import { Table } from 'src/modules/restaurant/entities/table.entity';

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
      entities: [User, Profile],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    };
  },
};
