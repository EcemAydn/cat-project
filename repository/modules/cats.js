import FetchFactory from '../factory'

class CatsModule extends FetchFactory {
  async getRandomCat() {
    return useAsyncData('randomCat', () => {
      return this.call(
        'GET',
        '/api/cats/images/search?limit=1',
        undefined
      )
    })
  }
}

export default CatsModule