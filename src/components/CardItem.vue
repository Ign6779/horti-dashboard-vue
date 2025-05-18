<template>
  <div
    class="w-[300px] max-w-full h-[400px] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg border border-gray-100"
    @click="goToDetail"
  >
    <img
      :src="imageUrl"
      alt="Card image"
      class="w-full h-[180px] object-cover bg-gray-200"
      @error="handleImageError"
    />

    <div class="p-4 flex flex-col gap-2 text-left">
      <!-- Name -->
      <h3 class="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
        {{ name }}
      </h3>

      <!-- Type and Subclass as Pills -->
      <div class="flex items-center gap-2 text-xs">
        <span :class="typePillClasses">
          {{ type }}
        </span>
        <span v-if="characteristic" class="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
          {{ characteristic }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 line-clamp-4">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number,
  name: String,
  type: String,
  characteristic: String,
  description: String,
  image: String
})

const router = useRouter()
const placeholder = '/placeholder.png'
const imageUrl = ref(props.image && props.image.trim() !== '' ? props.image : placeholder)

const handleImageError = () => {
  console.log('Image not found, using placeholder')
  imageUrl.value = placeholder
}

const goToDetail = () => {
  const baseRoute = props.type?.toLowerCase() ?? 'item'
  router.push(`/${baseRoute}/${props.id}`)
}

const typePillClasses = computed(() => {
  const base = 'px-2 py-0.5 rounded-full font-medium capitalize'
  switch (props.type) {
    case 'Crop':
      return `${base} bg-green-100 text-green-800`
    case 'Pest':
      return `${base} bg-red-100 text-red-800`
    case 'Disease':
      return `${base} bg-yellow-100 text-yellow-800`
    case 'Predator':
      return `${base} bg-blue-100 text-blue-800`
    default:
      return `${base} bg-gray-200 text-gray-800`
  }
})
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>
