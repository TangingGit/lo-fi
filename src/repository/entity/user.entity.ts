import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({name : "user_id"})
  userId: number;

  @Column({name : "user_name"})
  username: string;

  @Column({name :"user_password"})
  userPassword: string;
}