import { Grupo } from './entities/grupo.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bcrypt } from "../auth/bcrypt/bcrypt";
import { GrupoController } from "./controller/grupo.controller";
import { GrupoService } from "./service/grupo.service";

@Module({
    imports: [TypeOrmModule.forFeature([Grupo])],
    providers: [GrupoService, Bcrypt],
    controllers: [GrupoController],
    exports: [GrupoService]

})
export class GrupoModule { }