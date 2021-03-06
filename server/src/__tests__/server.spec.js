import request from 'supertest'
import { app } from '../server'
import { User } from '../resources/user/user.model'
import { newToken } from '../utils/auth'
import mongoose from 'mongoose'

describe('API Authentication:', () => {
  let token
  beforeEach(async () => {
    const user = await User.create({ email: 'a@a.com', password: 'hello' })
    token = newToken(user)
  })

  describe('api auth', () => {
    test('api should be locked down', async () => {
      let response = await request(app).get('/api/blog')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/tag')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/user')
      expect(response.statusCode).toBe(401)
    })

    test('passes with JWT', async () => {
      const jwt = `Bearer ${token}`
      const id = mongoose.Types.ObjectId()
      const results = await Promise.all([
        request(app)
          .get('/api/blog')
          .set('Authorization', jwt),
        request(app)
          .get(`/api/blog/${id}`)
          .set('Authorization', jwt),
        request(app)
          .post('/api/blog')
          .set('Authorization', jwt),
        request(app)
          .put(`/api/blog/${id}`)
          .set('Authorization', jwt),
        request(app)
          .delete(`/api/blog/${id}`)
          .set('Authorization', jwt)
      ])

      results.forEach(res => expect(res.statusCode).not.toBe(401))
    })
  })
})
