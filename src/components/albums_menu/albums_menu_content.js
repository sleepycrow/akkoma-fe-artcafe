import { mapState } from 'vuex'
import NavigationEntry from 'src/components/navigation/navigation_entry.vue'
import { getAlbumEntries } from 'src/components/navigation/filter.js'

export const AlbumsMenuContent = {
  props: [
    'showPin'
  ],
  components: {
    NavigationEntry
  },
  computed: {
    ...mapState({
      albums: getAlbumEntries,
      currentUser: state => state.users.currentUser,
      privateMode: state => state.instance.private,
      federating: state => state.instance.federating
    })
  }
}

export default AlbumsMenuContent
