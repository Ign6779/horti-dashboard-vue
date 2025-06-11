<template>
  <div v-if="isLoading" class="h-screen flex items-center justify-center text-gray-600 text-lg">
    Loading...
  </div>
  <div v-else>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
const { isLoading } = useAuth0()
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
/* optional styling */
</style>
