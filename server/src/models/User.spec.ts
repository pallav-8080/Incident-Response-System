import * as TestDatabase from '../utils/TestDatabase'
import User from './User'

describe('User model', () => {
  beforeAll(TestDatabase.connect)

  const createTestUser = async (username: string, password: string) => {
    const rawUser = await new User({
      username,
      password,
    })

    return rawUser.save()
  }

  it("will encrypt user's password", async () => {
    const rawUser = await createTestUser('User-1', 'password')

    expect(rawUser.password).toBeDefined()
    expect(rawUser.password).not.toEqual('password')
  })

  it('will hide passwords and versions in queries', async () => {
    const users = await User.find().exec()

    expect(users.length).toBe(1)

    const user = users[0]

    expect(user.password).not.toBeDefined()
    expect(user.__v).not.toBeDefined()
  })

  it('compares clear-text password with encrypted password', async () => {
    const rawUser = await createTestUser('User-2', 'password')

    expect(await rawUser.comparePassword('some random string')).toBeFalsy()
    expect(await rawUser.comparePassword('password')).toBeTruthy()
  })

  afterAll(TestDatabase.close)
})
