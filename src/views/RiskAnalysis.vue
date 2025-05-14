<template>
  <section class="w-full min-h-screen px-4 md:px-16 py-6">
    <h1 class="text-3xl font-bold mb-8 text-center">Risk Analysis</h1>

    <!-- Crop + issue selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label class="block text-sm font-semibold mb-1">Crop</label>
        <select v-model="selectedCrop" class="border rounded w-full px-3 py-2">
          <option disabled value="">Select a crop</option>
          <option v-for="crop in crops" :key="crop" :value="crop">
            {{ labels[crop] || crop }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Pest/Disease</label>
        <select v-model="selectedIssue" class="border rounded w-full px-3 py-2">
          <option disabled value="">Select issue</option>
          <option
            v-for="issue in issues"
            :key="issue"
            :value="issue"
          >
            {{ labels[issue] || issue.replaceAll('_', ' ') }}
          </option>
        </select>
      </div>
    </div>

    <!-- Dynamic form -->
    <div v-if="selectedCrop && selectedIssue" class="border rounded p-6 shadow">
      <h2 class="text-xl font-semibold mb-4">Input Parameters</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(field, key) in currentFields" :key="key">
          <label class="block text-sm font-medium mb-1">{{ field.label }}</label>
          <input
            type="number"
            v-model.number="form[key]"
            :placeholder="field.placeholder"
            class="border rounded w-full px-3 py-2"
          />
          <p class="text-xs text-gray-500 mt-1">{{ field.help }}</p>
        </div>
      </div>

      <button
        @click="submit"
        class="mt-6 bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
        :disabled="loading"
      >
        {{ loading ? 'Calculating...' : 'Calculate Thresholds' }}
      </button>
    </div>

    <!-- Results -->
    <div v-if="results" class="mt-10">
      <h2 class="text-xl font-semibold mb-4">Results</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(value, key) in results"
          :key="key"
          class="bg-gray-100 p-4 rounded shadow"
        >
          <h3 class="text-sm font-semibold capitalize">
            {{ key.replaceAll('_', ' ') }}
          </h3>
          <p class="text-lg font-bold">{{ value.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- Explanation -->
    <div class="mt-12">
      <h3 class="text-xl font-semibold mb-2">How to Use This Information</h3>
      <p class="text-sm text-gray-700 leading-relaxed">
        These thresholds indicate when pest/disease control is economically justified.
        Use the
        <RouterLink to="/ai-detection" class="text-green-700 underline hover:text-green-900">AI Detection</RouterLink>
        page to detect infestations,
        and check the
        <RouterLink to="/database" class="text-green-700 underline hover:text-green-900">Database</RouterLink>
        for more information.
      </p>
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

// Friendly labels (optional)
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
