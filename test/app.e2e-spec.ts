import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  
  it('/test/any-user (GET)', async () => {
  const loginRes = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: 'password123' })

  const token = loginRes.body.accessToken

  return request(app.getHttpServer())
    .get('/test/any-user')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect({ message: 'Hello Authenticated User!' })
})

});
