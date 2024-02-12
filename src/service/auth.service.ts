import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repository/user.repository';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository
      ) {}

    async signIn(
        username: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOneByUsername(username);
        if (user?.userPassword !== password) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username, userId: user.userId };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }


    async decodeJWT(
      auth: string,
    ): Promise<{ userId: string }> {
      const jwt = auth.replace('Bearer ', '');
      return this.jwtService.decode(jwt, { json: true });
    }
}
