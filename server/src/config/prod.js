export const config = {
  secrets: {
    jwt: 'fr0stf0x'
  },
  db: {
    url: 'mongodb://database:27017',
    options: {
      db: 'blog-system',
      user: 'root',
      pass: '123456'
    }
  }
}
