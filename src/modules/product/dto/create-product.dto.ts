import { CreateDto } from "@common/dto/base.dto";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateProductDto extends CreateDto
{
    readonly name: string;

    readonly countre: string;

    // @IsNotEmpty({ message: 'Product description cannot be empty.'})
    // @IsString()
    // @MinLength(2)
    readonly description: string;

    // @IsNotEmpty({ message: 'Product category cannot be empty.'})
    // @IsString()
    // @MinLength(2)
    readonly categoryId: number;

    // @IsNotEmpty({ message: 'Product count cannot be empty'})
    // @IsNumber()
    // @MinLength(1)
    readonly count: number;

    // @IsNotEmpty({ message: ''})
    // @IsNumber()
    // @MinLength(1)
    readonly price: number;
}