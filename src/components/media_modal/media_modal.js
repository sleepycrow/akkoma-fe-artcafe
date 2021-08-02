import StillImage from '../still-image/still-image.vue'
import VideoAttachment from '../video_attachment/video_attachment.vue'
import Modal from '../modal/modal.vue'
import PinchZoom from '../pinch_zoom/pinch_zoom.vue'
import SwipeClick from '../swipe_click/swipe_click.vue'
import GestureService from '../../services/gesture_service/gesture_service'
import Flash from 'src/components/flash/flash.vue'
import Vuex from 'vuex'
import fileTypeService from '../../services/file_type/file_type.service.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronLeft,
  faChevronRight,
  faCircleNotch
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faChevronLeft,
  faChevronRight,
  faCircleNotch
)

const onlyXAxis = ([x, y]) => [x, 0]
const SCALING_RESET_MIN = 1.1
const SCALING_ENABLE_MOVE_THRESHOLD = 1

const MediaModal = {
  components: {
    StillImage,
    VideoAttachment,
    PinchZoom,
    SwipeClick,
    Modal,
    Flash
  },
  data () {
    return {
      loading: false,
      swipeDirection: GestureService.DIRECTION_LEFT,
      swipeThreshold: 50
    }
  },
  computed: {
    showing () {
      return this.$store.state.mediaViewer.activated
    },
    media () {
      return this.$store.state.mediaViewer.media
    },
    description () {
      return this.currentMedia.description
    },
    currentIndex () {
      return this.$store.state.mediaViewer.currentIndex
    },
    currentMedia () {
      return this.media[this.currentIndex]
    },
    canNavigate () {
      return this.media.length > 1
    },
    type () {
      return this.currentMedia ? this.getType(this.currentMedia) : null
    },
    scaling () {
      return this.$store.state.mediaViewer.swipeScaler.scaling
    },
    offsets () {
      return this.$store.state.mediaViewer.swipeScaler.offsets
    },
    transform () {
      return `translate(${this.offsets[0]}px, ${this.offsets[1]}px) scale(${this.scaling}, ${this.scaling})`
    }
  },
  created () {
    // this.mediaGesture = new GestureService.SwipeAndScaleGesture({
    //   callbackPositive: this.goNext,
    //   callbackNegative: this.goPrev,
    //   swipePreviewCallback: this.handleSwipePreview,
    //   swipeEndCallback: this.handleSwipeEnd,
    //   pinchPreviewCallback: this.handlePinchPreview,
    //   pinchEndCallback: this.handlePinchEnd
    // })
  },
  methods: {
    getType (media) {
      return fileTypeService.fileType(media.mimetype)
    },
    hide () {
      this.$store.dispatch('closeMediaViewer')
    },
    goPrev () {
      if (this.canNavigate) {
        const prevIndex = this.currentIndex === 0 ? this.media.length - 1 : (this.currentIndex - 1)
        const newMedia = this.media[prevIndex]
        if (this.getType(newMedia) === 'image') {
          this.loading = true
        }
        this.$store.dispatch('setCurrentMedia', newMedia)
        this.$refs.pinchZoom.setTransform({ scale: 1, x: 0, y: 0 })
      }
    },
    goNext () {
      if (this.canNavigate) {
        const nextIndex = this.currentIndex === this.media.length - 1 ? 0 : (this.currentIndex + 1)
        const newMedia = this.media[nextIndex]
        if (this.getType(newMedia) === 'image') {
          this.loading = true
        }
        this.$store.dispatch('setCurrentMedia', newMedia)
        this.$refs.pinchZoom.setTransform({ scale: 1, x: 0, y: 0 })
      }
    },
    onImageLoaded () {
      this.loading = false
    },
    handleSwipePreview (offsets) {
      this.$refs.pinchZoom.setTransform({ scale: 1, x: offsets[0], y: 0 })
    },
    handleSwipeEnd (sign) {
      console.log('handleSwipeEnd:', sign)
      if (sign === 0) {
        this.$refs.pinchZoom.setTransform({ scale: 1, x: 0, y: 0 })
      } else if (sign > 0) {
        this.goNext()
      } else {
        this.goPrev()
      }
    },
    handleKeyupEvent (e) {
      if (this.showing && e.keyCode === 27) { // escape
        this.hide()
      }
    },
    handleKeydownEvent (e) {
      if (!this.showing) {
        return
      }

      if (e.keyCode === 39) { // arrow right
        this.goNext()
      } else if (e.keyCode === 37) { // arrow left
        this.goPrev()
      }
    }
  },
  mounted () {
    window.addEventListener('popstate', this.hide)
    document.addEventListener('keyup', this.handleKeyupEvent)
    document.addEventListener('keydown', this.handleKeydownEvent)
  },
  destroyed () {
    window.removeEventListener('popstate', this.hide)
    document.removeEventListener('keyup', this.handleKeyupEvent)
    document.removeEventListener('keydown', this.handleKeydownEvent)
  }
}

export default MediaModal
