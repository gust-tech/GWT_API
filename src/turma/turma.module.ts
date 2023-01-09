import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TurmaController } from "./controller/turma.controller";
import { Turma } from "./entities/turma.entity";
import { TurmaService } from "./service/turma.service";


@Module({
    imports: [TypeOrmModule.forFeature([Turma])],
    providers:[TurmaService],
    controllers:[TurmaController],
    exports: [TypeOrmModule],

})
    export class TurmaModule { }