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
      <button
        v-if="!isAuthenticated"
        @click="login"
        class="text-sm text-gray-700 hover:text-green-600"
      >
        Log in
      </button>

      <button
        v-if="!isAuthenticated"
        @click="login"
        class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm"
      >
        Join Us
      </button>

      <div v-if="isAuthenticated" class="flex items-center gap-2">
        <span class="text-sm text-gray-700 truncate max-w-[100px]">{{ user?.name }}</span>
        <button
          @click="logoutUser"
          class="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const route = useRoute()

const navClass = (path) => {
  const detailRoutes = ['/crop/', '/pest/', '/disease/', '/predator/']
  const isDatabaseActive = path === '/database' && (route.path === '/database' || detailRoutes.some(r => route.path.startsWith(r)))

  const isActive = path === route.path || isDatabaseActive

  return [
    'hover:text-green-600 transition',
    isActive ? 'font-bold text-green-600' : 'text-gray-800'
  ]
}

const {
  loginWithRedirect,
  logout,
  isAuthenticated,
  user
} = useAuth0()

const login = () => loginWithRedirect();

const logoutUser = () => {
  logout({ returnTo: 'https://icy-stone-0131d7a03.6.azurestaticapps.net' })
}

</script>