<template>
  <section class="w-full min-h-screen px-4 md:px-16 py-6">
    <h1 class="text-3xl font-bold mb-8 text-center">AI Detection</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-[400px]">
      <!-- Upload section -->
      <div class="border rounded-lg p-6 shadow-sm flex flex-col justify-between h-full">
        <div>
          <h2 class="text-lg font-semibold mb-4">Upload Image/Video</h2>

          <div
            class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-[350px] cursor-pointer hover:border-gray-400 transition relative"
            @dragover.prevent
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <input
              type="file"
              accept="image/*,video/*"
              ref="fileInput"
              class="hidden"
              @change="handleFileChange"
            />

            <template v-if="filePreview">
              <img v-if="isImage" :src="filePreview" class="h-[300px] max-w-[100%] object-contain rounded-md mx-auto" />
              <video v-else controls class="h-[300px] max-w-[100%] object-contain rounded-md mx-auto">
                <source :src="filePreview" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </template>

            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l1.414-1.414a2 2 0 012.828 0L12 15l3.758-3.758a2 2 0 012.828 0L20 12m-6-4V4m0 0l-2 2m2-2l2 2" />
              </svg>
              <p class="text-sm text-gray-500 text-center">Drop file here or select file</p>
            </template>
          </div>
        </div>

        <button
          :disabled="!file || loading"
          @click="submitFile"
          class="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {{ loading ? 'Processing...' : 'Process File' }}
        </button>
      </div>

      <!-- Result section -->
      <div class="border rounded-lg p-6 shadow-sm flex flex-col justify-between h-full">
        <div>
          <h2 class="text-lg font-semibold mb-4">Detection Results</h2>

          <div class="flex justify-center items-center mb-4 h-[350px]">
            <div v-if="previewUrl" class="mb-4">
              <img v-if="isImage" :src="previewUrl" class="h-[300px] max-w-[100%] object-contain rounded-md mx-auto" />
              <video v-else controls class="h-[300px] max-w-[100%] object-contain rounded-md mx-auto">
                <source :src="previewUrl" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div v-if="detections.length" class="text-sm text-gray-800">
            <p class="font-semibold">Detected:</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="(label, index) in detections"
                :key="index"
                class="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {{ label }}
              </span>
            </div>
          </div>
          <p v-else class="text-sm text-gray-400">No detections yet.</p>
        </div>
      </div>
    </div>

    <!-- Explanation section -->
    <div class="mt-12">
      <h3 class="text-xl font-semibold mb-2">What does this mean?</h3>
      <p class="text-sm text-gray-700 leading-relaxed">
        The model has highlighted specific pests or diseases based on its training data. These detections can help you identify potential threats to your crops quickly. Each detection corresponds to known crop health risks.
        <br />
        To understand how these detections impact your crop and what action to take, head to the <RouterLink to="/risk-analysis" class="text-green-700 underline hover:text-green-900">Risk Analysis</RouterLink> section.
      </p>
    </div>

    <!-- Future section -->
    <div class="mt-10">
      <h3 class="text-xl font-semibold mb-2">Upcoming Improvements</h3>
      <ul class="list-disc list-inside text-sm text-gray-700">
        <li>Detection confidence scores per label</li>
        <li>Ability to submit multiple files at once</li>
        <li>Linking detected pests/diseases directly to their detail pages</li>
        <li>History of past uploads and detections</li>
      </ul>
    </div>
  </section>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'

const file = ref(null)
const previewUrl = ref(null)
const detections = ref([])
const loading = ref(false)

const filePreview = ref(null)
const fileInput = ref(null)

const isImage = computed(() => {
  return file.value && file.value.type.startsWith('image')
})

function triggerFileInput() {
  fileInput.value.click()
}

function handleFileChange(event) {
  const selected = event.target.files[0]
  if (selected) setFile(selected)
}

function handleDrop(event) {
  const droppedFile = event.dataTransfer.files[0]
  if (droppedFile) setFile(droppedFile)
}

function setFile(selected) {
  file.value = selected
  filePreview.value = URL.createObjectURL(selected)
  previewUrl.value = null
  detections.value = []
}

async function submitFile() {
  if (!file.value) return

  loading.value = true
  const formData = new FormData()
  formData.append('file', file.value)

  const endpoint = file.value.type.startsWith('image') ? '/predict/image' : '/predict/video'

  try {
    const response = await axios.post(`http://localhost:8000${endpoint}`, formData, {
      responseType: 'json',
    })

    detections.value = response.data.detections || []

    const mimeType = response.data.type || file.value.type
    previewUrl.value = `data:${mimeType};base64,${response.data.file}`
  } catch (error) {
    console.error('Error processing file:', error)
    alert('Error processing file. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>
  