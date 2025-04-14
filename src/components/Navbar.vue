<template>
    <nav class="bg-white shadow-md h-[65px] px-8 flex items-center justify-between">
      <!-- Invisible placeholder to balance the join button -->
      <div class="w-[100px]"></div>
  
      <!-- Centered navigation links -->
      <div class="flex space-x-8 font-medium text-gray-800 text-sm">
        <RouterLink to="/" class="hover:text-green-600">Home</RouterLink>
        <RouterLink to="/database" class="hover:text-green-600">Database</RouterLink>
        <RouterLink to="/ai-detection" class="hover:text-green-600">AI Detection</RouterLink>
        <RouterLink to="/risk-analysis" class="hover:text-green-600">Risk Analysis</RouterLink>
        <RouterLink to="/about" class="hover:text-green-600">About</RouterLink>
      </div>
  
      <!-- Right-aligned Join Us button -->
      <RouterLink
        to="/join"
        class="w-[100px] text-right"
      >
        <span class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          Join Us
        </span>
      </RouterLink>
    </nav>
  </template>
  
  <script setup>
  // no logic for now
  </script>
  