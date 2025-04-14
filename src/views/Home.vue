<template>
    <section class="relative w-full bg-[var(--color-background)]">
      <!-- Hero Section -->
      <div class="relative w-full h-[60vh] min-h-[500px] max-h-[765px] md:h-[765px] overflow-hidden">
        <!-- Background Image -->
        <img
          :src="heroImageSrc"
          alt="Hero Image"
          class="absolute inset-0 w-full h-full object-cover object-center"
          @error="handleImgError"
        />
  
        <!-- Overlayed Text -->
        <div class="relative z-10 h-full flex flex-col justify-center pl-65 pr-8 text-black">
          <h1 class="text-4xl font-bold mb-4 font-[var(--font-sans)] max-w-xl">
            Welcome to the horti database
          </h1>
          <p class="text-lg font-semibold mb-6 font-[var(--font-sans)] max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu nulla, molestie vel lacus ut, interdum ornare augue.
          </p>
          <RouterLink
            to="/database"
            class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm font-[var(--font-sans)] w-fit"
          >
            Explore the database
          </RouterLink>
        </div>
      </div>
  
      <!-- Info Section clipped into hero -->
      <div
        class="relative z-20 max-w-[1200px] w-[90%] mx-auto -mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm bg-white p-6 rounded-lg shadow-lg max-h-[250px]"
      >
        <div>
          <h2 class="text-lg font-bold mb-2">Open Source</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu nulla, molestie vel lacus ut, interdum ornare augue.
          </p>
        </div>
        <div class="border-t md:border-t-0 md:border-l md:border-r border-gray-300 px-4">
          <h2 class="text-lg font-bold mb-2">InHolland Biomimicry</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu nulla, molestie vel lacus ut, interdum ornare augue.
          </p>
        </div>
        <div>
          <h2 class="text-lg font-bold mb-2">Constant improvement</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu nulla, molestie vel lacus ut, interdum ornare augue.
          </p>
        </div>
      </div>
    </section>
</template>
  
<script>
import { ref } from 'vue'

export default {
    name: 'Home',
    setup() {
        const heroImageSrc = ref('/hero-image.png')
        const fallbackImageSrc = '/placeholder.png'

        function handleImgError() {
            heroImageSrc.value = fallbackImageSrc
        }

        return {
            heroImageSrc,
            handleImgError
        }
    }
}
</script>
  