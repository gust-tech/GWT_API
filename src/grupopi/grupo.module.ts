import { Grupo } from './entities/grupo.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GrupoController } from "./controller/grupo.controller";
import { GrupoService } from "./service/grupo.service";

@Module({
    imports: [TypeOrmModule.forFeature([Grupo])],
    providers: [GrupoService],
    controllers: [GrupoController],
    exports: [GrupoService]

})
export class GrupoModule { }