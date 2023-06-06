import { CreateDto } from "@common/dto/base.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class AddOrderDto extends CreateDto
{
    @IsNotEmpty()
    @IsString()
    readonly id: string;
}