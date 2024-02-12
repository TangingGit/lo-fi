import { Injectable, NotFoundException } from '@nestjs/common';
import { CardRepository } from '../repository/card.repository';
import { UpdateCardRequest } from 'src/models/request/UpdateCardRequest';
import { Card } from 'src/repository/entity/card.entity';
import { CardHistoryRepository } from 'src/repository/cardHistory.repository';
import { AuthService } from './auth.service';
import { GetCardByIdResponse } from 'src/models/response/GetCardByIdResponse';
import Status from 'src/constant/Status';
import { CardInfo } from 'src/models/response/CardInfo';
import { GetCardResponse } from 'src/models/response/GetCardResponse';
import { CommonResponse } from 'src/models/response/CommonResponse';
import { CommentInfo } from 'src/models/response/CommentInfo';
import { GetCommentCardByIdResponse } from 'src/models/response/GetCommentCardByIdResponse';
import { GetCardHistoryByIdResponse } from 'src/models/response/GetCardHistoryByIdResponse';
import { CardHistoryInfo } from 'src/models/response/CardHistoryInfo';

@Injectable()
export class CardService {

  constructor(
    private readonly cardRepository: CardRepository,
    private readonly cardHistoryRepository: CardHistoryRepository,
    private readonly authService: AuthService
  ) {}

  async getCard(): Promise<GetCardResponse> {
    const cardList = await this.cardRepository.findAll()
    return this.buildGetCommentCardResponse(cardList)
  }

  buildGetCommentCardResponse(cardResult: CardInfo []): GetCardResponse{
    let response: GetCardResponse = {
      status: {
        code: Status.SUCCESS
      },
      data: []
    }

    for(let i = 0; i < cardResult.length; i++){
      response.data.push({
        card_title: cardResult[i].card_title,
          card_desc: cardResult[i].card_desc,
          card_create_date: cardResult[i].card_create_date,
          card_status: cardResult[i].card_status,
          card_active: cardResult[i].card_active,
          user_name: cardResult[i].user_name,
      })
    }

    return response
  }

  async getCardById(cardId: string): Promise<GetCardByIdResponse> {
    const cardResult = await this.cardRepository.getCardById(cardId)
    
    if(!cardResult){
      throw new NotFoundException();
    }
    return this.buildGetCardByIdResponse(cardResult)
  }

  buildGetCardByIdResponse(cardResult: CardInfo){
    let response: GetCardByIdResponse = {
      status: {
        code: Status.SUCCESS
      },
      data: {
        card_title: cardResult.card_title,
        card_desc: cardResult.card_desc,
        card_create_date: cardResult.card_create_date,
        card_status: cardResult.card_status,
        card_active: cardResult.card_active,
        user_name: cardResult.user_name,
      }
    }

    return response
  }

  async getCommentCardById(cardId: string): Promise<GetCommentCardByIdResponse> {
    const commentCard = await this.cardRepository.getCommentCardById(cardId)
    return this.buildGetCommentCardByIdResponse(commentCard)
  }

  buildGetCommentCardByIdResponse(commentCardList: CommentInfo []){
    let response: GetCommentCardByIdResponse = {
      status: {
        code: Status.SUCCESS
      },
      data: []
    }

    for(let i = 0; i < commentCardList.length; i++){
      response.data.push({
        comment_id: commentCardList[i].comment_id,
        comment_text: commentCardList[i].comment_text,
        comment_date: commentCardList[i].comment_date,
        user_name: commentCardList[i].user_name
      })
    }
    return response
  }

  async collectCardById(cardId: string): Promise<CommonResponse<null>> {
    await this.cardRepository.collectCardById(cardId)
    return this.successResponse()
  }

  successResponse(){
    let response: CommonResponse<null> = {
      status: {
        code: Status.SUCCESS
      },
      data: null
    }

    return response
  }

  async updateCardById(cardId: string, updateCardRequest : UpdateCardRequest, payload: string): Promise<CommonResponse<null>> {
    const {userId} = await this.authService.decodeJWT(payload)
    const cardInfo = await this.cardRepository.getCardById(cardId)
    await this.updateCardHistory(cardInfo, parseInt(userId))

    const params = this.buildUpdateCardParams(updateCardRequest)
    await this.cardRepository.updateCardById(cardId,params)

    return this.successResponse()
  }

  buildUpdateCardParams(updateCardRequest: UpdateCardRequest): Card {
    let params: Card = {

    }

    if(updateCardRequest.card_desc){
      params = Object.assign({desc: updateCardRequest.card_desc},params)
    }

    if(updateCardRequest.card_title){
      params = Object.assign({title: updateCardRequest.card_title},params)
    }

    if(updateCardRequest.card_status){
      params = Object.assign({status: updateCardRequest.card_status},params)
    }

    return params
  }

  async updateCardHistory(cardInfo, userId: number){
    await this.cardHistoryRepository.insertCardHistory({
      cardId: cardInfo.card_id,
      cardHistoryDate: new Date(),
      cardDesc: cardInfo.card_desc,
      cardTitle: cardInfo.card_title,
      cardStatus: cardInfo.card_status,
      userId: userId
    })
  }


  async getCardHistoryById(cardId: string): Promise<GetCardHistoryByIdResponse> {
    const cardHistory = await this.cardHistoryRepository.getCardHistoryById(cardId)
    return this.buildGetCardHistoryByIdResponse(cardHistory)
  }


  buildGetCardHistoryByIdResponse(cardHistoryList: CardHistoryInfo []){
    let response: GetCardHistoryByIdResponse = {
      status: {
        code: Status.SUCCESS
      },
      data: []
    }

    for(let i = 0; i < cardHistoryList.length; i++){
      response.data.push({
        card_id: cardHistoryList[i].card_id,
        card_history_date: cardHistoryList[i].card_history_date,
        card_history_desc: cardHistoryList[i].card_history_desc,
        card_history_title: cardHistoryList[i].card_history_title,
        card_history_status: cardHistoryList[i].card_history_status,
        card_history_id: cardHistoryList[i].card_history_id,
        user_name: cardHistoryList[i].user_name,
      })
    }
    return response
  }

  
}
