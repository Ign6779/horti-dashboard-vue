<template>
  <section class="w-full min-h-screen px-4 md:px-16 py-6">
    <!--Filter & search bar-->
    <div class="flex flex-col md:flex-row items-center justify-between h-[92px] mb-8 gap-4">
      <!-- Filter by category -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-semibold">Categories:</span>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :class="[
            'px-3 py-1 rounded-md text-sm border border-gray-300 transition',
            selectedCategory === category ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Search bar -->
      <div class="relative w-full md:w-64">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
    </div>

    <!--Card grid-->
    <div class="w-full flex justify-center">
      <div
        class="grid gap-x-[16px] gap-y-[25px] max-w-[1328px] w-full"
        style="grid-template-columns: repeat(4, 1fr);"
      >
        <CardItem
          v-for="item in filteredItems"
          :key="`${item.type}-${item.id}`"
          :id="item.id"
          :name="item.name"
          :type="item.type"
          :characteristic="item.characteristic"
          :description="item.description"
          :image="item.image"
        />
      </div>
    </div>
  </section>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import CardItem from '../components/CardItem.vue'
import axios from 'axios'

const allItems = ref([])
const searchQuery = ref('')
const selectedCategory = ref('All')
const categories = ref(['All', 'Crop', 'Pest', 'Disease', 'Predator'])

const endpoints = [
  { url: '/crops', type: 'Crop' },
  { url: '/pests', type: 'Pest' },
  { url: '/diseases', type: 'Disease' },
  { url: '/predators', type: 'Predator' }
]

const selectCategory = (category) => {
  selectedCategory.value = category
}

// Fetching data from multiple endpoints
const fetchData = async () => {
  const requests = endpoints.map(({ url }) => axios.get(`http://localhost:3000${url}`))
  const responses = await Promise.all(requests)

  const flattened = responses.flatMap((res, i) => {
    const type = endpoints[i].type
    return res.data.map(item => ({ ...item, type }))
  })

  allItems.value = flattened
}

onMounted(fetchData)

const filteredItems = computed(() => {
  return allItems.value.filter(item => {
    const matchesCategory = 
      selectedCategory.value === 'All' || item.type === selectedCategory.value
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<script>
export default {
    name: 'Home'
  }
</script>