<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  imageUrl: String,
  loading: Boolean
})

const currentTransition = ref('fade')

const transitions = [
  'fade',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
  'zoom',
  'rotate',
  'flip'
]

function getRandomTransition() {
  const currentValue = currentTransition.value
  let newTransition
  
  do {
    const randomIndex = Math.floor(Math.random() * transitions.length)
    newTransition = transitions[randomIndex]
  } while (newTransition === currentValue)
  
  return newTransition
}

const emit = defineEmits(['refresh'])

function handleRefresh() {
  currentTransition.value = getRandomTransition();
  emit('refresh')
}
</script>

<template>
  <div class="card border-0 shadow-sm">
    <div class="card-body p-0">
      <div class="position-relative bg-white rounded-top overflow-hidden" style="padding-bottom: 75%;">
        <Transition 
          :name="currentTransition"
          mode="out-in"
        >
          <div 
            v-if="loading" 
            class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
            :key="'loading'"
          >
          </div>
          <div 
            v-else-if="imageUrl"
            class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden"
            :key="imageUrl"
          >
            <ProgressiveImage
              :src="imageUrl"
              lazy-placeholder
              object-contain
              :alt="'Random cat'"
              class="img-progressive"
              no-ratio
              blur="30"
              delay="200"
              custom-class="cat-image"
            />
          </div>
        </Transition>
      </div>
      
      <div class="p-3 text-center bg-white rounded-bottom">
        <button 
          @click="handleRefresh" 
          class="btn btn-primary px-4 rounded-pill"
          :disabled="loading"
        >
          <i class="bi bi-arrow-repeat me-2"></i>
          Get New Cat
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.img-progressive {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  animation-duration: 800ms;
}

:deep(.v-progressive-image-main) {
  margin: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  inset: 0;
  object-fit: contain;
  transition: opacity 0.4s ease 0.2s;
}

.fade-enter-active,
.fade-leave-active,
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.zoom-enter-active,
.zoom-leave-active,
.rotate-enter-active,
.rotate-leave-active,
.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
  height: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.zoom-enter-from {
  opacity: 0;
  transform: scale(2);
}
.zoom-leave-to {
  opacity: 0;
  transform: scale(0);
}

.rotate-enter-from {
  opacity: 0;
  transform: rotate(180deg) scale(0.3);
}
.rotate-leave-to {
  opacity: 0;
  transform: rotate(-180deg) scale(0.3);
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(180deg) scale(0.5);
}
.flip-leave-to {
  opacity: 0;
  transform: rotateY(-180deg) scale(0.5);
}

.btn-primary {
  background-color: #4a90e2;
  border-color: #4a90e2;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #357abd;
  border-color: #357abd;
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}
</style>