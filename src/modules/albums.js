import { remove, find, findIndex } from 'lodash'

export const defaultState = {
  allAlbums: [],
  albumAddModalStatusId: null
}

export const mutations = {
  setAlbums (state, value) {
    state.allAlbums = value
  },

  setAlbum (state, value) {
    const albumIndex = findIndex(state.allAlbums, album => album.id === value.id)

    if (albumIndex > -1) {
      state.allAlbums[albumIndex] = value
    } else {
      state.allAlbums.push(value)
    }
  },

  deleteAlbum (state, albumId) {
    remove(state.allAlbums, album => album.id === albumId)
  },

  setAlbumAddModalStatusId (state, statusId) {
    state.albumAddModalStatusId = statusId
    console.log(state)
  }
}

const actions = {
  setAlbums ({ commit }, value) {
    commit('setAlbums', value)
  },

  setAlbum ({ rootState, commit }, { albumId, title, description, isPublic }) {
    return rootState.api.backendInteractor.updateAlbum({ albumId, title, description, isPublic })
      .then(album => {
        commit('setAlbum', album)
        return album
      })
  },

  createAlbum ({ rootState, commit }, { title, description, isPublic }) {
    return rootState.api.backendInteractor.createAlbum({ title, description, isPublic })
      .then(album => {
        commit('setAlbum', album)
        return album
      })
  },

  deleteAlbum ({ rootState, commit }, { albumId }) {
    commit('deleteAlbum', albumId)
    return rootState.api.backendInteractor.deleteAlbum({ albumId })
  },

  updateAlbums ({ rootState, commit }) {
    return rootState.api.backendInteractor.fetchAlbums()
      .then(albums => commit('setAlbums', albums))
  },

  setAlbumAddModalStatusId ({ commit }, statusId) {
    commit('setAlbumAddModalStatusId', statusId)
  }
}

export const getters = {
  findAlbum: state => albumId => find(state.allAlbums, album => album.id === albumId)
}

const albums = {
  state: defaultState,
  mutations,
  actions,
  getters
}

export default albums
