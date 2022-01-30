import supertest from 'supertest';
import { UserClass } from '../../models/user';
import { server } from '../../server';

const request = supertest(server);
const Userstore = new UserClass();
const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoic2FtIiwibGFzdF9uYW1lIjoiaHVudGVyIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDFoNUszeDIzZE5XUWt2V0F1NC53YXV6czBzcW5XQmN2cGJFL21NNHhVWUp5WEFUQWpUUkFhIn0sImlhdCI6MTY0MjI3MDY4Mn0.b8kt3Yn1sCdn_wc7uO5Ae1OLzQwzmBy9BdYqkLYwARg';

describe('Test User handler endpoint responses', () => {
  afterAll(async () => {
    await Userstore.deleteUser(1);
  });

  it('should create new user api endpoint', async () => {
    const res = await request.post('/users').send({
      first_name: 'sam',
      last_name: 'hunter',
      password_digest: 'password123'
    });

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined;
  });

  it('shuold get all users api endpoint', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body[0].id).toEqual(2);
    expect(res.body[0].first_name).toEqual('sam');
    expect(res.body[0].last_name).toEqual('hunter');
    expect(res.body[0].password_digest.length).toBeGreaterThanOrEqual(60);
  });

  it('should get the correct user by id api endpoint', async () => {
    const res = await request
      .get('/users/2')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(2);
    expect(res.body.first_name).toEqual('sam');
    expect(res.body.last_name).toEqual('hunter');
    expect(res.body.password_digest.length).toBeGreaterThanOrEqual(60);
  });

  it('should edit the correct user by id api endpoint', async () => {
    const res = await request
      .put('/users/2')
      .set('Authorization', 'Bearer ' + token)
      .send({
        first_name: 'roberto',
        last_name: 'poliziano',
        password_digest: 'newpassword123'
      });
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(2);
    expect(res.body.first_name).toEqual('roberto');
    expect(res.body.last_name).toEqual('poliziano');
    expect(res.body.password_digest.length).toBeGreaterThanOrEqual(60);
  });

  it('should delete the correct user by id api endpoint', async () => {
    const res = await request
      .delete('/users/2')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(2);
    expect(res.body.first_name).toEqual('roberto');
    expect(res.body.last_name).toEqual('poliziano');
    expect(res.body.password_digest.length).toBeGreaterThanOrEqual(60);
  });
});
