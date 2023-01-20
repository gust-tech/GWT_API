import { Turma } from './../../turma/entities/turma.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grupo } from '../../grupopi/entities/grupo.entity';

@Entity({name: "tb_projeto"})
export class Projeto {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    nomeProjeto: string 

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    logoProjeto: string

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    linkProjeto: string 

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    pitProjeto: string 

    @IsNotEmpty()
    @Column({nullable:false})
    @ApiProperty()
    grupoId: number

    @ApiProperty({ type: () => Turma})
    @ManyToOne(() => Turma, (turma) => turma.projeto, {
        onDelete: "CASCADE"
    })
    turma: Turma


    @ApiProperty({type: () => Grupo})
    @ManyToOne(() => Grupo, (grupo) => grupo.projeto, {
        onDelete: "CASCADE"
    })
    grupo: Grupo
    
}
