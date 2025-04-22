<template>
    <section class="w-full min-h-screen px-4 md:px-16 py-6">
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
            <span class="mx-1">›</span>
            <span class="font-semibold text-black">{{ disease.name }}</span>
        </nav>
  
      <!-- Layout: image + symptoms on the left, rest on the right -->
      <div class="flex flex-col lg:flex-row gap-12 items-start">
        <!-- LEFT: image + symptoms -->
        <div class="w-full lg:w-[600px]">
          <!-- Image -->
          <img
            :src="imageUrl"
            alt="Disease image"
            class="w-full max-h-[500px] object-cover bg-gray-200 rounded-lg"
            @error="handleImageError"
          />
  
          <!-- Symptoms -->
          <div v-if="disease.symptoms?.length" class="mt-6">
            <h3 class="text-lg font-semibold mb-2">Symptoms by Crop & Part:</h3>
            <ul class="text-sm list-disc list-inside">
              <li v-for="(sym, index) in disease.symptoms" :key="index">
                <strong>{{ sym.crop }}</strong> — <em>{{ sym.cropPart }}</em>: {{ sym.symptom }}
              </li>
            </ul>
          </div>
        </div>
  
        <!-- RIGHT: details + affected crops -->
        <div class="flex-1 w-full">
            <h1 class="text-2xl font-bold mb-2">Name: <span class="font-normal">{{ disease.name }}</span></h1>
            <p class="font-bold">Type: <span class="font-normal">Disease</span></p>
            <p class="font-bold">Family: <span class="font-normal">{{ disease.family || '—' }}</span></p>
            <p class="font-bold">Characteristic: <span class="font-normal">{{ disease.characteristic || '—' }}</span></p>
            <p class="mt-4"><span class="font-bold">Description:</span> {{ disease.description || 'No description available.' }}</p>
  
            <!-- Germination Factors -->
            <div v-if="disease.germinationFactors?.length" class="mt-6">
                <h3 class="font-semibold mb-2">Germination Factors:</h3>
                <ul class="list-disc list-inside text-sm">
                <li v-for="(factor, index) in disease.germinationFactors" :key="index">{{ factor }}</li>
                </ul>
            </div>
  
            <!-- Spreading -->
            <div v-if="disease.spreadingLocation?.length" class="mt-6">
                <h3 class="font-semibold mb-2">Spreading Locations:</h3>
                <ul class="list-disc list-inside text-sm">
                <li v-for="(location, index) in disease.spreadingLocation" :key="index">{{ location }}</li>
                </ul>
            </div>
  
            <!-- Prevention -->
            <div v-if="disease.prevention?.length" class="mt-6">
                <h3 class="font-semibold mb-2">Prevention Methods:</h3>
                <ul class="list-disc list-inside text-sm">
                <li v-for="(method, index) in disease.prevention" :key="index">{{ method }}</li>
                </ul>
            </div>
    
            <!-- Remedy -->
            <div v-if="disease.remedy?.length" class="mt-6">
                <h3 class="font-semibold mb-2">Remedies:</h3>
                <ul class="list-disc list-inside text-sm">
                <li v-for="(remedy, index) in disease.remedy" :key="index">{{ remedy }}</li>
                </ul>
            </div>
  
            <!-- Affected Crops -->
            <div v-if="disease.affectedCrops?.length" class="mt-10">
                <h3 class="font-semibold text-md mt-6 mb-2">Crops affected by this disease:</h3>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 mt-4">
                        <RouterLink
                            :to="`/crop/${crop.id}`"
                            v-for="crop in disease.affectedCrops"
                            :key="crop.id"
                            class="flex flex-col items-center cursor-pointer group"
                        >
                            <!-- Image -->
                            <img
                            :src="crop.image || '/placeholder.png'"
                            alt="Crop Image"
                            class="w-[180px] h-[140px] object-cover rounded-md transition-transform duration-200 group-hover:shadow-md group-hover:scale-105"
                            @error="(e) => e.target.src = '/placeholder.png'"
                            />

                            <!-- Name -->
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
  const disease = ref({})
  const imageUrl = ref('')
  const fallbackImage = '/placeholder.png'
  
  const handleImageError = () => {
    imageUrl.value = fallbackImage
  }
  
  const fetchDisease = async () => {
    try {
      const id = route.params.id
      const { data } = await axios.get(`http://localhost:3000/diseases/${id}`)
      disease.value = data
      imageUrl.value = data.image || fallbackImage
    } catch (error) {
      console.error('Failed to fetch disease details:', error)
    }
  }
  
  onMounted(fetchDisease)
  </script>
  