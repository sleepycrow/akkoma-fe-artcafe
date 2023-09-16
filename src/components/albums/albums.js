import AlbumsCard from '../albums_card/albums_card.vue'

const Albums = {
  data () {
    return {
      isNew: false
    }
  },
  components: {
    AlbumsCard
  },
  created () {
    this.$store.dispatch('startFetchingAlbums')
  },
  computed: {
    albums () {
      return this.$store.state.albums.allAlbums
    }
  },
  methods: {
    cancelNewAlbum () {
      this.isNew = false
    },
    newAlbum () {
      this.isNew = true
    }
  }
}

export default Albums
