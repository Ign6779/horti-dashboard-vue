<template>
    <section class="w-full min-h-screen px-4 md:px-16 py-6">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-6">
        <RouterLink :to="{ path: '/database', query: { category: 'Pest' } }" class="hover:underline">Pests</RouterLink>
        <span class="mx-1">›</span>
        <RouterLink
          v-if="pest.characteristic"
          :to="{ path: '/database', query: { category: 'Pest', characteristic: pest.characteristic } }"
          class="capitalize hover:underline"
        >
          {{ pest.characteristic }}
        </RouterLink>
        <span class="mx-1">›</span>
        <span class="font-semibold text-black">{{ pest.name }}</span>
      </nav>
  
      <!-- Layout: image on the left, details on the right -->
      <div class="flex flex-col lg:flex-row gap-12 items-start">
        <!-- LEFT: image -->
        <div class="w-full lg:w-[600px]">
          <img
            :src="imageUrl"
            alt="Pest image"
            class="w-full max-h-[500px] object-cover bg-gray-200 rounded-lg"
            @error="handleImageError"
          />
        </div>
  
        <!-- RIGHT: pest details -->
        <div class="flex-1 w-full">
          <h1 class="text-2xl font-bold mb-2">Name: <span class="font-normal">{{ pest.name }}</span></h1>
          <p class="font-bold">Dutch Name: <span class="font-normal">{{ pest.dutchName || '—' }}</span></p>
          <p class="font-bold">Type: <span class="font-normal">Pest</span></p>
          <p class="font-bold">Family: <span class="font-normal">{{ pest.family || '—' }}</span></p>
          <p class="font-bold">Characteristic: <span class="font-normal">{{ pest.characteristic || '—' }}</span></p>
          <p class="mt-4"><span class="font-bold">Description:</span> {{ pest.description || 'No description available.' }}</p>
          <p class="mt-4"><span class="font-bold">Eggs:</span> {{ pest.eggs || '—' }}</p>
  
          <!-- Prevention -->
          <div v-if="pest.prevention?.length" class="mt-6">
            <h3 class="font-semibold mb-2">Prevention Methods:</h3>
            <ul class="list-disc list-inside text-sm">
              <li v-for="(method, index) in pest.prevention" :key="index">{{ method }}</li>
            </ul>
          </div>
  
          <!-- Remedy -->
          <div v-if="pest.remedy?.length" class="mt-6">
            <h3 class="font-semibold mb-2">Remedies:</h3>
            <ul class="list-disc list-inside text-sm">
              <li v-for="(item, index) in pest.remedy" :key="index">{{ item }}</li>
            </ul>
          </div>
  
          <!-- Affected Crops -->
          <div v-if="pest.affectedCrops?.length" class="mt-10">
            <h3 class="font-semibold text-md mt-6 mb-2">Crops affected by this pest:</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mt-4">
              <RouterLink
                :to="`/crop/${crop.id}`"
                v-for="crop in pest.affectedCrops"
                :key="crop.id"
                class="flex flex-col items-center cursor-pointer group"
              >
                <img
                  :src="crop.image || '/placeholder.png'"
                  alt="Crop Image"
                  class="w-[180px] h-[140px] object-cover rounded-md transition-transform duration-200 group-hover:shadow-md group-hover:scale-105"
                  @error="(e) => e.target.src = '/placeholder.png'"
                />
                <span class="mt-2 text-center text-sm font-medium transition-all duration-200 group-hover:font-bold">
                  {{ crop.name }}
                </span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const pest = ref({})
  const imageUrl = ref('')
  const fallbackImage = '/placeholder.png'
  
  const handleImageError = () => {
    imageUrl.value = fallbackImage
  }
  
  const fetchPest = async () => {
    try {
      const id = route.params.id
      const { data } = await axios.get(`http://localhost:3000/pests/${id}`)
      pest.value = data
      imageUrl.value = data.image || fallbackImage
    } catch (error) {
      console.error('Failed to fetch pest details:', error)
    }
  }
  
  onMounted(fetchPest)
  </script>
  