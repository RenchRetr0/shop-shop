import { IsNotEmpty, IsString } from "class-validator";

export class FindByCategoryDto
{
    @IsNotEmpty()
    @IsString()
    readonly name!: string;
}