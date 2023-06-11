export class UpdateStatusOrderDto
{
    orderId: string;
    status: boolean;
}

export class MinesProductDTO
{
    productId: string;
}

export class GetHistoryDTO
{
    role: string;
}

export class ClearOrderDTO
{
    orderId: string;
}