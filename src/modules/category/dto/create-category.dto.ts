import { CreateDto } from "@common/dto/base.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto extends CreateDto
{
    @IsNotEmpty({ message: 'Category cannot be empty.'})
    @IsString()
    readonly name: string;
}