import { TimestampEntity } from '@common/interfaces/timestamp.entity';

export interface ProfileProperties extends TimestampEntity {
  firstName: string;
  lastName: string;
  patronym?: string;
  address: string;
  phone: string;
}
