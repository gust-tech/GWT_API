import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Teste de Módulos Usuario e Auth (e2e)', () => {

  let token: any;
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
        database: 'db_genworktable_test',
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
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ''
      });
    expect(201)
    grupoId = resposta.body.id
  })

  it('02 - Deve Autentificar Grupo (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/auth/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
    expect(200)

    token = resposta.body.token

  })

  it('03 - Não Deve Duplicar o Grupo', async () => {
    return request(app.getHttpServer())
      .post('/grupos/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ''

      })
      .expect(400)
  })

  it('04 - Deve Listar Todos os Grupos', async () => {
    return request(app.getHttpServer())
      .get('/grupos/all')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  })

  it('05 - Deve Atualizar um Grupo', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: grupoId,
        nome: 'Jorginho',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ''
      })
      .expect(200)
      .then(resposta =>{
        expect("Jorginho").toEqual(resposta.body.nome)
      });
  });

});
