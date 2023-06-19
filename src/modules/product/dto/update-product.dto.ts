export class updateProductDto 
{
    readonly name: string;
    readonly countre: string;
    readonly description: string;
    readonly categoryId: number;
    readonly count: number;
    readonly price: number;
    link: string
}

export class FindByIdDto {
    readonly productId!: string;
}