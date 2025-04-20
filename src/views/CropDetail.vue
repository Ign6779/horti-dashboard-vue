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
                class="w-full md:w-[400px] max-h-[400px] object-cover bg-gray-200 rounded-lg"
                @error="handleImageError"
            />

            <!-- Crop Info -->
            <div class="flex-1">
                <h1 class="text-2xl font-bold mb-2">Name: <span class="font-normal">{{ crop.name }}</span></h1>
                <p class="font-bold">Type: <span class="font-normal">Crop</span></p>
                <p class="mt-4"><span class="font-bold">Description:</span> {{ crop.description || 'No description available.' }}</p>

                <!-- Pests -->
                <div v-if="crop.pests?.length" class="mt-8">
                    <h2 class="text-lg font-semibold mb-2">Pests that affect this crop:</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <div
                        v-for="pest in crop.pests"
                        :key="pest.id"
                        class="flex flex-col items-center text-center"
                        >
                            <img
                                :src="pest.image || fallbackImage"
                                alt="Pest image"
                                class="w-full h-[120px] object-cover rounded bg-gray-200"
                            />
                            <p class="mt-2 text-sm">{{ pest.name }}</p>
                        </div>
                    </div>
                </div>

                <!-- Diseases -->
                <div v-if="crop.diseases?.length" class="mt-8">
                    <h2 class="text-lg font-semibold mb-2">Diseases that affect this crop:</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <div
                        v-for="disease in crop.diseases"
                        :key="disease.id"
                        class="flex flex-col items-center text-center"
                        >
                            <img
                            :src="disease.image || fallbackImage"
                            alt="Disease image"
                            class="w-full h-[120px] object-cover rounded bg-gray-200"
                            />
                            <p class="mt-2 text-sm">{{ disease.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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