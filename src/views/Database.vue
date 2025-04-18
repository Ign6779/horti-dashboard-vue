<template>
  <section class="w-full min-h-screen px-4 md:px-16 py-6">
    <!--Filter & search bar-->
    <div class="flex flex-col md:flex-row items-center justify-between h-[92px] mb-8 gap-4">
      <!-- Filter by category -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-semibold">Categories:</span>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
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
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
    </div>
  </section>
</template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  