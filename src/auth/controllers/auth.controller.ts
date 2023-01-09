import {Body, Controller, HttpStatus, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger/dist";
import { EquipeLogin } from "../entities/grupologin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../service/auth.service";

@ApiTags('Grupo')
@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: GrupoLogin): Promise<any> {
        return this.authService.login(user)
    }


}
