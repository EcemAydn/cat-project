import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (to.path !== '/login' && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }
  
  if (to.path === '/login' && authStore.isAuthenticated) {
    return navigateTo('/')
  }
})