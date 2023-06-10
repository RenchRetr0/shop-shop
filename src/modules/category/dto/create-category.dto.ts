import { CreateDto } from "@common/dto/base.dto";

export class CreateCategoryDto extends CreateDto
{
    // @IsNotEmpty({ message: 'Category cannot be empty.'})
    // @IsString()
    readonly name: string;
}