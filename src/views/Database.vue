<template>
  <section class="w-full min-h-screen px-4 md:px-16 py-6">
    <h1 class="text-3xl font-bold mb-8 text-center">Horti database</h1>

    <!-- Filter and search -->
    <FilterBar
      :searchQuery="searchQuery"
      :selectedCategory="selectedCategory"
      @update:searchQuery="val => searchQuery = val"
      @select-category="selectCategory"
      @select-characteristic="selectCharacteristic"
    />

    <!-- Card grid -->
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
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import FilterBar from '../components/FilterBar.vue'
import CardItem from '../components/CardItem.vue'
import axios from 'axios'

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

const fetchData = async () => {
  const requests = endpoints.map(({ url }) => axios.get(`http://localhost:3000${url}`))
  const responses = await Promise.all(requests)

  const flattened = responses.flatMap((res, i) => {
    const type = endpoints[i].type
    return res.data.map(item => ({ ...item, type }))
  })

  allItems.value = flattened
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
