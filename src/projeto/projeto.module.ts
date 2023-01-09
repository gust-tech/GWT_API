import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjetoController } from "./controller/projeto.controller";
import { Projeto } from "./entities/projeto.entity";
import { ProjetoService } from "./service/projeto.service";


@Module({
    imports: [TypeOrmModule.forFeature([Projeto])],
    providers:[ProjetoService],
    controllers:[ProjetoController],
    exports: [TypeOrmModule],

})
    export class ProjetoModule { }