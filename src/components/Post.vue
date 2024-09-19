<script setup lang="ts">

import {IPost} from "../api/postsAPI"

defineProps<{
  post: IPost,
  inPostPage?: boolean
}>()

</script>

<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.body }}</p>
      <RouterLink
          v-if="!inPostPage"
          :to="`/post/${post.id}`"
          class="btn btn-primary"
      >
        Go to post
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>