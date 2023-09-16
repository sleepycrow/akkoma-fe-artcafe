<template>
  <div class="panel-default panel AlbumEdit">
    <div
      ref="header"
      class="panel-heading album-edit-heading"
    >
      <button
        class="button-unstyled go-back-button"
        @click="$router.back"
      >
        <FAIcon
          size="lg"
          icon="chevron-left"
        />
      </button>
      <div class="title">
        <i18n-t
          v-if="id"
          keypath="albums.edit_album"
        >
          <template #albumTitle>
            {{ title }}
          </template>
        </i18n-t>
        <i18n-t
          v-else
          keypath="albums.new"
        />
      </div>
    </div>

    <div class="panel-body">
      <div class="input-wrap">
        <label for="album-edit-title">{{ $t('albums.title') }}</label>
        {{ ' ' }}
        <input
          id="album-edit-title"
          ref="title"
          v-model="titleDraft"
        >
      </div>

      <div class="input-wrap">
        <label for="album-edit-description">{{ $t('albums.description') }}</label>
        <br>
        <textarea
          id="album-edit-description"
          ref="description"
          v-model="descriptionDraft"
          class="description-textarea"
        />
      </div>

      <div class="input-wrap">
        <label for="album-edit-is-public">{{ $t('albums.is_public') }}</label>
        {{ ' ' }}
        <input
          id="album-edit-is-public"
          ref="isPublic"
          v-model="isPublicDraft"
          type="checkbox"
        >
      </div>
    </div>

    <div
      v-if="id"
      class="panel-footer"
    >
      <span class="spacer" />
      <template v-if="!reallyDelete">
        <button
          class="btn button-default footer-button"
          @click="updateAlbum"
        >
          {{ $t('albums.save') }}
        </button>
        <button
          class="btn button-default footer-button"
          @click="reallyDelete = true"
        >
          {{ $t('albums.delete') }}
        </button>
      </template>
      <template v-else>
        {{ $t('albums.really_delete') }}
        <button
          class="btn button-default footer-button"
          @click="deleteAlbum"
        >
          {{ $t('general.yes') }}
        </button>
        <button
          class="btn button-default footer-button"
          @click="reallyDelete = false"
        >
          {{ $t('general.no') }}
        </button>
      </template>
    </div>
    <div
      v-else
      class="panel-footer"
    >
      <span class="spacer" />
      <button
        v-if="!id"
        class="btn button-default footer-button"
        @click="createAlbum"
      >
        {{ $t('albums.create') }}
      </button>
    </div>
  </div>
</template>

<script src="./albums_edit.js"></script>

<style lang="scss">
@import "../../variables";

.AlbumEdit {
  --panel-body-padding: 0.5em;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  .album-edit-heading {
    grid-template-columns: auto minmax(50%, 1fr);
  }

  .panel-body {
    overflow: hidden;
    padding: 0 16px;
  }

  .input-wrap {
    margin: 1rem 0;
  }

  .description-textarea {
    width: 100%;
  }

  .go-back-button {
    text-align: center;
    line-height: 1;
    height: 100%;
    align-self: start;
    width: var(--__panel-heading-height-inner);
  }

  .btn {
    margin: 0 0.5em;
  }

  .panel-footer {
    grid-template-columns: minmax(10%, 1fr);

    .footer-button {
      min-width: 9em;
    }
  }
}
</style>
