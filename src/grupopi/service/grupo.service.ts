import { Grupo } from './../entities/grupo.entity';
import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class GrupoService {
    constructor(
        @InjectRepository(Grupo)
        private grupoRepository: Repository<Grupo>,
        private bcrypt: Bcrypt
    ) { }

    async findByGrupo(numeroGrupo: string): Promise<Grupo| undefined> {
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
        let buscarGrupo = await this.findByGrupo(grupo.numeroGrupo)

        if(!buscarGrupo){
            grupo.numeroGrupo = await this.bcrypt.criptografarNumero(grupo.numeroGrupo)
            return await this.grupoRepository.save(grupo)
        }

        throw new HttpException('O grupo já está cadastrado', HttpStatus.BAD_REQUEST)

    }

    async update(grupo: Grupo): Promise<Grupo>{
        let updateGrupo: Grupo = await this.findById(grupo.id)
        let buscarGrupo = await this.findByGrupo(grupo.numeroGrupo)

        if(!updateGrupo)
            throw new HttpException('Grupo não existe', HttpStatus.NOT_FOUND)

        if(buscarGrupo && buscarGrupo.id !== grupo.id)
            throw new HttpException('Grupo já cadastrado', HttpStatus.BAD_REQUEST)

            grupo.numeroGrupo = await this.bcrypt.criptografarNumero(grupo.numeroGrupo)
            return await this.grupoRepository.save(grupo)
    }


}