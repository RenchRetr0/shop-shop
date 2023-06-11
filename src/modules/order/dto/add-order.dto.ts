import { CreateDto } from "@common/dto/base.dto";

export class AddOrderDto extends CreateDto
{
    // @IsNotEmpty()
    // @IsString()
    readonly productId: string;
}

export class isOrderDto 
{
    orderId: string;
}