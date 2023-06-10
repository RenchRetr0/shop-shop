import { TimestampEntity } from "@common/interfaces/timestamp.entity";

export interface ProductProperties extends TimestampEntity 
{
    name: string;
    countre: string;
    description: string;
    count: number;
    price: number;
}