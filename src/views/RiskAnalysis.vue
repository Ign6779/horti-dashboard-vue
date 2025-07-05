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
        Fill out based on your crop's setup. Need help? Hover over each label to see why it matters.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(field, key) in currentFields" :key="key">
          <label class="block text-sm font-medium mb-1" :title="field.help">
            {{ field.label }}
            <span v-if="key === 'r' || key === 'd'" class="text-xs text-gray-400 ml-1">(optional)</span>
          </label>
          <input
            type="number"
            v-model.number="form[key]"
            :placeholder="field.placeholder"
            class="w-full border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <p class="text-xs text-gray-500 mt-1">{{ getFriendlyHelp(key, field.help) }}</p>
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
          <h3 class="text-sm font-semibold capitalize text-gray-700">{{ formatKey(key) }}</h3>
          <p class="text-lg font-bold text-green-800">{{ value.toFixed(2) }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ explainOutput(key) }}</p>
        </div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="mt-16">
      <h3 class="text-xl font-semibold mb-3 text-gray-800">Why Use Risk Analysis?</h3>
      <p class="text-sm text-gray-700 mb-4">
        Risk models help you decide <strong>when treatment is needed</strong>, avoiding unnecessary cost or yield loss.
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
          <span>Tailored to your crop and pest situation using <strong>real data</strong></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { api } from '../services/api.js'
import { riskModels } from '../data/riskModels'

const selectedCrop = ref('')
const selectedIssue = ref('')
const loading = ref(false)
const results = ref(null)
const form = ref({})

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

const getFriendlyHelp = (key, fallback) => {
  const map = {
    control_costs: 'What you pay to control the pest (e.g. predators, spraying)',
    price_per_unit: 'How much you sell the crop for per kg',
    expected_yield_per_plant: 'Estimated production per plant (kg)',
    number_of_plants: 'Total number of plants in your greenhouse',
    cumulative_yield: 'Amount already harvested',
    crop_age: 'Days since planting (affects timing of damage)',
    r: 'Growth speed of the pest population. Use 0.103 if unsure.',
    d: 'Delay (in days) before your control method starts working',
    cost: 'Your total cost to control this pest',
    value: 'Market price of your crop per kg',
    I: 'Estimated damage from 1 pest (like leaf damage or loss)',
    D: 'How much yield you lose per unit of pest damage',
    K: 'How effective your control is (e.g. 0.8 = 80%)'
  }
  return map[key] || fallback
}

const formatKey = (key) => key.replaceAll('_', ' ')

const explainOutput = (key) => {
  const map = {
    break_even_point: 'The proportion of yield loss where control costs equal crop losses. Below this, treatment costs more than the damage.',
    vegetative_threshold: 'The pest density during early crop growth where action may be needed to avoid economic loss.',
    production_threshold: 'The pest density during the late stage of crop development at which treatment becomes necessary.',
    transition_threshold: 'An adjusted threshold between early and late growth stages based on crop age.',
    decision_threshold: 'This is the current pest density at which treatment is worth it — calculated for your crop’s age and conditions.',
    economic_threshold: 'This is the threshold after factoring in pest growth and treatment delay. Act now if your pest count is higher.',
    economic_injury_level: 'Above this pest density, your financial losses from inaction will exceed the cost of control.'
  }
  return map[key] || ''
}

async function submit() {
  const payload = {}
  for (const key in currentFields.value) {
    if (form.value[key] != null) payload[key] = form.value[key]
  }

  loading.value = true
  try {
    const response = await api.post(`/risk-analysis/${selectedCrop.value}/${selectedIssue.value}`, payload)
    results.value = response.data
  } catch (error) {
    let message = 'An error occurred while fetching results. Please try again.'
    
    if (error.response && error.response.data && error.response.data.detail) {
    message = error.response.data.detail
    }

    alert(message)
    console.error('Error fetching results:', error)
  } finally {
    loading.value = false
  }
}
</script>
