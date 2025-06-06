<template>
  <div class="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 px-[8px] max-w-[1328px] mx-auto">
    <!-- Filter by category -->
    <div class="flex items-center gap-1 flex-wrap">
      <span class="font-semibold text-sm text-gray-800">Filter by category:</span>

      <!-- Basic categories -->
      <button
        v-for="cat in basicCategories"
        :key="cat.label"
        @click="$emit('select-category', cat.value)"
        :class="[
          'px-4 py-2 text-sm border rounded-full transition',
          selectedCategory === cat.value
            ? 'bg-green-700 text-white border-green-700'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
        ]"
      >
        {{ cat.label }}
      </button>

      <!-- Pest Dropdown -->
      <div class="relative group">
        <button
          @click="$emit('select-category', 'Pest')"
          :class="[
            'px-4 py-2 text-sm border rounded-full transition flex items-center gap-1',
            selectedCategory === 'Pest'
              ? 'bg-green-700 text-white border-green-700'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
          ]"
        >
          Pest
          <ChevronDownIcon class="w-4 h-4" />
        </button>
        <div
          class="absolute left-0 top-full mt-0.5 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-50 transition duration-200"
        >
          <button
            v-for="char in pestCharacteristics"
            :key="char"
            @click="$emit('select-characteristic', { category: 'Pest', characteristic: char })"
            class="block px-4 py-2 w-full text-left text-sm hover:bg-gray-100 capitalize"
          >
            {{ char }}
          </button>
        </div>
      </div>

      <!-- Disease Dropdown -->
      <div class="relative group">
        <button
          @click="$emit('select-category', 'Disease')"
          :class="[
            'px-4 py-2 text-sm border rounded-full transition flex items-center gap-1',
            selectedCategory === 'Disease'
              ? 'bg-green-700 text-white border-green-700'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
          ]"
        >
          Disease
          <ChevronDownIcon class="w-4 h-4" />
        </button>
        <div
          class="absolute left-0 top-full mt-0.5 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-50 transition duration-200"
        >
          <button
            v-for="char in diseaseCharacteristics"
            :key="char"
            @click="$emit('select-characteristic', { category: 'Disease', characteristic: char })"
            class="block px-4 py-2 w-full text-left text-sm hover:bg-gray-100 capitalize"
          >
            {{ char }}
          </button>
        </div>
      </div>
    </div>

    <!-- Predator Dropdown -->
    <div class="relative group">
      <button
        @click="$emit('select-category', 'Predator')"
        :class="[
          'px-4 py-2 text-sm border rounded-full transition flex items-center gap-1',
          selectedCategory === 'Predator'
            ? 'bg-green-700 text-white border-green-700'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
        ]"
      >
        Predator
        <ChevronDownIcon class="w-4 h-4" />
      </button>
      <div
        class="absolute left-0 top-full mt-0.5 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none z-50 transition duration-200"
      >
        <button
          v-for="char in predatorCharacteristics"
          :key="char"
          @click="$emit('select-characteristic', { category: 'Predator', characteristic: char })"
          class="block px-4 py-2 w-full text-left text-sm hover:bg-gray-100 capitalize"
        >
          {{ char }}
        </button>
      </div>
    </div>

    <!-- Search bar -->
    <div class="w-full md:w-64">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </span>
        <input
          v-model="search"
          @input="$emit('update:searchQuery', search)"
          type="text"
          placeholder="Search..."
          class="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition bg-white hover:bg-gray-50 transition"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits(['select-category', 'select-characteristic', 'update:searchQuery'])

const props = defineProps({
  searchQuery: String,
  selectedCategory: String
})

const search = ref(props.searchQuery || '')
watch(() => props.searchQuery, newVal => (search.value = newVal))

const basicCategories = [
  { label: 'All', value: 'All' },
  { label: 'Crop', value: 'Crop' },
]

const diseaseCharacteristics = ['Bacteria', 'Fungi', 'Oomycetes']
const pestCharacteristics = [
  'Anthonomus-eugeniiu', 'Aphid', 'Caterpillar', 'Fly', 'Leaf-miner', 'Mites',
  'Otiorhynchus-sulcatus', 'Thrips', 'Wants', 'White-fly'
]
const pestCharacteristics = [
  'Parasitic-wasp', 'Mite', 'Bug', 'Hyperparasites', 'Ladybug', 'Hoverflies', 'Gall-midges'
]
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1 !important;
}
.group:hover .group-hover\:pointer-events-auto {
  pointer-events: auto !important;
}
</style>
