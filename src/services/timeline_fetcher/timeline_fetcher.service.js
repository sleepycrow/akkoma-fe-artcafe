import { camelCase } from 'lodash'

import apiService from '../api/api.service.js'
import { promiseInterval } from '../promise_interval/promise_interval.js'

const update = ({ store, statuses, timeline, showImmediately, userId, listId, albumId, pagination }) => {
  const ccTimeline = camelCase(timeline)

  store.dispatch('addNewStatuses', {
    timeline: ccTimeline,
    userId,
    listId,
    albumId,
    statuses,
    showImmediately,
    pagination
  })
}

const fetchAndUpdate = ({
  store,
  credentials,
  timeline = 'friends',
  older = false,
  showImmediately = false,
  userId = false,
  listId = false,
  albumId = false,
  tag = false,
  until,
  since
}) => {
  const args = { timeline, credentials }
  const rootState = store.rootState || store.state
  const { getters } = store
  const timelineData = rootState.statuses.timelines[camelCase(timeline)]
  const { hideMutedPosts, replyVisibility } = getters.mergedConfig
  const loggedIn = !!rootState.users.currentUser

  if (older) {
    args['until'] = until || timelineData.minId
  } else {
    if (since === undefined) {
      args['since'] = timelineData.maxId
    } else if (since !== null) {
      args['since'] = since
    }
  }

  args['userId'] = userId
  args['listId'] = listId
  args['albumId'] = albumId
  args['tag'] = tag
  args['withMuted'] = !hideMutedPosts
  if (loggedIn && ['friends', 'public', 'publicAndExternal', 'bubble'].includes(timeline)) {
    args['replyVisibility'] = replyVisibility
  }

  const numStatusesBeforeFetch = timelineData.statuses.length

  return apiService.fetchTimeline(args)
    .then(response => {
      if (response.errors) {
        throw new Error(`${response.status} ${response.statusText}`)
      }

      const { data: statuses, pagination } = response
      if (!older && statuses.length >= 20 && !timelineData.loading && numStatusesBeforeFetch > 0) {
        store.dispatch('queueFlush', { timeline: timeline, id: timelineData.maxId })
      }
      update({ store, statuses, timeline, showImmediately, userId, listId, pagination })
      return { statuses, pagination }
    })
    .catch((error) => {
      store.dispatch('pushGlobalNotice', {
        level: 'error',
        messageKey: 'timeline.error',
        messageArgs: [error.message],
        timeout: 5000
      })
    })
}

const startFetching = ({ timeline = 'friends', credentials, store, userId = false, listId = false, albumId = false, tag = false }) => {
  const rootState = store.rootState || store.state
  const timelineData = rootState.statuses.timelines[camelCase(timeline)]
  const showImmediately = timelineData.visibleStatuses.length === 0
  timelineData.userId = userId
  timelineData.listId = listId
  timelineData.albumId = albumId
  fetchAndUpdate({ timeline, credentials, store, showImmediately, userId, listId, albumId, tag })
  const boundFetchAndUpdate = () =>
    fetchAndUpdate({ timeline, credentials, store, userId, listId, albumId, tag })
  return promiseInterval(boundFetchAndUpdate, 10000)
}
const timelineFetcher = {
  fetchAndUpdate,
  startFetching
}

export default timelineFetcher
