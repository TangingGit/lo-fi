import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async remove(commentId: number, userId: string): Promise<DeleteResult> {
    return this.commentRepository.createQueryBuilder("comment")
      .delete()
      .where("comment.comment_id = :commentId",{commentId})
      .andWhere("comment.user_id = :userId",{userId})
      .execute()
  }

  async updateCommentText(commentId: number, commentText: string, userId: string): Promise<any> {
    return this.commentRepository.createQueryBuilder("comment")
      .update(Comment)
      .set({ commentText: commentText, commentDate: new Date() })
      .where("comment.comment_id = :commentId",{commentId})
      .andWhere("comment.user_id = :userId",{userId})
      .execute()
  }
}