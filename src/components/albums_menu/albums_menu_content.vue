<template>
  <ul>
    <NavigationEntry
      v-for="item in albums"
      :key="item.name"
      :show-pin="showPin"
      :item="item"
    />
  </ul>
</template>

<script src="./albums_menu_content.js"></script>
