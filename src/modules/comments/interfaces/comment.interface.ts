import { TimestampEntity } from "@common/interfaces/timestamp.entity";

export interface CommentProperties extends TimestampEntity
{
    comment: string;
}