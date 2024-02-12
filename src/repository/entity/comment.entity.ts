import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({name : "comment_id"})
  commentId: number;

  @Column({name : "user_id"})
  userId: string;

  @Column({name : "card_id"})
  cardId: string;

  @Column({name : "comment_text"})
  commentText: string;

  @Column({name : "comment_date"})
  commentDate: Date;
}