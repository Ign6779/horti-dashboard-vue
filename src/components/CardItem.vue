<template>
    <div
        class="w-[300px] max-w-full h-[400px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-200 
        transform hover:-translate-y-1 hover:shadow-lg"
        @click="goToDetail"
    >
        <img
            :src="imageUrl"
            alt="name"
            class="w-full h-[180px] object-cover bg-gray-200"
            @error="handleImageError"
        />

        <div class="p-4 flex flex-col gap-2 text-left">
        <h3 class="font-bold text-md leading-tight">{{ name }}</h3>
        <p class="text-xs text-gray-500">
            {{ type }}<span v-if="characteristic"> – {{ characteristic }}</span>
        </p>
        <p class="text-sm text-gray-700 line-clamp-4">{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    id: Number,
    name: String,
    type: String,
    characteristic: String,
    description: String,
    image:String
})

const router = useRouter()
const imageUrl = ref(props.image && props.image.trim() !== '' ? props.image : '/placeholder.png')
const placeholder = '/placeholder.png'

const handleImageError = () => {
    console.log('Image not found, using placeholder')
    imageUrl.value = placeholder
}

const goToDetail = () => {
    const baseRoute = props.type?.toLowerCase() ?? 'item'
    router.push(`/${baseRoute}/${props.id}`)
}
</script>

<style scoped>
.line-clamp-4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}
</style>