import FetchFactory from '../factory'

class CatsModule extends FetchFactory {
  async getRandomCat() {
    try {
      const response = await this.call(
        'GET',
        '/api/cats/images/search?limit=1'
      )
      
      if (Array.isArray(response) && response.length > 0) {
        return response[0]
      }
      
      throw new Error('Error')
    } catch (error) {
      throw new Error('Failed' + error.message)
    }
  }
}

export default CatsModule