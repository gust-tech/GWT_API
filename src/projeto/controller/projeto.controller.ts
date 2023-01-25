import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { ApiTags } from "@nestjs/swagger/dist";
import { Projeto } from "../entities/projeto.entity";
import { ProjetoService } from "../service/projeto.service";

@ApiTags('Projetos')
@Controller('/projetos')
export class ProjetoController {
    constructor(private readonly projetoService: ProjetoService) { }

    @Get('')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Projeto[]> {
        return this.projetoService.findAll();
    }
  
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Projeto> {
        return this.projetoService.findById(id)
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() projeto: Projeto): Promise<Projeto> {
        return this.projetoService.create(projeto)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() projeto: Projeto): Promise<Projeto> {
        return this.projetoService.update(projeto)
    }


    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.projetoService.delete(id)
    }



}
