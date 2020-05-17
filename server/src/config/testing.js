export const config = {
  secrets: {
    jwt: 'learneverything'
  },
  db: {
    url: 'mongodb://localhost:27017',
    options: {
      db: 'blog-system-test',
      user: 'root',
      pass: '123456'
    }
  }
}
