import { TimestampEntity } from '@common/interfaces/timestamp.entity';

export interface UserProperties extends TimestampEntity {
  email: string;
  password: string;
}
