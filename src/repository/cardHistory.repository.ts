import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardHistory } from './entity/cardHistory.entity';
import { CardHistoryInfo } from 'src/models/response/CardHistoryInfo';

@Injectable()
export class CardHistoryRepository {
  constructor(
    @InjectRepository(CardHistory)
    private cardHistoryRepository: Repository<CardHistory>,
  ) {}

  insertCardHistory(params: CardHistory): Promise<any> {
    return this.cardHistoryRepository.save(params)
  }

  getCardHistoryById(cardId: string): Promise<CardHistoryInfo []> {
    return this.cardHistoryRepository.createQueryBuilder("card_history")
    .select(['card_history.*', 'user.user_name'])
    .innerJoin("user","user","card_history.user_id=user.user_id")
    .where("card_history.card_id = :cardId",{cardId})
    .getRawMany()
  }
}