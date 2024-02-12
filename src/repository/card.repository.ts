import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entity/card.entity';
import { CardInfo } from 'src/models/response/CardInfo';
import { CommentInfo } from 'src/models/response/CommentInfo';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  findAll(): Promise<CardInfo []> {
    return this.cardRepository.createQueryBuilder("card")
    .select(['card.*', 'user.user_name'])
    .innerJoin("user","user","card.user_id=user.user_id")
    .andWhere("card.card_active = '1'")
    .getRawMany()
  }

  getCardById(cardId: string): Promise<CardInfo> {
    return this.cardRepository.createQueryBuilder("card")
    .select(['card.*', 'user.user_name'])
    .innerJoin("user","user","card.user_id=user.user_id")
    .where("card.card_id = :cardId",{cardId})
    .getRawOne()
  }

  getCommentCardById(cardId: string): Promise<CommentInfo []> {
    return this.cardRepository.createQueryBuilder("card")
    .select(['comment.comment_id','comment.comment_text','comment.comment_date','user.user_name'])
    .innerJoin("comment","comment","card.card_id=comment.card_id")
    .innerJoin("user","user","comment.user_id=user.user_id")
    .where("card.card_id = :cardId",{cardId})
    .getRawMany()
  }

  collectCardById(cardId: string): Promise<any> {
    return this.cardRepository.createQueryBuilder("card")
      .update(Card)
      .set({ active: "0" })
      .where("card.card_id = :cardId",{cardId})
      .execute()
  }

  updateCardById(cardId: string, params: Card): Promise<any> {
    return this.cardRepository.createQueryBuilder("card")
      .update(Card)
      .set(params)
      .where("card.card_id = :cardId",{cardId})
      .execute()
  }
}