import FetchFactory from '../factory'

const MOCK_USER = {
  username: 'admin',
  password: 'password'
}

class AuthModule extends FetchFactory {
  async login(credentials) {
    return new Promise((resolve, reject) => {
      if (credentials.username === MOCK_USER.username && 
          credentials.password === MOCK_USER.password) {
        resolve({ token: 'mock_token' })
      } else {
        reject(new Error('Invalid credentials'))
      }
    })
  }

  async logout() {
    return Promise.resolve()
  }
}

export default AuthModule