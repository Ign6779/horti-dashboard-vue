<template>
  <section class="w-full min-h-screen px-4 py-8 max-w-6xl mx-auto">
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
      <span v-if="pest.characteristic" class="mx-1">›</span>
      <span class="font-semibold text-black">{{ pest.name }}</span>
    </nav>

    <!-- Main Grid: Image + Info -->
    <div class="grid md:grid-cols-2 gap-10 mb-12 items-start">
      <!-- Pest Image -->
      <img
        :src="imageUrl"
        alt="Pest image"
        class="w-full max-h-[500px] object-cover bg-gray-200 rounded-lg"
        @error="handleImageError"
      />

      <!-- Pest Info -->
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ pest.name }}</h1>
        <div class="flex items-center gap-2 mb-4">
          <span class="inline-block w-fit px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            Pest
          </span>
          <span
            v-if="pest.characteristic"
            class="inline-block w-fit px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize"
          >
            {{ pest.characteristic }}
          </span>
        </div>

        <div class="text-sm text-gray-800 leading-relaxed space-y-1">
          <p><strong>Family:</strong> {{ pest.family || '—' }}</p>
          <p><strong>Description:</strong> {{ pest.description || 'No description available.' }}</p>
          <p><strong>Eggs:</strong> {{ pest.eggs || '—' }}</p>
        </div>

        <!-- Prevention -->
        <div v-if="pest.prevention?.length" class="mt-6">
          <h3 class="text-md font-semibold mb-2">Prevention Methods:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li v-for="(method, index) in pest.prevention" :key="index">{{ method }}</li>
          </ul>
        </div>

        <!-- Remedies -->
        <div class="mt-6">
          <h3 class="text-md font-semibold mb-2">Remedies:</h3>
          <ul v-if="pest.remedy?.length" class="list-disc list-inside text-sm text-gray-700">
            <li v-for="(item, index) in pest.remedy" :key="index">{{ item }}</li>
          </ul>
          <p v-else class="text-sm text-gray-600 italic">No remedies known.</p>
        </div>
      </div>
    </div>

    <!-- Pest Development Stages -->
    <div v-if="pest.stages?.length" class="mt-12">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Development Stages</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mt-4">
        <div
          v-for="(stage, index) in pest.stages"
          :key="index"
          class="flex flex-col items-center group text-center"
        >
          <img
            :src="stage.image || '/placeholder.png'"
            alt="Stage Image"
            class="w-[180px] h-[140px] object-cover rounded-md transition-transform duration-200 group-hover:shadow-md group-hover:scale-105"
            @error="(e) => e.target.src = '/placeholder.png'"
          />
          <div class="mt-2 text-sm">
            <p class="font-medium group-hover:font-bold">{{ stage.name }}</p>
            <p class="text-xs text-gray-500 italic">{{ stage.color || '—' }}</p>
            <p class="text-xs text-gray-600">
              {{ stage.minLength }} mm
              <span v-if="stage.minLength !== stage.maxLength">– {{ stage.maxLength }} mm</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Affected Crops -->
    <section v-if="pest.affectedCrops?.length" class="mt-12">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Crops affected by this pest</h2>
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
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { api } from '../services/api.js'

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
    const { data } = await api.get(`/database/pests/${id}`)
    pest.value = data
    imageUrl.value = data.image || fallbackImage
  } catch (error) {
    console.error('Failed to fetch pest details:', error)
  }
}

onMounted(fetchPest)
</script>
