<template>
    <div class="resetpwd-page min-h-screen flex items-center justify-center relative">
      <!-- Card -->
      <div class="relative bg-white p-8 rounded-lg shadow-lg w-96 z-10">
        <!-- Logo -->
        <div class="flex justify-center mb-4">
          <img src="@/assets/icon/logo1.png" alt="MAFIA Logo" class="h-12">
        </div>
  
        <!-- Title -->
        <h2 class="text-center text-xl font-semibold text-gray-800 mb-4">เปลี่ยนรหัสผ่าน</h2>
  
        <!-- New Password Input -->
        <input
          v-model="newPassword"
          type="password"
          placeholder="รหัสผ่านใหม่"
          class="w-full p-2 border rounded-full mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
  
        <!-- Confirm Password Input -->
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="ยืนยันรหัสผ่าน"
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

const newPassword = ref('')
const confirmPassword = ref('')
const router = useRouter()
const route = useRoute()
const email = ref('')
const toast = useToast()

const handleSubmit = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    toast.error('กรุณากรอกรหัสผ่านให้ครบ', {
      position: "top-center",
      timeout: 3000,
      toastClassName: "custom-toast-center"
    })
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    toast.error('รหัสผ่านไม่ตรงกัน', {
      position: "top-center",
      timeout: 3000,
      toastClassName: "custom-toast-center"
    })
    return
  }

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
.resetpwd-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

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
