import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useNuxtApp } from '#app';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const user = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials) {
    const { $api } = useNuxtApp();
    try {
      const response = await $api.auth.login(credentials);
      token.value = response.token;
      user.value = credentials.username;

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', credentials.username);
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async function logout() {
    const { $api } = useNuxtApp();
    try {
      await $api.auth.logout();
      token.value = null;
      user.value = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  function initAuth() {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = savedUser;
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    initAuth
  };
});
