import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { GrupoModule } from './grupopi/grupo.module';
import { ProjetoModule } from './projeto/projeto.module';
import { TurmaModule } from './turma/turma.module';


@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'db_genworktable_teste',
    //   entities: [Postagem, Tema, Usuario],
    //   synchronize: true
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProjetoModule,
    TurmaModule,
    GrupoModule
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule { }
