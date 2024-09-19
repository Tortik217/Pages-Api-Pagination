<script setup lang="ts">

import Post from "../components/Post.vue"
import {computed, onMounted, onUpdated, ref} from "vue"
import {apiPostsGetAll, IPost} from "../api/postsAPI"
import {useRoute, useRouter} from "vue-router"

const route = useRoute()
const router = useRouter()

const postsPerPage = 10
let text = ref('');
const queryPage = computed(() => Number(route.query['p']))
const page = computed(() => isNaN(queryPage.value) ? 1 : queryPage.value)

let allPosts = ref<IPost[]>([])

const filteredPosts = computed(() => {
  return allPosts.value.filter(post =>
    post.title.toLowerCase().includes(text.value.toLowerCase()) ||
    post.body.toLowerCase().includes(text.value.toLowerCase())
  );
});

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

onMounted(async () => {
  try {
    allPosts.value = await apiPostsGetAll()
  } catch (error) {
    console.log('error', error)
  }
})

onUpdated(() => {
  if (page.value < 1 || page.value > totalPages.value) {
    router.push('/?p=1')
  }
})

const paginatedPosts = computed(() => {
  const start = (page.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const showPrevButton = computed(() => page.value > 1)
const showNextButton = computed(() => page.value < totalPages.value)

</script>

<template>
  <div class="header">
    <h1>MainPage</h1>
    <span>page: {{ page }}</span>
    <span>posts per page: {{ postsPerPage }}</span>
    <span>total pages: {{ totalPages }}</span>
    <div style="display: flex; gap: 20px">
      <RouterLink
          v-if="showPrevButton"
          :to='`/?p=${page - 1}`'
          class="btn btn-primary"
      >
        Prev page
      </RouterLink>

      <RouterLink
          v-if="showNextButton"
          :to="`/?p=${page + 1}`"
          class="btn btn-primary"
      >
        Next page
      </RouterLink>
    </div>
    <div class="input-group flex-nowrap" style="width: 50%;">
      <span class="input-group-text" id="addon-wrapping">Your Search</span>
      <input 
        v-model="text"
        type="text" 
        class="form-control" 
        placeholder="Type your search"
        aria-label="Username" 
        aria-describedby="addon-wrapping">
    </div>
  </div>

  <div class="posts-container">
    <Post v-for="post in paginatedPosts" :key="post.id" :post="post"/>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
}

.posts-container {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: start;
  flex-wrap: wrap;
}

.btn {
  transition: opacity .2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
}
</style>
