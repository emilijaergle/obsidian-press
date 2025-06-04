<template>
  <div class="tag-filter">
    <h3>Filtrēt pēc taga:</h3>
    <div class="tags">
      <button
        v-for="tag in uniqueTags"
        :key="tag"
        :class="{ active: selectedTag === tag }"
        @click="selectTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
    <ul class="articles">
      <li
        v-for="page in filteredPages"
        :key="page.title"
      >
        <a :href="page.url">{{ page.title }}</a>
        <span class="tags">({{ page.tags.join(', ') }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const pages = ref([])
const selectedTag = ref('')

onMounted(async () => {
  const res = await fetch('/microbio/tagged-pages.json')
  pages.value = await res.json()
})

const uniqueTags = computed(() => {
  const all = pages.value.flatMap(p => p.tags || [])
  return [...new Set(all)].sort()
})

const filtered = computed(() => {
  if (!selectedTag.value) return pages.value
  return pages.value.filter(p => p.tags?.includes(selectedTag.value))
})
</script>

<style scoped>
.tag-filter {
  margin: 2rem 0;
}
.tags button {
  margin: 0.25rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  background: #eee;
  cursor: pointer;
}
.tags button.active {
  background: #333;
  color: white;
}
.articles {
  margin-top: 1rem;
}
.articles li {
  margin-bottom: 0.5rem;
}
</style>