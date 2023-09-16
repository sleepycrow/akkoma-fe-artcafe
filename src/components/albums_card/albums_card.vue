<template>
  <div class="album-card">
    <router-link
      :to="{ name: 'albums-timeline', params: { id: album.id } }"
      class="album-name"
    >
      {{ album.title }}
    </router-link>
    <router-link
      :to="{ name: 'albums-edit', params: { id: album.id } }"
      class="button-album-edit"
    >
      <FAIcon
        class="fa-scale-110 fa-old-padding"
        icon="wrench"
      />
    </router-link>
  </div>
</template>

<script src="./albums_card.js"></script>

<style lang="scss">
@import "../../variables";

.album-card {
  display: flex;
}

.album-name {
  flex-grow: 1;
}

.album-name,
.button-album-edit {
  margin: 0;
  padding: 1em;
  color: $fallback--link;
  color: var(--link, $fallback--link);

  &:hover {
    background-color: $fallback--lightBg;
    background-color: var(--selectedMenu, $fallback--lightBg);
    color: $fallback--link;
    color: var(--selectedMenuText, $fallback--link);

    --faint: var(--selectedMenuFaintText, $fallback--faint);
    --faintLink: var(--selectedMenuFaintLink, $fallback--faint);
    --lightText: var(--selectedMenuLightText, $fallback--lightText);
  }
}
</style>
