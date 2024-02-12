import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn({name : "card_id"})
  cardId?: number;

  @Column({name : "card_title"})
  title?: string;

  @Column({name :"card_desc"})
  desc?: string;

  @Column({name :"user_id"})
  createUser?: string;

  @Column({name :"card_create_date"})
  createDate?: string;

  @Column({name :"card_status"})
  status?: string;

  @Column({name :"card_active"})
  active?: string;
}