import { ConfigService } from '@nestjs/config';

export const config = new ConfigService();

export default () => ({
  appSecret: config.get<string>('APP_SECRET_TOKEN'),
});
