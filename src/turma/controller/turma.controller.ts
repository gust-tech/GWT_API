import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { ApiTags } from "@nestjs/swagger/dist";
import { Turma } from "../entities/turma.entity";
import { TurmaService } from "../service/turma.service";

@ApiTags('Turmas')
@Controller('/turmas')
export class TurmaController {
    constructor(private readonly turmaService: TurmaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Turma[]> {
        return this.turmaService.findAll();
    }
  
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Turma> {
        return this.turmaService.findById(id)
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() turma: Turma): Promise<Turma> {
        return this.turmaService.create(turma)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() turma: Turma): Promise<Turma> {
        return this.turmaService.update(turma)
    }


    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.turmaService.delete(id)
    }



}