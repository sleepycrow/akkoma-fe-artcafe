import apiService from '../api/api.service.js'
import { promiseInterval } from '../promise_interval/promise_interval.js'

const fetchAndUpdate = ({ store, credentials }) => {
  return apiService.fetchAlbums({ credentials })
    .then(albums => {
      store.commit('setAlbums', albums)
    }, () => {})
    .catch(() => {})
}

const startFetching = ({ credentials, store }) => {
  const boundFetchAndUpdate = () => fetchAndUpdate({ credentials, store })
  boundFetchAndUpdate()
  return promiseInterval(boundFetchAndUpdate, 240000)
}

const albumsFetcher = {
  startFetching
}

export default albumsFetcher
