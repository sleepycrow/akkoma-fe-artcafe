import merge from 'lodash.merge'
import objectPath from 'object-path'
import localforage from 'localforage'
import { each } from 'lodash'

let loaded = false

const defaultReducer = (state, paths) => (
  paths.length === 0 ? state : paths.reduce((substate, path) => {
    objectPath.set(substate, path, objectPath.get(state, path))
    return substate
  }, {})
)

const saveImmedeatelyActions = [
  'markNotificationsAsSeen',
  'clearCurrentUser',
  'setCurrentUser',
  'setHighlight',
  'setOption'
]

const defaultStorage = (() => {
  return localforage
})()

export default function createPersistedState ({
  key = 'vuex-lz',
  paths = [],
  getState = (key, storage) => {
    let value = storage.getItem(key)
    return value
  },
  setState = (key, state, storage) => {
    if (!loaded) {
      console.log('waiting for old state to be loaded...')
      return Promise.resolve()
    } else {
      return storage.setItem(key, state)
    }
  },
  reducer = defaultReducer,
  storage = defaultStorage,
  subscriber = store => handler => store.subscribe(handler)
} = {}) {
  return store => {
    getState(key, storage).then((savedState) => {
      try {
        if (typeof savedState === 'object') {
          // build user cache
          const usersState = savedState.users || {}
          usersState.usersObject = {}
          const users = usersState.users || []
          each(users, (user) => { usersState.usersObject[user.id] = user })
          savedState.users = usersState

          store.replaceState(
            merge({}, store.state, savedState)
          )
        }
        if (store.state.config.customTheme) {
          // This is a hack to deal with async loading of config.json and themes
          // See: style_setter.js, setPreset()
          window.themeLoaded = true
          store.dispatch('setOption', {
            name: 'customTheme',
            value: store.state.config.customTheme
          })
        }
        if (store.state.users.lastLoginName) {
          store.dispatch('loginUser', {username: store.state.users.lastLoginName, password: 'xxx'})
        }
        loaded = true
      } catch (e) {
        console.log("Couldn't load state")
        console.error(e)
        loaded = true
      }
    })

    subscriber(store)((mutation, state) => {
      try {
        if (saveImmedeatelyActions.includes(mutation.type)) {
          setState(key, reducer(state, paths), storage)
            .then(success => {
              if (typeof success !== 'undefined') {
                if (mutation.type === 'setOption') {
                  store.dispatch('settingsSaved', { success })
                }
              }
            }, error => {
              if (mutation.type === 'setOption') {
                store.dispatch('settingsSaved', { error })
              }
            })
        }
      } catch (e) {
        console.log("Couldn't persist state:")
        console.log(e)
      }
    })
  }
}
