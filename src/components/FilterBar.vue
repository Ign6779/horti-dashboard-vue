<template>
    <div class="flex flex-col md:flex-row items-center justify-between h-[92px] mb-8 gap-4">
      <!-- Filter by category -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-semibold">Categories:</span>
        <button
          v-for="category in categories"
          :key="category"
          @click="$emit('select-category', category)"
          :class="[
            'px-3 py-1 rounded-md text-sm border border-gray-300 transition',
            selectedCategory === category ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
          ]"
        >
          {{ category }}
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
  import { ref, watch } from 'vue'
  const props = defineProps({
    searchQuery: String,
    selectedCategory: String
  })
  
  const search = ref(props.searchQuery || '')
  watch(() => props.searchQuery, newVal => (search.value = newVal))
  
  const categories = ['All', 'Crop', 'Pest', 'Disease', 'Predator']
  </script>
  