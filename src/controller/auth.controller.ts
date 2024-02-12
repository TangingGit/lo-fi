import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async auth(@Body() authRequest: Record<string, any>) {
        return await this.authService.signIn(authRequest.username, authRequest.password);
    }
}
