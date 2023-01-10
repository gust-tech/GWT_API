import { Grupo } from './../entities/grupo.entity';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GrupoService } from '../service/grupo.service';

@ApiTags('Grupos')
@Controller('/grupos')
export class GrupoController {
    constructor(private readonly grupoService: GrupoService) { }

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

    @HttpCode(HttpStatus.OK)
    @Put('/atualizar')
    async update(@Body() grupo: Grupo): Promise<Grupo> {
        return this.grupoService.update(grupo)
    }


}