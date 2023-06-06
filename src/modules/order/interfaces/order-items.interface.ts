import { TimestampEntity } from "@common/interfaces/timestamp.entity";

export interface OrderItemsProperties extends TimestampEntity
{
    count: number;
    price: number;
    total: number;
}