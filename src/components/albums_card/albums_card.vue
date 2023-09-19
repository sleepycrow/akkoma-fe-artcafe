<template>
  <div class="album-card">
    <router-link
      :to="{ name: 'albums-timeline', params: { id: album.id } }"
      class="album-link"
    >
      <div class="album-title">{{ album.title }}</div>
      <div class="album-description">{{ album.description }}</div>
      <div class="album-author">
        <img
          :src="album.account.avatar"
          :alt="album.account.acct"
        >
        {{ ' ' }}
        {{ album.account.acct }}
      </div>
    </router-link>

    <router-link
      v-if="isOwnedByCurrentUser(album)"
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

.album-link {
  flex-grow: 1;

  .album-title {
    font-size: 1.5rem;
  }

  .album-description,
  .album-author {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $fallback--lightText;
  }

  .album-description {
    margin: 0.5rem 0;
  }

  .album-author img {
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
    border-radius: 50%;
  }
}

.album-link,
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

.button-album-edit {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
