import { Projeto } from './../../projeto/entities/projeto.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    turmaId: string

    @ApiProperty({ type: () => Projeto})
    @OneToMany(() => Projeto, (projeto) => projeto.grupo)
    projeto: Projeto[]

}
