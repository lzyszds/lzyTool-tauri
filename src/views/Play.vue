<script setup lang='ts'>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
const url = ref(route.query.url as string)
watch(() => {
  return route.query.url
}, (newVal) => {
  url.value = newVal as string
})

</script>

<template>
  <div class="iframe">
    <iframe v-if="url.length >= 0" allowFullScreen='true' width="100%" height="100%"
      sandbox="allow-scripts allow-same-origin" :src="url" />
    <i v-else class="iconfont">&#xe641;</i>
  </div>
</template>

<style lang='scss' scoped>
</style>
