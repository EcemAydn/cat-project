import { $fetch } from 'ofetch'
import CatsModule from '~/repository/modules/cats'
import AuthModule from '~/repository/modules/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions = {
    baseURL: ''
  }

  const apiFetcher = $fetch.create(fetchOptions)

  const modules = {
    cats: new CatsModule(apiFetcher),
    auth: new AuthModule(apiFetcher)
  }

  return {
    provide: {
      api: modules
    }
  }
})