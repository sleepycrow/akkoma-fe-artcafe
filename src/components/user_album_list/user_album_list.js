import { mapState } from 'vuex'
import AlbumsCard from '../albums_card/albums_card.vue'

const UserAlbumList = {
  props: [
    'userId'
  ],
  data () {
    return {
      loadedUserId: null,
      albums: [],
      error: null,
      loading: true
    }
  },
  components: {
    AlbumsCard
  },
  computed: {
    ...mapState({
      backendInteractor: state => state.api.backendInteractor
    })
  },
  watch: {
    userId: function (userId) {
      if (userId !== this.loadedUserId) {
        this.updateData(userId)
      }
    }
  },
  created () {
    this.updateData(this.userId)
  },
  methods: {
    updateData (userId) {
      this.loading = true
      this.albums = []
      this.error = null
      this.loadedUserId = null

      this.backendInteractor.fetchPublicUserAlbums({ userId })
        .then(albums => {
          if (albums.error) {
            throw albums.error
          }

          this.loadedUserId = userId
          this.albums = albums
        })
        .catch((e) => {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'general.generic_error_message',
            messageArgs: [e.message],
            level: 'error'
          })
        })
        .then(() => { this.loading = false })
    }
  }
}

export default UserAlbumList
