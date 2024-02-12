import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class CardHistory {
  @PrimaryGeneratedColumn({name : "card_history_id"})
  cardHistoryId?: number;

  @Column({name : "card_id"})
  cardId: number;

  @Column({name : "card_history_date"})
  cardHistoryDate: Date;

  @Column({name : "card_history_desc"})
  cardDesc: string;

  @Column({name : "card_history_title"})
  cardTitle: string;

  @Column({name : "card_history_status"})
  cardStatus: string;

  @Column({name : "user_id"})
  userId: number;
}