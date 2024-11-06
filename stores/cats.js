import { defineStore } from 'pinia'
import { useNuxtApp } from '#app';

export const useCatsStore = defineStore('cats', () => {
  const currentCat = ref(null);
  const loading = ref(false);

  async function fetchRandomCat() {
    const { $api } = useNuxtApp()
    loading.value = true
    try {
      const { data } = await $api.cats.getRandomCat();
        if (data.value && Array.isArray(data.value) && data.value.length > 0) {
          currentCat.value = data.value[0];
        } else {
          console.log('error')
        }
    } catch (error) {
      console.error('error', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    currentCat,
    loading,

    fetchRandomCat
  }
})