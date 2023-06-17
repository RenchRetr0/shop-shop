import { Module } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './service/comments.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment])
    ],
    providers: [CommentsService],
    exports: [CommentsService]
})
export class CommentsModule {}
