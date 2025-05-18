<template>
  <section class="w-full min-h-screen px-4 md:px-16 py-6">
    <h1 class="text-4xl font-extrabold text-center text-black-900 mb-2 tracking-tight font-[var(--font-sans)]">Risk Analysis</h1>
    <h2 class="text-center text-gray-600 text-base font-medium mb-10">
      Calculate when to take action against pests and diseases, based on crop data and thresholds
    </h2>

    <!-- Crop + issue selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label class="block text-sm font-semibold mb-1">Crop</label>
        <select v-model="selectedCrop" class="w-full border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
          <option disabled value="">Select a crop</option>
          <option v-for="crop in crops" :key="crop" :value="crop">
            {{ labels[crop] || crop }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Pest/Disease</label>
        <select v-model="selectedIssue" class="w-full border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
          <option disabled value="">Select issue</option>
          <option v-for="issue in issues" :key="issue" :value="issue">
            {{ labels[issue] || issue.replaceAll('_', ' ') }}
          </option>
        </select>
      </div>
    </div>

    <!-- Dynamic form -->
    <div v-if="selectedCrop && selectedIssue" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 class="text-xl font-semibold mb-2 text-gray-800">Input Parameters</h2>
      <p class="text-sm text-gray-600 mb-4">
        Enter values based on your crop's growing conditions. These are used to calculate when intervention becomes cost-effective.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(field, key) in currentFields" :key="key">
          <label class="block text-sm font-medium mb-1">{{ field.label }}</label>
          <input
            type="number"
            v-model.number="form[key]"
            :placeholder="field.placeholder"
            class="w-full border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <p class="text-xs text-gray-500 mt-1">{{ field.help }}</p>
        </div>
      </div>

      <button
        @click="submit"
        class="mt-6 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 disabled:opacity-50 transition"
        :disabled="loading"
      >
        {{ loading ? 'Calculating...' : 'Calculate Thresholds' }}
      </button>
    </div>

    <!-- Results -->
    <div v-if="results" class="mt-10">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Results</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(value, key) in results"
          :key="key"
          class="bg-green-50 border border-green-100 p-4 rounded-xl shadow-sm"
        >
          <h3 class="text-sm font-semibold capitalize text-gray-700">{{ key.replaceAll('_', ' ') }}</h3>
          <p class="text-lg font-bold text-green-800">{{ value.toFixed(2) }}</p>
        </div>
      </div>

      <!-- Toggleable Explanation Section -->
      <div class="mt-8">
        <button
          @click="showExplanations = !showExplanations"
          class="text-sm text-green-700 underline hover:text-green-900"
        >
          {{ showExplanations ? 'Hide' : 'Show' }} result explanations
        </button>
        <div v-if="showExplanations" class="mt-4 bg-green-50 border border-green-100 rounded-xl p-5 space-y-4 text-sm text-gray-700 leading-relaxed">
          <div><strong class="text-green-800">Break-even Point</strong>: The pest density at which the cost of control equals the value of the crop loss. Below this point, treatment is not cost-effective.</div>
          <div><strong class="text-green-800">Production Threshold</strong>: The lowest pest density at which visible damage to the crop might start — though intervention may not yet be necessary.</div>
          <div><strong class="text-green-800">Economic Threshold (ET)</strong>: The pest density at which control measures should be taken to prevent reaching the Economic Injury Level. It's a critical threshold to avoid economic damage.</div>
          <div><strong class="text-green-800">Economic Injury Level (EIL)</strong>: The pest population density where the economic damage caused is equal to the cost of control. Action taken after this point may result in financial loss.</div>
          <div><strong class="text-green-800">Decision Threshold</strong>: An adjusted value based on pest development rate and crop stage. It guides timely intervention before losses escalate.</div>
          <div><strong class="text-green-800">Transition & Vegetative Thresholds</strong>: Specific to crop growth phases (e.g., for tomatoes), helping you time treatment around sensitive development stages.</div>
          <p class="font-medium text-green-900 pt-2">
            These results help ensure your interventions are both timely and economically justified.
          </p>
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="mt-16">
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Why Use Risk Analysis?</h3>
      <p class="text-sm text-gray-700 mb-4">
        Risk analysis models help determine <strong>when action is necessary</strong> — balancing pest control costs with potential crop losses.
      </p>
      <ul class="text-sm text-gray-700 space-y-3">
        <li class="flex items-start gap-2">
          <span class="mt-1 text-green-500">✔</span>
          <span><strong>Reduces</strong> unnecessary pesticide use</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 text-green-500">✔</span>
          <span><strong>Increases efficiency</strong> by timing interventions effectively</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 text-green-500">✔</span>
          <span>Tailored to specific crop–pest combinations using <strong>real-world data</strong></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { riskModels } from '../data/riskModels'

const selectedCrop = ref('')
const selectedIssue = ref('')
const loading = ref(false)
const results = ref(null)
const form = ref({})
const showExplanations = ref(false)

const labels = {
  tomato: 'Tomato',
  cucumber: 'Cucumber',
  tuta_absoluta: 'Tuta absoluta',
  tetranychus_urticae: 'Tetranychus urticae',
}

const crops = computed(() => Object.keys(riskModels))
const issues = computed(() =>
  selectedCrop.value ? Object.keys(riskModels[selectedCrop.value]) : []
)

const currentFields = computed(() => {
  if (!selectedCrop.value || !selectedIssue.value) return {}
  return riskModels[selectedCrop.value]?.[selectedIssue.value] || {}
})

async function submit() {
  const payload = {}
  for (const key in currentFields.value) {
    if (form.value[key] != null) payload[key] = form.value[key]
  }

  loading.value = true
  try {
    const url = `http://localhost:8500/risk-analysis/${selectedCrop.value}/${selectedIssue.value}`
    const response = await axios.post(url, payload)
    results.value = response.data
  } catch (error) {
    alert('An error occurred while fetching results. Please try again.')
    console.error('Error fetching results:', error)
  } finally {
    loading.value = false
  }
}
</script>
