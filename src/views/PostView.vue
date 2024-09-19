<script setup lang="ts">

import {useRoute} from "vue-router"
import {onMounted, ref} from "vue"
import {apiPostById, IPost} from "../api/postsAPI"
import Post from "../components/Post.vue"

const route = useRoute()
const postId = route.params.id

const currentPost = ref<IPost | null>(null)

onMounted(async () => {
  try {
    currentPost.value = await apiPostById({
      id: String(postId)
    })
  } catch (error) {
    console.log('error', error)
  }
})

</script>

<template>
  <div class="post-container">
    <h1>Post Page</h1>
    <Post v-if="currentPost !== null" :post="currentPost" in-post-page/>
    <h1 v-else>Post is loading now...</h1>
  </div>
</template>

<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
</style>