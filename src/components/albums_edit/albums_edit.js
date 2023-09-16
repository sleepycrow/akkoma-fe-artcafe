import { mapGetters } from 'vuex'

const AlbumsNew = {
  data () {
    return {
      title: '',
      titleDraft: '',
      isPublic: true,
      isPublicDraft: true,
      reallyDelete: false
    }
  },
  created () {
    if (!this.id) return
    this.$store.dispatch('updateAlbums')
      .then(() => {
        const album = this.findAlbum(this.id)
        if (!album) {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'albums.err_not_found',
            level: 'error'
          })
          return
        }

        this.title = album.title
        this.titleDraft = this.title

        this.isPublic = album.is_public
        this.isPublicDraft = this.isPublic
      })
      .catch((e) => {
        this.$store.dispatch('pushGlobalNotice', {
          messageKey: 'albums.error',
          messageArgs: [e.message],
          level: 'error'
        })
      })
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapGetters(['findAlbum'])
  },
  methods: {
    updateAlbum () {
      this.$store.dispatch('setAlbum', { albumId: this.id, title: this.titleDraft, isPublic: this.isPublicDraft })
        .then(() => {
          const album = this.findAlbum(this.id)
          if (!album) {
            this.$store.dispatch('pushGlobalNotice', {
              messageKey: 'albums.err_not_found',
              level: 'error'
            })
            return
          }

          this.title = album.title
          this.isPublic = album.is_public
        })
        .catch((e) => {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'albums.error',
            messageArgs: [e.message],
            level: 'error'
          })
        })
    },
    createAlbum () {
      this.$store.dispatch('createAlbum', { title: this.titleDraft, isPublic: this.isPublicDraft })
        .then(({ id }) => {
          this.$router.push({ name: 'albums-timeline', params: { id } })
        })
        .catch((e) => {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'albums.error',
            messageArgs: [e.message],
            level: 'error'
          })
        })
    },
    deleteAlbum () {
      this.$store.dispatch('deleteAlbum', { albumId: this.id })
      this.$router.push({ name: 'albums' })
    }
  }
}

export default AlbumsNew
