import { Turma } from './../../turma/entities/turma.entity';
import { Projeto } from './../../projeto/entities/projeto.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_grupopi"})
export class Grupo {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    numeroGrupo: string

    @Column({length: 255, nullable: false})
    @ApiProperty()
    maisInfos: string 

    @ApiProperty({ type: () => Turma})
    @OneToMany(() => Turma, (turma) => turma.grupo)
    turma: Turma[]
    
    @ApiProperty({ type: () => Projeto})
    @ManyToOne(() => Projeto, (projeto) => projeto.grupo)
    projeto: Projeto[]

}
