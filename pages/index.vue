<script setup>
import { onMounted } from 'vue'
import { useCatsStore } from '~/stores/cats'
import { useAuthStore } from '~/stores/auth'

const catStore = useCatsStore();
const authStore = useAuthStore();
// const { isAuthenticated } = storeToRefs(authStore);

definePageMeta({
  title: "Home",
});

onMounted(() => {
  catStore.fetchRandomCat();
})
</script>
<template>
  <div class="flex-grow-1 d-flex flex-column">
    <div class="container py-4">
      <h5 class="text-muted mb-4" v-if="authStore.user">
        Welcome, {{ authStore.user }}!
      </h5>
      
      <div class="row justify-content-center align-items-center flex-grow-1">
        <div class="col-12 col-md-8 col-lg-6">
          <CatImage 
            :image-url="catStore.currentCat?.url"
            :loading="catStore.loading"
            @refresh="catStore.fetchRandomCat()"
          />
        </div>
      </div>
    </div>
  </div>
</template>