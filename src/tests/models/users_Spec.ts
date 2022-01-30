import { UserClass } from '../../models/user';

const Userstore = new UserClass();

describe('User model definition check', () => {
  it('should have a getUser method', () => {
    expect(Userstore.getUser).toBeDefined();
  });

  it('should have a createUser method', () => {
    expect(Userstore.createUser).toBeDefined();
  });
  it('should have an authenticate method', () => {
    expect(Userstore.authenticate).toBeDefined();
  });

  it('should have a deleteUser method', () => {
    expect(Userstore.deleteUser).toBeDefined();
  });
});

describe('User model methods check', () => {
  it('should return new user', async () => {
    const result = await Userstore.createUser({
      first_name: 'david',
      last_name: 'adams',
      password_digest: 'password123'
    });
    expect(result.id).toEqual(4);
    expect(result.first_name).toEqual('david');
    expect(result.last_name).toEqual('adams');
    expect(result.password_digest.length).toBeGreaterThanOrEqual(60);
  });

  it('should return the edited user', async () => {
    const result = await Userstore.update({
      id: 4,
      first_name: 'leo',
      last_name: 'ludovico',
      password_digest: 'newpassword123'
    });
    expect(result.first_name).toEqual('leo');
    expect(result.last_name).toEqual('ludovico');
    expect(result.password_digest.length).toBeGreaterThanOrEqual(60);
  });

  it('should return list of users', async () => {
    const result = await Userstore.getUser();
    expect(result[0].id).toEqual(4);
    expect(result[0].first_name).toEqual('leo');
    expect(result[0].last_name).toEqual('ludovico');
    expect(result[0].password_digest.length).toBeGreaterThanOrEqual(60);
    expect(result[0].password_digest).not.toEqual('newpassword123');
  });

  it('should return the correct user by id', async () => {
    const result = await Userstore.show(4);
    expect(result.id).toEqual(4);
    expect(result.first_name).toEqual('leo');
    expect(result.last_name).toEqual('ludovico');
    expect(result.password_digest.length).toBeGreaterThanOrEqual(60);
    expect(result.password_digest).not.toEqual('newpassword123');
  });

  it('should delete the correct user by id using deleteUser', async () => {
    const result = await Userstore.deleteUser(4);
    expect(result.id).toEqual(4);
    expect(result.first_name).toEqual('leo');
    expect(result.last_name).toEqual('ludovico');
    expect(result.password_digest.length).toBeGreaterThanOrEqual(60);
  });
});
