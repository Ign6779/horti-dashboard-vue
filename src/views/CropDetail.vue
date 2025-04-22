<template>
    <section class="w-full min-h-screen px-4 md:px-16 py-6">
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-500 mb-6">
            <RouterLink to="/database" class="hover:underline">Crops</RouterLink>
            <span class="mx-1">›</span>
            <span class="font-semibold text-black">{{ crop.name }}</span>
        </nav>

        <!-- Main Content -->
        <div class="flex flex-col md:flex-row gap-12 items-start">
            <!-- Crop Image -->
            <img
                :src="imageUrl"
                alt="Crop image"
                class="w-full md:w-[600px] max-h-[600px] object-cover bg-gray-200 rounded-lg"
                @error="handleImageError"
            />

            <!-- Crop Info -->
            <div class="flex-1">
                <h1 class="text-2xl font-bold mb-2">Name: <span class="font-normal">{{ crop.name }}</span></h1>
                <p class="font-bold">Type: <span class="font-normal">Crop</span></p>
                <p class="mt-4"><span class="font-bold">Description:</span> {{ crop.description || 'No description available.' }}</p>

                <!-- Pests -->
                <h3 class="font-semibold text-md mt-6 mb-2">Pests that affect this crop:</h3>
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

                <!-- Diseases -->
                <h3 class="font-semibold text-md mt-6 mb-2">Diseases that affect this crop:</h3>
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
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'

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
    const { data } = await axios.get(`http://localhost:3000/crops/${id}`)
    crop.value = data
    imageUrl.value = data.image || fallbackImage
  } catch (error) {
    console.error('Failed to fetch crop details:', error)
  }
}

onMounted(fetchCrop)
</script>