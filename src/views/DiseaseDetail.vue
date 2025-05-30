<template>
  <section class="w-full min-h-screen px-4 py-8 max-w-6xl mx-auto">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-6">
      <RouterLink :to="{ path: '/database', query: { category: 'Disease' } }" class="hover:underline">Diseases</RouterLink>
      <span class="mx-1">›</span>
      <RouterLink
        v-if="disease.characteristic"
        :to="{ path: '/database', query: { category: 'Disease', characteristic: disease.characteristic } }"
        class="capitalize hover:underline"
      >
        {{ disease.characteristic }}
      </RouterLink>
      <span v-if="disease.characteristic" class="mx-1">›</span>
      <span class="font-semibold text-black">{{ disease.name }}</span>
    </nav>

    <!-- Main Grid: Image + Info -->
    <div class="grid md:grid-cols-2 gap-10 mb-12 items-start">
      <!-- Disease Image -->
      <div>
        <img
          :src="imageUrl"
          alt="Disease image"
          class="w-full max-h-[500px] object-cover bg-gray-200 rounded-lg"
          @error="handleImageError"
        />

        <!-- Symptoms -->
        <div v-if="disease.symptoms?.length" class="mt-6">
          <h3 class="text-lg font-semibold mb-2">Symptoms by Crop & Part:</h3>
          <ul class="text-sm list-disc list-inside space-y-1 text-gray-800">
            <li v-for="(sym, index) in disease.symptoms" :key="index">
              <strong>{{ sym.crop }}</strong> — <em>{{ sym.cropPart }}</em>: {{ sym.symptom }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Disease Info -->
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ disease.name }}</h1>
        <div class="flex items-center gap-2 mb-4">
          <span class="inline-block w-fit px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Disease
          </span>
          <span
            v-if="disease.characteristic"
            class="inline-block w-fit px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize"
          >
            {{ disease.characteristic }}
          </span>
        </div>

        <div class="text-sm text-gray-800 leading-relaxed space-y-1">
          <p><strong>Family:</strong> {{ disease.family || '—' }}</p>
          <p><strong>Description:</strong> {{ disease.description || 'No description available.' }}</p>
        </div>

        <!-- Germination Factors -->
        <div v-if="disease.germinationFactors?.length" class="mt-6">
          <h3 class="text-md font-semibold mb-2">Germination Factors:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li v-for="(factor, index) in disease.germinationFactors" :key="index">{{ factor }}</li>
          </ul>
        </div>

        <!-- Spreading -->
        <div v-if="disease.spreadingLocation?.length" class="mt-6">
          <h3 class="text-md font-semibold mb-2">Spreading Locations:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li v-for="(location, index) in disease.spreadingLocation" :key="index">{{ location }}</li>
          </ul>
        </div>

        <!-- Prevention -->
        <div v-if="disease.prevention?.length" class="mt-6">
          <h3 class="text-md font-semibold mb-2">Prevention Methods:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li v-for="(method, index) in disease.prevention" :key="index">{{ method }}</li>
          </ul>
        </div>

        <!-- Remedies -->
        <div v-if="disease.remedy?.length" class="mt-6">
          <h3 class="text-md font-semibold mb-2">Remedies:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li v-for="(remedy, index) in disease.remedy" :key="index">{{ remedy }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Affected Crops -->
    <section v-if="disease.affectedCrops?.length">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Crops affected by this disease</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mt-4">
        <RouterLink
          :to="`/crop/${crop.id}`"
          v-for="crop in disease.affectedCrops"
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
import axios from 'axios'
import { api } from '../services/api.js'

const route = useRoute()
const disease = ref({})
const imageUrl = ref('')
const fallbackImage = '/placeholder.png'

const handleImageError = () => {
  imageUrl.value = fallbackImage
}

const fetchDisease = async () => {
  try {
    const id = route.params.id
    const { data } = await api.get(`/database/diseases/${id}`)
    disease.value = data
    imageUrl.value = data.image || fallbackImage
  } catch (error) {
    console.error('Failed to fetch disease details:', error)
  }
}

onMounted(fetchDisease)
</script>
