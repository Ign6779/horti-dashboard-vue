<template>
  <section class="w-full min-h-screen px-4 md:px-16 py-6">
    <h1 class="text-4xl font-extrabold text-center text-black-900 mb-10 tracking-tight font-[var(--font-sans)]">
      AI Detection
    </h1>

    <h2 class="text-center text-gray-600 text-base font-medium mt-[-30px] mb-5">
      Upload a photo or video to automatically detect crop threats using AI
    </h2>

    <!-- Upload & Result Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[440px]">
      <!-- Upload Panel -->
      <div class="bg-white rounded-xl p-5 shadow-md flex flex-col h-full min-h-full">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Upload Image/Video</h2>

        <div
          class="flex flex-col items-center justify-center border-2 border-dashed rounded-md h-[280px] bg-gray-50 cursor-pointer transition relative"
          :class="dragging ? 'border-green-400 bg-green-100' : 'border-gray-300'"
          @dragover.prevent="dragging = true"
          @dragleave.prevent="dragging = false"
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
            <img
              v-if="isImage"
              :src="filePreview"
              class="h-[240px] max-w-full object-contain rounded-md shadow-sm hover:shadow-md transition mx-auto"
            />
            <video
              v-else
              controls
              class="h-[240px] max-w-full object-contain rounded-md shadow-sm hover:shadow-md transition mx-auto"
            >
              <source :src="filePreview" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              @click.stop="clearFile"
              class="text-xs text-gray-500 underline hover:text-gray-700 mt-2"
            >
              Clear File
            </button>
          </template>

          <template v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l1.414-1.414a2 2 0 012.828 0L12 15l3.758-3.758a2 2 0 012.828 0L20 12m-6-4V4m0 0l-2 2m2-2l2 2"
              />
            </svg>
            <p class="text-sm text-gray-500 text-center leading-tight">
              Drop file here or select file<br />
              <span class="text-xs">Supported: .jpg, .png, .mp4 (max 20MB)</span>
            </p>
          </template>
        </div>

        <button
          :disabled="!file || loading"
          @click="submitFile"
          class="mt-5 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center"
        >
          {{ loading ? 'Processing...' : 'Process File' }}
          <span
            v-if="loading"
            class="ml-2 animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"
          ></span>
        </button>
      </div>

      <!-- Result Panel -->
      <div class="bg-white rounded-xl p-5 shadow-md flex flex-col h-full min-h-full">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Detection Results</h2>

        <div class="flex justify-center items-center mb-4 h-[280px]">
          <div v-if="previewUrl">
            <img
              v-if="isImage"
              :src="previewUrl"
              class="h-[240px] max-w-full object-contain rounded-md shadow-sm mx-auto"
            />
            <video
              v-else
              controls
              class="h-[240px] max-w-full object-contain rounded-md shadow-sm mx-auto"
            >
              <source :src="previewUrl" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p v-else class="text-sm text-gray-400 text-center">Detection will appear here after processing.</p>
        </div>

        <div class="min-h-[48px]">
          <div v-if="detections.length" class="text-sm text-gray-800">
            <p class="font-semibold">Identified Issues:</p>
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

    <p class="text-xs text-gray-400 mt-4">
      You are interacting with an automated AI system. The detections shown are generated by a machine learning model and are for informational purposes only.
    </p>
    <p class="text-xs text-gray-400 mt-4">
      Files are processed locally and not stored permanently. By uploading, you consent to temporary processing for AI analysis. You may clear the file at any time.
    </p>

    <!-- Explanation -->
    <div class="mt-12">
      <hr class="mb-8 border-gray-200" />
      <h3 class="text-xl font-semibold mb-3 text-gray-800">What do these results mean?</h3>

      <div class="bg-green-50 border border-green-100 rounded-xl p-4 sm:p-5 space-y-3 text-sm text-gray-700 leading-relaxed">
        <div class="flex items-start gap-3">
          <svg class="h-5 w-5 text-green-600 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m5-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>
            The AI looks for visual symptoms of pests and diseases in your uploaded image or video.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <svg class="h-5 w-5 text-green-600 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a4 4 0 018 0v2m1 4H6a2 2 0 01-2-2v-1a9 9 0 0118 0v1a2 2 0 01-2 2z" />
          </svg>
          <p>
            If an issue is found, it appears above as a green label. Soon, these labels will link to detailed information.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <svg class="h-5 w-5 text-green-600 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
          </svg>
          <p>
            Not sure what to do next? Visit the
            <RouterLink to="/risk-analysis" class="text-green-700 underline hover:text-green-900">Risk Analysis</RouterLink>
            section for tailored advice.
          </p>
        </div>
      </div>
    </div>

    <p class="text-xs text-gray-400 mt-4">
      Disclaimer: This tool is for educational and informational use only. It does not replace professional agricultural advice. Always consult a qualified expert before taking action based on AI results.
    </p>


    <!-- Roadmap -->
    <div class="mt-10">
      <h3 class="text-xl font-semibold mb-3 text-gray-800">What’s coming next?</h3>
      <p class="text-sm text-gray-600 italic mb-4">
        This tool is in active development — here’s what we’re working on:
      </p>
      <ul class="text-sm text-gray-700 space-y-3">
        <li class="flex items-start gap-2">
          <span class="mt-1 text-green-500">✔</span>
          <span><strong>Confidence scores</strong> to better interpret detections</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 text-green-500">✔</span>
          <span><strong>Multi-file upload</strong> for bulk analysis</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 text-green-500">✔</span>
          <span><strong>Clickable labels</strong> that link to detailed info pages</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 text-green-500">✔</span>
          <span><strong>Detection history</strong> to track changes over time</span>
        </li>
      </ul>
    </div>

    <p class="text-xs text-center mt-6 text-gray-400">
      Learn more about how we design this tool ethically and responsibly in our 
      <RouterLink to="/legal" class="underline hover:text-gray-600">AI Ethics & Legal Policy</RouterLink>.
    </p>

  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { api } from '../services/api.js'

const file = ref(null)
const previewUrl = ref(null)
const detections = ref([])
const loading = ref(false)
const filePreview = ref(null)
const fileInput = ref(null)
const dragging = ref(false)

const isImage = computed(() => file.value?.type?.startsWith('image'))

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
  dragging.value = false
}

function setFile(selected) {
  file.value = selected
  filePreview.value = URL.createObjectURL(selected)
  previewUrl.value = null
  detections.value = []
}

function clearFile() {
  file.value = null
  filePreview.value = null
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
    const response = await api.post(endpoint, formData, {
      responseType: 'json'
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
