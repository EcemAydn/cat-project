import { defineStore } from 'pinia'
import { useNuxtApp } from '#app';

export const useCatsStore = defineStore('cats', () => {
  const currentCat = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function fetchRandomCat() {
    const { $api } = useNuxtApp()
    loading.value = true;
    error.value = null;

    try {
      const data = await $api.cats.getRandomCat();
      currentCat.value = data;
    } catch (err) {
      error.value = err.message;
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    currentCat,
    loading,
    error,
    fetchRandomCat
  }
})