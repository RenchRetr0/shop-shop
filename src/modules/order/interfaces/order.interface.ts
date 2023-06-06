import { TimestampEntity } from "@common/interfaces/timestamp.entity";

export interface OrderProperties extends TimestampEntity
{
    price: number;
    isOrder: boolean;
    isConfirm: boolean;
}