import { Turma } from './../entities/turma.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TurmaService {
    constructor(
        @InjectRepository(Turma)
        private turmaRepository: Repository<Turma>
    ) { }
    
    async findByDescricao(descricao: string): Promise<Turma| undefined> {
        return await this.turmaRepository.findOne({
            where: {
                descricao: ILike(`%${descricao}%`)
            }
        })
    }

    async findAll(): Promise<Turma[]> {
        return await this.turmaRepository.find({
            relations: {
                projeto: true
            }
        })
    }


    async findById(id: number): Promise<Turma> {

        let turma = await this.turmaRepository.findOne({
            where: {
                id
            },
            relations: {
                projeto: true
            }
        })

        if (!turma)
            throw new HttpException('Turma não existe', HttpStatus.NOT_FOUND)

        return turma
    }


    async create(turma: Turma): Promise<Turma> {
        return await this.turmaRepository.save(turma)
    }

    async update(turma: Turma): Promise<Turma> {
        let buscarTurma= await this.findById(turma.id)

        if (!buscarTurma || !buscarTurma.id)
            throw new HttpException('Turma não existe', HttpStatus.NOT_FOUND)

        return await this.turmaRepository.save(turma)
    }


    async delete(id: number): Promise<DeleteResult> {
        let buscarTurma = await this.findById(id)

        if (!buscarTurma)
            throw new HttpException('Turma não encontrada', HttpStatus.NOT_FOUND)

        return await this.turmaRepository.delete(id)
    }

}