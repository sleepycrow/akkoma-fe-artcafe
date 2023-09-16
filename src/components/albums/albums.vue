<template>
  <div class="Albums panel panel-default">
    <div class="panel-heading">
      <div class="title">
        {{ $t('albums.albums') }}
      </div>
      <router-link
        :to="{ name: 'albums-new' }"
        class="button-default btn new-album-button"
      >
        {{ $t("albums.new") }}
      </router-link>
    </div>

    <div class="panel-body">
      <AlbumsCard
        v-for="album in albums.slice().reverse()"
        :key="album"
        :album="album"
        class="album-item"
      />
    </div>
  </div>
</template>

<script src="./albums.js"></script>

<style lang="scss">
.Albums {
  .new-album-button {
    padding: 0 0.5em;
  }
}
</style>
