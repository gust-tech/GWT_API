import { Grupo } from './../entities/grupo.entity';
import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class GrupoService {
    constructor(
        @InjectRepository(Grupo)
        private grupoRepository: Repository<Grupo>
    ) { }

    async findByNumero(numeroGrupo: string): Promise<Grupo| undefined> {
        return await this.grupoRepository.findOne({
            where: {
                numeroGrupo: ILike(`%${numeroGrupo}%`)
            }
        })
    }


    async findAll(): Promise<Grupo[]> {
        return await this.grupoRepository.find({
            relations: {
                projeto: true
            }
        })
    }

    async findById(id: number): Promise<Grupo> {
        let usuario = await this.grupoRepository.findOne({
            where: {
                id
            },
            relations: {
                projeto: true
            }
        })

        if (!usuario)
            throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND)

        return usuario
    }

    async create(grupo: Grupo): Promise<Grupo> {
        return await this.grupoRepository.save(grupo)
    }

    async update(grupo: Grupo): Promise<Grupo> {
        let buscarGrupo= await this.findById(grupo.id)

        if (!buscarGrupo || !buscarGrupo.id)
            throw new HttpException('Grupo não existe', HttpStatus.NOT_FOUND)

        return await this.grupoRepository.save(grupo)
    }


    async delete(id: number): Promise<DeleteResult> {
        let buscarGrupo = await this.findById(id)

        if (!buscarGrupo)
            throw new HttpException('Grupo não encontrado', HttpStatus.NOT_FOUND)

        return await this.grupoRepository.delete(id)
    }

}