<template>
  <nav class="bg-white shadow-md h-[60px] px-8 flex items-center justify-between">
    <!-- Logo -->
      <RouterLink to="/" class="flex items-center w-[180px]">
        <img src="/horti-logo.svg" alt="Horti Database Logo" class="h-50 w-auto" />
      </RouterLink>

    <!-- Navigation Links -->
    <div class="flex space-x-8 font-medium text-sm">
      <RouterLink :to="'/'" :class="navClass('/')">Home</RouterLink>
      <RouterLink :to="'/database'" :class="navClass('/database')">Database</RouterLink>
      <RouterLink :to="'/ai-detection'" :class="navClass('/ai-detection')">AI Detection</RouterLink>
      <RouterLink :to="'/risk-analysis'" :class="navClass('/risk-analysis')">Risk Analysis</RouterLink>
      <RouterLink :to="'/about'" :class="navClass('/about')">About</RouterLink>
    </div>

    <!-- Auth Buttons -->
    <div class="w-[100px] text-right flex items-center justify-end gap-4 whitespace-nowrap">
      <RouterLink to="/login" class="text-sm text-gray-700 hover:text-green-600">Log in</RouterLink>
      <RouterLink to="/signup">
        <span class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm">Join Us</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navClass = (path) => {
  return [
    'hover:text-green-600 transition',
    route.path === path ? 'font-bold text-green-600' : 'text-gray-800'
  ]
}
</script>
