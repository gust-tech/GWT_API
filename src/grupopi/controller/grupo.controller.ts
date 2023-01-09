import { Grupo } from './../entities/grupo.entity';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuth } from "@nestjs/swagger/dist";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { GrupoService } from '../service/grupo.service';

@ApiTags('Grupos')
@Controller('/grupos')
@ApiBearerAuth()
export class GrupoController {
    constructor(private readonly grupoService: GrupoService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Grupo[]> {
        return this.grupoService.findAll();
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() grupo: Grupo): Promise<Grupo> {
        return this.grupoService.create(grupo);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/atualizar')
    async update(@Body() grupo: Grupo): Promise<Grupo> {
        return this.grupoService.update(grupo)
    }


}