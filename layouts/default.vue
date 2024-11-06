<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore();

onMounted(() => {
  authStore.initAuth();
})

const handleLogout = async () => {
  await authStore.logout();
  navigateTo('/login');
}
</script>
<template>
  <div class="min-vh-100 d-flex flex-column bg-light">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand fw-bold">Cat Gallery</NuxtLink>
        <div class="ms-auto">
          <template v-if="authStore.isAuthenticated">
            <button 
              @click="handleLogout" 
              class="btn btn-link text-decoration-none text-dark"
            >
              <i class="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </template>
        </div>
      </div>
    </nav>

    <div class="flex-grow-1 d-flex flex-column">
      <slot />
    </div>
  </div>
</template>