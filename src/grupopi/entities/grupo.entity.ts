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

    @IsEmail()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    maisInfos: string 

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false})
    @ApiProperty()
    turmaId: string

}