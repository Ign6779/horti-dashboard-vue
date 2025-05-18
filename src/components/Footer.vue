<template>
  <footer class="bg-white border-t border-gray-200 px-6 md:px-16 py-6 mt-15 text-sm text-gray-500 text-center">
    <p class="mb-1 font-semibold text-gray-700">Horti Dashboard</p>
    <p class="text-xs">Empowering plant health through research, AI, and open data.</p>
    <p class="text-xs mt-2">© {{ year }} Horti Project — All rights reserved</p>
    <p class="text-[10px] text-gray-400 mt-1 italic">Version {{ version }}</p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
const version = 'v1.0-beta'
</script>

<style scoped>
</style>
