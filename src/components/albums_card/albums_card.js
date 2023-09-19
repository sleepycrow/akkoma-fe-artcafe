import { library } from '@fortawesome/fontawesome-svg-core'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { mapState } from 'vuex'

library.add(faWrench)

const AlbumsCard = {
  props: [
    'album'
  ],
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },
  methods: {
    isOwnedByCurrentUser (album) {
      return this.currentUser && this.currentUser.screen_name === album.account.acct
    }
  }
}

export default AlbumsCard
