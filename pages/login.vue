<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const form = ref({
  username: '',
  password: ''
})
const errors = ref({
  username: '',
  password: '',
  general: ''
})
const loading = ref(false)
const formTouched = ref(false)

definePageMeta({
  title: "Login",
  middleware: ["auth"]
});

watch(() => form.value.username, () => {
  if (formTouched.value) {
    errors.value.username = ''
    errors.value.general = ''
  }
})

watch(() => form.value.password, () => {
  if (formTouched.value) {
    errors.value.password = ''
    errors.value.general = ''
  }
})

const validateForm = () => {
  formTouched.value = true
  let isValid = true
  
  if (!form.value.username.trim()) {
    errors.value.username = 'Username is required'
    isValid = false
  }
  
  if (!form.value.password.trim()) {
    errors.value.password = 'Password is required'
    isValid = false
  }
  
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  loading.value = true
  errors.value.general = ''
  
  try {
    await authStore.login(form.value)
    navigateTo('/')
  } catch (err) {
    errors.value.general = 'Invalid username or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex align-items-center bg-light py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <div class="text-center mb-4">
            <h1 class="h3 mb-2">Login</h1>
            <p class="text-muted">Please login to continue</p>
          </div>
          
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <form @submit.prevent="handleLogin" novalidate>
                <div class="mb-3">
                  <label 
                    for="username" 
                    class="form-label small fw-medium"
                  >
                    Username
                  </label>
                  <input
                    v-model="form.username"
                    type="text"
                    :class="[
                      'form-control form-control-md',
                      {'is-invalid': errors.username},
                      {'border-danger': errors.general}
                    ]"
                    id="username"
                    placeholder="Enter your username"
                    @focus="formTouched = true"
                  >
                  <div 
                    v-if="errors.username" 
                    class="invalid-feedback"
                  >
                    {{ errors.username }}
                  </div>
                </div>

                <div class="mb-4">
                  <label 
                    for="password" 
                    class="form-label small fw-medium"
                  >
                    Password
                  </label>
                  <input
                    v-model="form.password"
                    type="password"
                    :class="[
                      'form-control form-control-md',
                      {'is-invalid': errors.password},
                      {'border-danger': errors.general}
                    ]"
                    id="password"
                    placeholder="Enter your password"
                    @focus="formTouched = true"
                  >
                  <div 
                    v-if="errors.password" 
                    class="invalid-feedback"
                  >
                    {{ errors.password }}
                  </div>
                </div>
                <div 
                  v-if="errors.general" 
                  class="alert alert-danger py-2 small"
                >
                  <i class="bi bi-exclamation-circle me-2"></i>
                  {{ errors.general }}
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2"
                  :disabled="loading"
                >
                  <span v-if="loading" class="d-flex align-items-center justify-content-center">
                    <span 
                      class="spinner-border spinner-border-sm me-2" 
                      role="status"
                    ></span>
                    Signing in...
                  </span>
                  <span v-else>Sign In</span>
                </button>
              </form>
            </div>
          </div>

          <div class="text-center mt-4">
            <p class="text-muted small mb-0">
              Demo credentials: 
              <br>
              Username: <span class="fw-medium">admin</span> 
              Password: <span class="fw-medium">password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  transition: all 0.2s ease-in-out;
}

.form-control:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 0.25rem rgba(74, 144, 226, 0.15);
}

.form-control.is-invalid:focus,
.form-control.border-danger:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.15);
}

.alert {
  border: none;
}

.btn-primary {
  background-color: #4a90e2;
  border-color: #4a90e2;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover:not(:disabled) {
  background-color: #357abd;
  border-color: #357abd;
}

.btn-primary:disabled {
  background-color: #4a90e2;
  border-color: #4a90e2;
  opacity: 0.7;
}
</style>