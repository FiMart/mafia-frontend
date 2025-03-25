<template>
    <div class="resetpwd-page min-h-screen flex items-center justify-center relative">
<<<<<<< HEAD
      <!-- Update Loading Component -->
      <Loading v-if="isLoading" 
              message="กำลังเปลี่ยนรหัสผ่าน..." 
              class="fixed inset-0 bg-black bg-opacity-80 z-50" />

=======
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
      <!-- Card -->
      <div class="relative bg-white p-8 rounded-lg shadow-lg w-96 z-10">
        <!-- Logo -->
        <div class="flex justify-center mb-4">
          <img src="@/assets/icon/logo1.png" alt="MAFIA Logo" class="h-12">
        </div>
  
        <!-- Title -->
        <h2 class="text-center text-xl font-semibold text-gray-800 mb-4">เปลี่ยนรหัสผ่าน</h2>
  
<<<<<<< HEAD
        <!-- Form inputs with disabled state -->
=======
        <!-- New Password Input -->
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        <input
          v-model="newPassword"
          type="password"
          placeholder="รหัสผ่านใหม่"
<<<<<<< HEAD
          :disabled="isLoading"
          class="w-full p-2 border rounded-full mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
        />
  
=======
          class="w-full p-2 border rounded-full mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
  
        <!-- Confirm Password Input -->
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="ยืนยันรหัสผ่าน"
<<<<<<< HEAD
          :disabled="isLoading"
          class="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
        />
  
        <!-- Buttons with disabled state -->
        <div class="mt-4 flex gap-2">
          <button
            @click="handleSubmit"
            :disabled="isLoading"
            class="flex-1 bg-teal-600 text-white py-2 rounded-full hover:bg-teal-700 transition disabled:opacity-50"
          >
            {{ isLoading ? 'กำลังดำเนินการ...' : 'ยืนยัน' }}
          </button>
          <button
            @click="goBack"
            :disabled="isLoading"
            class="flex-1 bg-orange-400 text-white py-2 rounded-full hover:bg-orange-400 transition disabled:opacity-50"
=======
          class="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
  
        <!-- Buttons -->
        <div class="mt-4 flex gap-2">
          <button
            @click="handleSubmit"
            class="flex-1 bg-teal-600 text-white py-2 rounded-full hover:bg-teal-700 transition"
          >
            ยืนยัน
          </button>
          <button
            @click="goBack"
            class="flex-1 bg-orange-400 text-white py-2 rounded-full hover:bg-orange-400 transition"
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
<<<<<<< HEAD
import Loading from '@/components/Loading.vue'

const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
=======

const newPassword = ref('')
const confirmPassword = ref('')
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
const router = useRouter()
const route = useRoute()
const email = ref('')
const toast = useToast()

const handleSubmit = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    toast.error('กรุณากรอกรหัสผ่านให้ครบ', {
      position: "top-center",
<<<<<<< HEAD
      timeout: 1000,
=======
      timeout: 3000,
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
      toastClassName: "custom-toast-center"
    })
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    toast.error('รหัสผ่านไม่ตรงกัน', {
      position: "top-center",
<<<<<<< HEAD
      timeout: 1000,
=======
      timeout: 3000,
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
      toastClassName: "custom-toast-center"
    })
    return
  }

<<<<<<< HEAD
  isLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('เปลี่ยนรหัสผ่านสำเร็จ', {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center"
    })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    await router.push('/login')
  } catch (error) {
    toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่', {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center"
    })
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* Background Style */
=======
  try {
    // API call to reset password
    toast.success('เปลี่ยนรหัสผ่านสำเร็จ', {
      position: "top-center",
      timeout: 2000,
      toastClassName: "custom-toast-center"
    })
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่', {
      position: "top-center",
      timeout: 3000,
      toastClassName: "custom-toast-center"
    })
  }
}
</script>

<style>
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
.resetpwd-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

<<<<<<< HEAD
/* Card Animation */
.bg-white {
  transition: all 0.3s ease;
}

.bg-white:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Logo Animation */
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.1);
}

/* Input Field Animation */
input {
  transition: all 0.3s ease;
}

input:focus {
  transform: scale(1.02);
}

/* Button Animation */
button {
  transition: all 0.3s ease;
}

button:not(:disabled):hover {
  transform: translateY(-2px);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Loading Fade */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fixed {
  animation: fadeIn 0.3s ease-out;
}

/* Loading Background */
.bg-opacity-80 {
  background-color: rgba(0, 0, 0, 0.9) !important;
}

/* Toast Styling */
=======
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
.custom-toast-center {
  margin: 0 auto !important;
  text-align: center !important;
}

.Vue-Toastification__container.top-center {
  top: 50% !important;
  transform: translateY(-50%) !important;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
