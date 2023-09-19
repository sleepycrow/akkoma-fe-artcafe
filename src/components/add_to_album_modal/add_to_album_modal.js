import { mapState } from 'vuex'
import PostStatusForm from '../post_status_form/post_status_form.vue'
import Modal from '../modal/modal.vue'

const AddToAlbumModal = {
  components: {
    PostStatusForm,
    Modal
  },
  data () {
    return {
      loading: false,
      albumMemberships: []
    }
  },
  computed: {
    ...mapState({
      backendInteractor: state => state.api.backendInteractor,
      allAlbums: state => state.albums.allAlbums,
      statusId: state => state.albums.albumAddModalStatusId,
      isModalOpen: state => !!state.albums.albumAddModalStatusId
    })
  },
  watch: {
    statusId () {
      if (this.statusId) {
        this.updateStatusMemberships()
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.dispatch('setAlbumAddModalStatusId', null)
    },
    updateStatusMemberships () {
      this.loading = true
      this.albumMemberships = []

      this.backendInteractor.fetchAlbumsForStatus({ statusId: this.statusId })
        .then(albums => {
          if (albums.error) {
            throw albums.error
          }

          this.albumMemberships = albums.map(album => album.id)
        })
        .catch((e) => {
          this.$store.dispatch('pushGlobalNotice', {
            messageKey: 'general.generic_error_message',
            messageArgs: [e.message],
            level: 'error'
          })
        })
        .then(() => { this.loading = false })
    },
    toggleAlbumMembership (albumId) {
      this.loading = true
      const isAdding = !this.albumMemberships.includes(albumId)
      const modifier = isAdding
        ? this.backendInteractor.addStatusToAlbum
        : this.backendInteractor.removeStatusFromAlbum

      modifier({ albumId, statusId: this.statusId })
        .then(resp => {
          if (resp.error) {
            throw resp.error
          }

          if (isAdding) {
            this.albumMemberships.push(albumId)
          } else {
            this.albumMemberships = this.albumMemberships.filter(album => album !== albumId)
          }
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

export default AddToAlbumModal
