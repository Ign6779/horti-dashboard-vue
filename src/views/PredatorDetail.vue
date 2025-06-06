<template>
  <section class="w-full min-h-screen px-4 py-8 max-w-6xl mx-auto">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-6">
      <RouterLink :to="{ path: '/database', query: { category: 'Predator' } }" class="hover:underline">Predators</RouterLink>
      <span class="mx-1">›</span>
      <RouterLink
        v-if="predator.characteristic"
        :to="{ path: '/database', query: { category: 'Predator', characteristic: predator.characteristic } }"
        class="capitalize hover:underline"
      >
        {{ predator.characteristic }}
      </RouterLink>
      <span v-if="predator.characteristic" class="mx-1">›</span>
      <span class="font-semibold text-black">{{ predator.name }}</span>
    </nav>

    <!-- Main Grid -->
    <div class="grid md:grid-cols-2 gap-10 mb-12 items-start">
      <!-- Predator Image -->
      <img
        :src="imageUrl"
        alt="Predator image"
        class="w-full max-h-[500px] object-cover bg-gray-200 rounded-lg"
        @error="handleImageError"
      />

      <!-- Predator Info -->
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ predator.name }}</h1>
        <div class="flex items-center gap-2 mb-4">
          <span class="inline-block w-fit px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Predator
          </span>
          <span
            v-if="predator.characteristic"
            class="inline-block w-fit px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize"
          >
            {{ predator.characteristic }}
          </span>
        </div>

        <div class="text-sm text-gray-800 leading-relaxed space-y-1">
          <p><strong>Dutch Name:</strong> {{ predator.dutchName || '—' }}</p>
          <p><strong>Family:</strong> {{ predator.family || '—' }}</p>
          <p><strong>Description:</strong> {{ predator.description || 'No description available.' }}</p>
          <p><strong>Eggs:</strong> {{ predator.eggs || '—' }}</p>
        </div>

        <!-- Feed -->
        <div v-if="predator.feed?.length" class="mt-6">
          <h3 class="text-md font-semibold mb-2">Feeds on:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li v-for="(item, index) in predator.feed" :key="index">{{ item }}</li>
          </ul>
        </div>

        <!-- Development Conditions -->
        <div v-if="predator.development" class="mt-6 text-sm text-gray-700">
          <h3 class="text-md font-semibold mb-2">Development Conditions:</h3>
          <p>
            <strong>Temperature:</strong>
            {{ predator.development.minTemp }}°C – {{ predator.development.maxTemp }}°C
          </p>
          <p>
            <strong>Development Time:</strong>
            {{ predator.development.minDevDays }} – {{ predator.development.maxDevDays }} days
          </p>
        </div>
      </div>
    </div>

    <!-- Development Stages -->
    <section v-if="predator.stages?.length" class="mt-12">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Development Stages</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mt-4">
        <div
          v-for="(stage, index) in predator.stages"
          :key="index"
          class="flex flex-col items-center group text-center"
        >
          <img
            :src="stage.image || '/placeholder.png'"
            alt="Stage Image"
            class="w-[180px] h-[140px] object-cover rounded-md transition-transform duration-200 group-hover:shadow-md group-hover:scale-105 bg-white border border-gray-200"
            @error="(e) => e.target.src = '/placeholder.png'"
          />
          <div class="mt-2 text-sm">
            <p class="font-medium group-hover:font-bold">{{ stage.name }}</p>
            <p class="text-xs text-gray-500 italic">{{ stage.color || '—' }}</p>
            <p class="text-xs text-gray-600">
              {{ stage.minLength }} mm<span v-if="stage.minLength !== stage.maxLength"> – {{ stage.maxLength }} mm</span>
            </p>
            <p class="text-xs text-gray-500 mt-1 italic">{{ stage.location }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Targets -->
    <section v-if="predator.targets?.length" class="mt-12">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Targets</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mt-4">
        <div
          v-for="target in predator.targets"
          :key="target.id"
          class="flex flex-col items-center group text-center"
        >
          <img
            :src="target.image || '/placeholder.png'"
            alt="Target Image"
            class="w-[180px] h-[140px] object-cover rounded-md transition-transform duration-200 group-hover:shadow-md group-hover:scale-105 bg-white border border-gray-200"
            @error="(e) => e.target.src = '/placeholder.png'"
          />
          <div class="mt-2 text-sm">
            <p class="font-medium group-hover:font-bold">{{ target.name }}</p>
            <p class="text-xs text-gray-500">Stage: {{ target.stage }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { api } from '../services/api.js'

const route = useRoute()
const predator = ref({})
const imageUrl = ref('')
const fallbackImage = '/placeholder.png'

const handleImageError = () => {
  imageUrl.value = fallbackImage
}

const fetchPredator = async () => {
  try {
    const id = route.params.id
    const { data } = await api.get(`/database/predators/${id}`)
    predator.value = data
    imageUrl.value = data.image || fallbackImage
  } catch (error) {
    console.error('Failed to fetch predator details:', error)
  }
}

onMounted(fetchPredator)
</script>
