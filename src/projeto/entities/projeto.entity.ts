import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @Column({length: 255, nullable:false})
    @ApiProperty()
    grupoId: string 
}