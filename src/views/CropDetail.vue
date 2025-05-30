<template>
  <section class="w-full min-h-screen px-4 py-8 max-w-6xl mx-auto">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-6">
      <RouterLink to="/database" class="hover:underline">Crops</RouterLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-black">{{ crop.name }}</span>
    </nav>

    <!-- Top Grid: Image + Info -->
    <div class="grid md:grid-cols-2 gap-10 mb-12 items-start">
      <!-- Crop Image -->
      <img
        :src="imageUrl"
        alt="Crop image"
        class="w-full max-h-[500px] object-cover bg-gray-200 rounded-lg"
        @error="handleImageError"
      />

      <!-- Crop Info -->
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ crop.name }}</h1>
        <span class="inline-block w-fit px-3 py-1 mb-4 rounded-full text-xs font-medium bg-green-100 text-green-700">
        Crop
        </span>
        <p class="text-sm text-gray-700 leading-relaxed">
          {{ crop.description || 'No description available.' }}
        </p>
      </div>
    </div>

    <!-- Pests Section -->
    <section v-if="crop.pests?.length" class="mb-12">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Pests that affect this crop</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mt-4">
        <RouterLink
            :to="`/pest/${pest.id}`"
            v-for="pest in crop.pests"
            :key="pest.id"
            class="flex flex-col items-center cursor-pointer group"
        >
            <!-- Image -->
            <img
            :src="pest.image || '/placeholder.png'"
            alt="Pest Image"
            class="w-[200px] h-[140px] object-cover rounded-md transition-transform duration-200 group-hover:shadow-md group-hover:scale-105"
            @error="(e) => e.target.src = '/placeholder.png'"
            />

            <!-- Name -->
            <span class="mt-2 text-center text-sm font-medium transition-all duration-200 group-hover:font-bold">
            {{ pest.name }}
            </span>
        </RouterLink>
    </div>

    </section>

    <!-- Diseases Section -->
    <section v-if="crop.diseases?.length">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Diseases that affect this crop</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mt-4">
        <RouterLink
            :to="`/disease/${disease.id}`"
            v-for="disease in crop.diseases"
            :key="disease.id"
            class="flex flex-col items-center cursor-pointer group"
        >
            <!-- Image -->
            <img
            :src="disease.image || '/placeholder.png'"
            alt="Disease Image"
            class="w-[180px] h-[140px] object-cover rounded-md transition-transform duration-200 group-hover:shadow-md group-hover:scale-105"
            @error="(e) => e.target.src = '/placeholder.png'"
            />

            <!-- Name -->
            <span class="mt-2 text-center text-sm font-medium transition-all duration-200 group-hover:font-bold">
            {{ disease.name }}
            </span>
        </RouterLink>
    </div>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'
import { api } from '../services/api.js'

const route = useRoute()
const crop = ref({})
const imageUrl = ref('')
const fallbackImage = '/placeholder.png'

const handleImageError = () => {
  imageUrl.value = fallbackImage
}

const fetchCrop = async () => {
  try {
    const id = route.params.id
    const { data } = await api.get(`/crops/${id}`)
    crop.value = data
    imageUrl.value = data.image || fallbackImage
  } catch (error) {
    console.error('Failed to fetch crop details:', error)
  }
}

onMounted(fetchCrop)
</script>
