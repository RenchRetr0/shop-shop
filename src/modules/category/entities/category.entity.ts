import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoryProperties } from "../interfaces/category.interface";
import { IsNotEmpty, IsString } from "class-validator";

@Entity('category')
export class Category extends BaseEntity implements CategoryProperties
{
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({
        type: 'varchar',
        length: 255
    })
    name!: string;
}