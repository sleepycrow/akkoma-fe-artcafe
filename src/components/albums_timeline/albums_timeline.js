import { mapState } from 'vuex'
import Timeline from '../timeline/timeline.vue'

const AlbumsTimeline = {
  data () {
    return {
      albumId: null,
      albumData: null,
      error: null,
      loading: true,
      footerRef: null
    }
  },
  components: {
    Timeline
  },
  computed: {
    timeline () { return this.$store.state.statuses.timelines.album },
    albumTitle () { return this.albumData ? this.albumData.title : '' },
    ...mapState({
      backendInteractor: state => state.api.backendInteractor
    })
  },
  watch: {
    $route: function (route) {
      if (route.name === 'albums-timeline' && route.params.id !== this.albumId) {
        this.albumId = route.params.id

        this.$store.dispatch('stopFetchingTimeline', 'album')
        this.$store.commit('clearTimeline', { timeline: 'album' })

        this.loadAlbumData(this.albumId)
        this.$store.dispatch('startFetchingTimeline', { timeline: 'album', albumId: this.albumId })
      }
    }
  },
  created () {
    this.albumId = this.$route.params.id
    this.loadAlbumData(this.albumId)
    this.$store.dispatch('startFetchingTimeline', { timeline: 'album', albumId: this.albumId })
  },
  unmounted () {
    this.$store.dispatch('stopFetchingTimeline', 'album')
    this.$store.commit('clearTimeline', { timeline: 'album' })
  },
  methods: {
    setFooterRef (el) {
      this.footerRef = el
    },
    loadAlbumData (albumId) {
      this.loading = true
      this.error = null
      this.albumData = null

      this.backendInteractor.getAlbum({ albumId })
        .then(albumData => {
          if (albumData.error) {
            throw albumData.error
          }

          this.albumData = albumData
        })
        .catch(error => { this.error = error })
        .then(() => { this.loading = false })
    }
  }
}

export default AlbumsTimeline
