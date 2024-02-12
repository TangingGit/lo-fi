import { Controller, Get, Param, Put, UseGuards, Body, Headers} from '@nestjs/common';
import { CardService } from '../service/card.service';
import { AuthGuard } from 'src/guard/authguard';
import { UpdateCardRequest } from 'src/models/request/UpdateCardRequest';
import { GetCardByIdResponse } from 'src/models/response/GetCardByIdResponse';
import { GetCardResponse } from 'src/models/response/GetCardResponse';
import { CommonResponse } from 'src/models/response/CommonResponse';
import { GetCommentCardByIdResponse } from 'src/models/response/GetCommentCardByIdResponse';
import { GetCardHistoryByIdResponse } from 'src/models/response/GetCardHistoryByIdResponse';

@Controller("api/v1/card")
@UseGuards(AuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}
  
  @Get()
  async getCard(): Promise<GetCardResponse> {
    return await this.cardService.getCard();
  }

  @Get(":card_id/id")
  async getCardById(@Param('card_id') cardId: string): Promise<GetCardByIdResponse> {
    return await this.cardService.getCardById(cardId);
  }

  @Get(":card_id/id/comment")
  async getCommentCardById(@Param('card_id') cardId: string): Promise<GetCommentCardByIdResponse> {
    return await this.cardService.getCommentCardById(cardId);
  }

  @Put(":card_id/id/collect")
  async collectCardById(@Param('card_id') cardId: string): Promise<CommonResponse<null>> {
    return await this.cardService.collectCardById(cardId);
  }

  @Put(":card_id/id")
  async updateCardById(@Param('card_id') cardId: string, @Body() updateCardRequest: UpdateCardRequest, @Headers('Authorization') payload: string): Promise<CommonResponse<null>> {
    return await this.cardService.updateCardById(cardId, updateCardRequest, payload);
  }

  @Get(":card_id/id/history")
  async getCardHistoryById(@Param('card_id') cardId: string): Promise<GetCardHistoryByIdResponse> {
    return await this.cardService.getCardHistoryById(cardId);
  }

  
}

