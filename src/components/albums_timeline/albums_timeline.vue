<template>
  <div>
    <div
      v-if="error"
      class="error-box"
    >
      <h3>An error occurred</h3>
      <p>{{ error }}</p>
    </div>

    <h1
      v-if="loading"
      class="loading-text"
    >
      Loading...
    </h1>
    <Timeline
      v-if="!loading && !error"
      :title="albumTitle"
      :timeline="timeline"
      :album-id="albumId"
      :plain-title="albumTitle"
      timeline-name="album"
    />
  </div>
</template>

<script src="./albums_timeline.js"></script>

<style type="text/css">
.error-box{
  border: 1px solid rgba(204, 2, 2, 1);
  background-color: rgba(204, 2, 2, 0.5);
  padding: 6px;
}

.error-box h3 {
  text-align: center;
}

.loading-text {
  text-align: center;
  animation: loading-flashes 1s infinite;
}

@keyframes loading-flashes {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
