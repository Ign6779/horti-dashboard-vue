<template>
  <div class="flex flex-col md:flex-row items-center justify-between h-[92px] mb-8 gap-4">
    <!-- Filter by category -->
    <div class="flex flex-wrap items-center gap-2 relative">
      <span class="font-semibold">Categories:</span>

      <!-- All -->
      <button
        @click="$emit('select-category', 'All')"
        :class="[
          'px-3 py-1 rounded-md text-sm border border-gray-300 transition',
          selectedCategory === 'All' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
        ]"
      >
        All
      </button>

      <!-- Pest (hover dropdown) -->
      <div class="relative inline-block group">
        <button
          @click="$emit('select-category', 'Pest')"
          :class="[
            'px-3 py-1 rounded-md text-sm border border-gray-300 transition',
            selectedCategory === 'Pest' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
          ]"
        >
          Pest
        </button>

        <div
          class="absolute left-0 top-full bg-white border rounded shadow w-max z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition"
        >
          <button
            v-for="char in pestCharacteristics"
            :key="char"
            @click="$emit('select-characteristic', { category: 'Pest', characteristic: char })"
            class="block px-4 py-2 text-sm hover:bg-gray-100 capitalize whitespace-nowrap text-left w-full"
          >
            {{ char }}
          </button>
        </div>
      </div>

      <!-- Disease (hover dropdown) -->
      <div class="relative inline-block group">
        <button
          @click="$emit('select-category', 'Disease')"
          :class="[
            'px-3 py-1 rounded-md text-sm border border-gray-300 transition',
            selectedCategory === 'Disease' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
          ]"
        >
          Disease
        </button>

        <div
          class="absolute left-0 top-full bg-white border rounded shadow w-max z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition"
        >
          <button
            v-for="char in diseaseCharacteristics"
            :key="char"
            @click="$emit('select-characteristic', { category: 'Disease', characteristic: char })"
            class="block px-4 py-2 text-sm hover:bg-gray-100 capitalize whitespace-nowrap text-left w-full"
          >
            {{ char }}
          </button>
        </div>
      </div>

      <!-- Predator -->
      <button
        @click="$emit('select-category', 'Predator')"
        :class="[
          'px-3 py-1 rounded-md text-sm border border-gray-300 transition',
          selectedCategory === 'Predator' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
        ]"
      >
        Predator
      </button>
    </div>

    <!-- Search bar -->
    <div class="relative w-full md:w-64">
      <input
        v-model="search"
        @input="$emit('update:searchQuery', search)"
        type="text"
        placeholder="Search..."
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['select-category', 'select-characteristic', 'update:searchQuery'])

const props = defineProps({
  searchQuery: String,
  selectedCategory: String
})

const search = ref(props.searchQuery || '')
watch(() => props.searchQuery, newVal => (search.value = newVal))

const diseaseCharacteristics = ['Bacteria', 'Fungi', 'Oomycetes']
const pestCharacteristics = [
  'Anthonomus-eugeniiu', 'Aphid', 'Caterpillar', 'Fly', 'Leaf-miner', 'Mites',
  'Otiorhynchus-sulcatus', 'Thrips', 'Wants', 'White-fly'
]
</script>
