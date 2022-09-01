const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')


describe('when is initially 1 user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
  })
})

test('creation succeeds with a fresh username'), async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'thatOneDude',
    name: 'OneDude',
    password: 'whaaat',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()

}