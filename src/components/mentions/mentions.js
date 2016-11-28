import Status from '../status/status.vue'
// Temporary
import { prepareStatus } from '../../modules/statuses.js'
import { map } from 'lodash'

const Mentions = {
  data () {
    return {
      mentions: []
    }
  },
  computed: {
    username () {
      return this.$route.params.username
    }
  },
  components: {
    Status
  },
  created () {
    this.$store.state.api.backendInteractor.fetchMentions({username: this.username})
      .then((mentions) => {
        this.mentions = map(mentions, prepareStatus)
      })
  }
}

export default Mentions