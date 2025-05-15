<template>
  <section class="relative w-full bg-[var(--color-background)]">
    <!-- Hero Section -->
    <div class="relative w-full h-[60vh] min-h-[500px] max-h-[765px] md:h-[765px] overflow-hidden">
      <img
        :src="heroImageSrc"
        alt="Hero Image"
        class="absolute inset-0 w-full h-full object-cover object-center"
        @error="handleHeroImgError"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-green-900/70 to-transparent z-0"></div>
      <div class="relative z-10 h-full flex flex-col justify-center pl-16 pr-8 text-white">
        <h1 class="text-6xl font-extrabold mb-4 font-[var(--font-sans)] max-w-2xl leading-tight">
          Welcome to the horti database
        </h1>
        <p class="text-lg font-medium mb-6 font-[var(--font-sans)] max-w-lg">
          Discover plant health insights, pest management strategies, and curated crop knowledge all in one place.
        </p>
        <RouterLink
          to="/database"
          class="bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-800 transition-all text-base w-fit"
        >
          Explore the database
        </RouterLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="relative z-20 max-w-[1200px] w-[90%] mx-auto -mt-16 mb-10 grid grid-cols-1 md:grid-cols-3 text-center text-sm bg-white p-6 rounded-lg shadow-lg">
      <div class="px-4 md:pr-6">
        <svg class="w-12 h-12 mx-auto mb-4 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
        <h2 class="text-lg font-bold mb-2 text-green-800">InHolland Biomimicry</h2>
        <p>
          Inspired by nature’s design, we apply biomimicry principles to enhance crop health and resilience.
        </p>
      </div>

      <div class="px-4 md:border-l md:border-r md:border-gray-300">
        <svg class="w-12 h-12 mx-auto mb-4 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <h2 class="text-lg font-bold mb-2 text-green-800">Open Source</h2>
        <p>
          Transparency and community-driven development ensure our data and tools remain accessible to all.
        </p>
      </div>

      <div class="px-4 md:pl-6">
        <svg class="w-12 h-12 mx-auto mb-4 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
        </svg>
        <h2 class="text-lg font-bold mb-2 text-green-800">Constant Improvement</h2>
        <p>
          We iterate and evolve based on user feedback and scientific discovery to serve growers better.
        </p>
      </div>
    </div>
  </section>

  <div class="bg-white/80 shadow-xl rounded-xl max-w-screen-xl mx-auto mb-10">
    <section v-intersect class="transition-all duration-700 delay-100 w-full px-4 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="flex-1 text-center md:text-left">
        <h2 class="text-3xl font-bold mb-4 font-[var(--font-sans)] text-green-900">About the Horti Project</h2>
        <p class="mb-4 text-gray-800 max-w-xl">
          The Horti Project empowers sustainable agriculture by combining academic research, technology, and AI to detect and manage plant health issues with precision.
        </p>
        <RouterLink to="/signup">
          <button class="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition text-base">
            Sign up
          </button>
        </RouterLink>
      </div>
      <div class="flex-1">
        <img
          :src="hortiImageSrc"
          alt="Horti Project"
          class="w-full h-auto rounded-lg shadow-md"
          @error="handleHortiImgError"
        />
      </div>
    </section>

    <section v-intersect class="transition-all duration-700 delay-100 w-full px-4 md:px-16 py-16 flex flex-col md:flex-row-reverse items-center justify-between gap-12 bg-[#f5fdf7]">
      <div class="flex-1 text-center md:text-left">
        <h2 class="text-3xl font-bold mb-4 font-[var(--font-sans)] text-green-900">The Flappy Drone Project</h2>
        <p class="text-gray-800 max-w-xl">
          Our drone system autonomously surveys fields, collects image data, and assists in identifying disease patterns and pest infestations with real-time AI analysis.
        </p>
      </div>
      <div class="flex-1">
        <img
          :src="droneImageSrc"
          alt="Flappy drone"
          class="w-full h-auto rounded-lg shadow-md"
          @error="handleDroneImgError"
        />
      </div>
    </section>

    <section v-intersect class="transition-all duration-700 delay-100 w-full px-4 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="flex-1 text-center md:text-left">
        <h2 class="text-3xl font-bold mb-4 font-[var(--font-sans)] text-green-900">Stay Updated with Our Research</h2>
        <p class="text-gray-800 max-w-xl">
          Subscribe to receive updates on our latest research, platform improvements, and new features that support smarter, greener farming.
        </p>
      </div>
      <div class="flex-1">
        <img
          :src="researchImageSrc"
          alt="Research image"
          class="w-full h-auto rounded-lg shadow-md"
          @error="handleResearchImgError"
        />
      </div>
    </section>
  </div>

</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const placeholder = '/placeholder.png'

    const heroImageSrc = ref('/home-hero-image.png')
    const hortiImageSrc = ref('/home-horti-project.png')
    const droneImageSrc = ref('/home-drone.png')
    const researchImageSrc = ref('/home-research.png')

    const handleHeroImgError = () => { heroImageSrc.value = placeholder }
    const handleHortiImgError = () => { hortiImageSrc.value = placeholder }
    const handleDroneImgError = () => { droneImageSrc.value = placeholder }
    const handleResearchImgError = () => { researchImageSrc.value = placeholder }

    return {
      heroImageSrc,
      hortiImageSrc,
      droneImageSrc,
      researchImageSrc,
      handleHeroImgError,
      handleHortiImgError,
      handleDroneImgError,
      handleResearchImgError
    }
  }
}
</script>

<style scoped>
</style>
