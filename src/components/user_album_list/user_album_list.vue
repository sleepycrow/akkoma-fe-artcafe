<template>
  <div
    class="user-album-list"
    role="list"
  >
    <div
      v-if="loading"
      class="centered-loading-spinner"
    >
      <FAIcon spin icon="circle-notch"/>
    </div>

    <AlbumsCard
      v-for="album in albums"
      :key="album"
      :album="album"
      class="album-item"
    />
  </div>
</template>

<script src="./user_album_list.js"></script>

<style lang="scss">
.centered-loading-spinner {
  text-align: center;
  padding: 1rem;
}
</style>
