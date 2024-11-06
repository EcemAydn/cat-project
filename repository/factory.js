import { $fetch } from 'ofetch'

class FetchFactory {
  constructor(fetcher) {
    this.$fetch = fetcher
  }

  async call(method, url, data, fetchOptions) {
    return this.$fetch(url, {
      method,
      body: data,
      ...fetchOptions
    })
  }
}

export default FetchFactory