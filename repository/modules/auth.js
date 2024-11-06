import FetchFactory from '../factory'

class AuthModule extends FetchFactory {
  async login(credentials) {
    return this.call('POST', '/api/auth/login', credentials)
  }

  async logout() {
    return this.call('POST', '/api/auth/logout')
  }
}

export default AuthModule