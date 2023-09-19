<template>
  <Modal
    v-if="isModalOpen"
    class="add-to-album-modal-view"
    @backdropClicked="closeModal"
  >
    <div class="add-to-album-modal-panel panel">
      <div class="panel-heading">
        {{ $t('albums.add_status_to_album', { statusId }) }}
      </div>

      <div class="panel-body">
        <div
          v-if="loading"
          class="centered-loading-spinner"
        >
          <FAIcon
            spin
            icon="circle-notch"
          />
        </div>

        <div
          v-else
          class="add-to-album-form"
        >
          <div
            v-for="album in allAlbums"
            :key="album.id"
            class="album-line input-wrap"
          >
            <input
              :id="album.id"
              type="checkbox"
              :checked="albumMemberships.includes(album.id)"
              @click="(e) => toggleAlbumMembership(album.id)"
            >
            <label :for="album.id">{{ album.title }}</label>
          </div>
        </div>
      </div>

      <div class="panel-footer">
        <button
          class="btn button-default footer-button"
          @click="closeModal"
        >
          {{ $t('general.close') }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script src="./add_to_album_modal.js"></script>

<style lang="scss">
.add-to-album-modal-view {
  align-items: flex-start;
}

.add-to-album-modal-panel {
  flex-shrink: 0;
  margin-top: 25%;
  margin-bottom: 2em;
  width: 100%;
  max-width: 400px;

  @media (orientation: landscape) {
    margin-top: 8%;
  }

  .add-to-album-form {
    padding: 0.5rem;

    input[type="checkbox"] {
      display: none;
    }

    .album-line {
      margin: 0.75rem 0;
    }
  }
}
</style>
