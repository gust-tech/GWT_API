import { Projeto } from './../../projeto/entities/projeto.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_turma"})
export class Turma {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    descricao: string 

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    @ApiProperty()
    isAtivo: string 

    @ApiProperty({type: () => Grupo})
    @ManyToOne(() => Grupo, (grupo) => grupo.turma)
    grupo: Grupo[]
    
    @ApiProperty({type: () => Projeto})
    @ManyToOne(() => Projeto, (projeto) => projeto.turma)
    projeto: Projeto[]
    
    
    
}
