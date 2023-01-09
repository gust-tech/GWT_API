import { Projeto } from './../../projeto/entities/projeto.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ApiProperty({type: () => Projeto})
    @OneToMany(() => Projeto, (projeto) => projeto.turma)
    projeto: Projeto[]
    
}