<template>
  <main class="w-full min-h-screen px-4 md:px-16 py-6">
    <h1 class="text-4xl font-extrabold text-center text-black-900 mb-10 tracking-tight font-[var(--font-sans)]">Horti Database</h1>
    <h2 class="text-center text-gray-600 text-base font-medium mt-[-30px] mb-5">
      Find information about crops, pests, diseases, and predators
    </h2>

    <!-- Filter and search -->
    <FilterBar
      :searchQuery="searchQuery"
      :selectedCategory="selectedCategory"
      @update:searchQuery="val => searchQuery = val"
      @select-category="selectCategory"
      @select-characteristic="selectCharacteristic"
    />

    <!-- Card grid -->
    <div v-if="loading" class="text-center py-12 text-gray-500">Loading database...</div>
    <div class="w-full flex justify-center">
      <transition-group
        name="fade"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-6 max-w-[1328px] w-full"
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
      </transition-group>
    </div>

    <div v-if="filteredItems.length === 0" class="text-center text-gray-500 mt-8">
      No items match your filters or search.
    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import FilterBar from '../components/FilterBar.vue'
import CardItem from '../components/CardItem.vue'
import { api } from '../services/api.js'

const allItems = ref([])
const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedCharacteristic = ref(null)

const route = useRoute()
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
  if (route.query.characteristic) {
    selectedCharacteristic.value = route.query.characteristic
  }
  fetchData()
})

const endpoints = [
  { url: '/crops', type: 'Crop' },
  { url: '/pests', type: 'Pest' },
  { url: '/diseases', type: 'Disease' },
  { url: '/predators', type: 'Predator' }
]

const selectCategory = (category) => {
  selectedCategory.value = category
  selectedCharacteristic.value = null
}

const selectCharacteristic = ({ category, characteristic }) => {
  selectedCategory.value = category
  selectedCharacteristic.value = characteristic
}

const loading = ref(true)

const fetchData = async () => {
  loading.value = true

  const requests = endpoints.map(({ url }) => api.get(url))
  const responses = await Promise.all(requests)

  const flattened = responses.flatMap((res, i) => {
    const type = endpoints[i].type
    return res.data.map(item => ({ ...item, type }))
  })

  allItems.value = flattened

  loading.value = false
}

const filteredItems = computed(() => {
  return allItems.value.filter(item => {
    const matchesCategory =
      selectedCategory.value === 'All' || item.type === selectedCategory.value

    const matchesCharacteristic =
      !selectedCharacteristic.value || item.characteristic === selectedCharacteristic.value

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    return matchesCategory && matchesCharacteristic && matchesSearch
  })
})
</script>
