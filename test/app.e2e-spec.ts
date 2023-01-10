import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Teste de Módulos', () => {

  let grupoId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'db_genworktable_teste',
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        dropSchema: true
      }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('01 - Deve Cadastrar Grupo', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/grupos/cadastrar')
      .send({
        id: '1',
        numeroGrupo: '1',
        maisInfos: 'Rede Social',
        turmaId: '1'
      });
    expect(201)
    grupoId = resposta.body.id
  })

  it('02 - Não Deve Duplicar o Grupo', async () => {
    return request(app.getHttpServer())
      .post('/grupos/cadastrar')
      .send({
        numeroGrupo: '1',
        maisInfos: 'Rede Social',
        turmaId: '1'
      }),
      expect(400)
  })

  it('03 - Deve Listar Todos os Grupos', async () => {
    return request(app.getHttpServer())
      .get('/grupos/all')
      .send({})
      .expect(200)
  })

  it('04 - Deve Atualizar um Grupo', async () => {
    return request(app.getHttpServer())
      .put('/grupos/atualizar')
      .send({
        numeroGrupo: '1',
        maisInfos: 'E-Commerce',
        turmaId: '1'
      })
      .expect(200)
      .then(resposta =>{
        expect("E-Commerce").toEqual(resposta.body.maisInfos)
      });
  });

  it('05 - Deve Cadastrar Turma', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/turmas/cadastrar')
      .send({
        descricao: 'Taquara',
        isAtivo: 'Sim'
      });
    expect(201)
    grupoId = resposta.body.id
  })

  it('06 - Não Deve Duplicar a Turma', async () => {
    return request(app.getHttpServer())
      .post('/turmas/cadastrar')
      .send({
        descricao: 'Taquara',
        isAtivo: 'Sim'
      }),
      expect(400)
  })

  it('07 - Deve Listar Todas as Turmas', async () => {
    return request(app.getHttpServer())
      .get('/grupos/all')
      .send({})
      .expect(200)
  })

  it('08 - Deve Atualizar uma Turma', async () => {
    return request(app.getHttpServer())
      .put('/turmas/atualizar')
      .send({
        descricao: 'Taquara',
        isAtivo: 'Não'
      })
      .expect(200)
      .then(resposta =>{
        expect("Não").toEqual(resposta.body.isAtivo)
      });
  });

  it('09 - Deve Cadastrar Projeto', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/projetos/cadastrar')
      .send({
        nomeProjeto: 'Lady Debug',
        logoProjeto: 'xxx',
        linkProjeto: 'xxx',
        pitProjeto: 'xxx',
        grupoId: '1'
      });
    expect(201)
    grupoId = resposta.body.id
  })

  it('10 - Não Deve Duplicar o Projeto', async () => {
    return request(app.getHttpServer())
      .post('/projetos/cadastrar')
      .send({
        nomeProjeto: 'Lady Debug',
        logoProjeto: 'xxx',
        linkProjeto: 'xxx',
        pitProjeto: 'xxx',
        grupoId: '1'
      }),
      expect(400)
  })

  it('11 - Deve Listar Todos os Projetos', async () => {
    return request(app.getHttpServer())
      .get('/projetos/all')
      .send({})
      .expect(200)
  })

  it('12 - Deve Atualizar um Projeto', async () => {
    return request(app.getHttpServer())
      .put('/projetos/atualizar')
      .send({
        nomeProjeto: 'Lady Debug',
        logoProjeto: 'xxx',
        linkProjeto: 'yyy',
        pitProjeto: 'xxx',
        grupoId: '1'
      })
      .expect(200)
      .then(resposta =>{
        expect("yyy").toEqual(resposta.body.linkProjeto)
      });
  });

});
