import { mapGetters } from 'vuex'

const AlbumsNew = {
  data () {
    return {
      title: '',
      titleDraft: '',
      description: '',
      descriptionDraft: '',
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

        this.description = album.description
        this.descriptionDraft = this.description

        this.isPublic = album.is_public
        this.isPublicDraft = this.isPublic
      })
      .catch((e) => {
        this.$store.dispatch('pushGlobalNotice', {
          messageKey: 'general.generic_error_message',
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
      const payload = {
        albumId: this.id,
        title: this.titleDraft,
        description: this.descriptionDraft,
        isPublic: this.isPublicDraft
      }

      this.$store.dispatch('setAlbum', payload)
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
          this.description = album.description
          this.isPublic = album.is_public
        })
        .catch((e) => {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'general.generic_error_message',
            messageArgs: [e.message],
            level: 'error'
          })
        })
    },
    createAlbum () {
      const payload = {
        title: this.titleDraft,
        description: this.descriptionDraft,
        isPublic: this.isPublicDraft
      }

      this.$store.dispatch('createAlbum', payload)
        .then(({ id }) => {
          this.$router.push({ name: 'albums-timeline', params: { id } })
        })
        .catch((e) => {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'general.generic_error_message',
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
