import { Module } from '@nestjs/common';
import { CardController } from './controller/card.controller';
import { CardService } from './service/card.service';
import { CommentController } from './controller/comment.controller';
import { CommentService } from './service/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { User } from './repository/entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { CardRepository } from './repository/card.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/jwt';
import { Card } from './repository/entity/card.entity';
import { Comment } from './repository/entity/comment.entity';
import { CommentRepository } from './repository/comment.repository';
import { CardHistoryRepository } from './repository/cardHistory.repository';
import { CardHistory } from './repository/entity/cardHistory.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Card, Comment, CardHistory]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      username: 'admin',
      password: '1234',
      database: 'robinhood',
      autoLoadEntities: true,
      synchronize: false,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 5,
    }]),
  ],
  controllers: [CardController, AuthController, CommentController],
  providers: [CardService, AuthService, UserRepository, CardRepository, CommentService, CommentRepository, CardHistoryRepository, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },],
})
export class AppModule {
}
