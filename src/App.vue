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
import { onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const { isLoading, error } = useAuth0()

onMounted(() => {
  if (error.value) {
    console.error('Auth0 error:', error)
  }
})
</script>

<style scoped>
/* optional styling */
</style>
