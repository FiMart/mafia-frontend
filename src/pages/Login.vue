<template>
  <div class="login-container min-h-screen flex items-center justify-center">
    <!-- Loading Spinner -->
    <Loading 
      v-if="isLoading" 
      message="กำลังเข้าสู่ระบบ..." 
      class="fixed inset-0 bg-black bg-opacity-80 z-50"
    />
    
    <!-- Remove separate overlay since it's now part of Loading component -->

    <!-- Login Form Container -->
    <div class="w-96 bg-white rounded-lg shadow-lg p-6">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="@/assets/icon/logo1.png" alt="MAFIA Logo" class="h-12" />
      </div>

      <!-- Title -->
      <h2 class="text-xl font-semibold text-center mb-6">ลงชื่อเข้าใช้</h2>

      <!-- Login Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Username Input -->
        <div class="mb-4">
          <input type="text" v-model="formData.username" placeholder="ชื่อผู้ใช้"
            class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>

        <!-- Password Input -->
        <div class="relative mb-4">
          <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" placeholder="รหัสผ่าน"
            class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <button type="button" @click="togglePassword"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          </button>
        </div>

        <!-- Forgot Password Link -->
        <!-- <div class="text-right">
          <router-link to="forgot-password" class="text-teal-600 hover:text-teal-800 text-sm">
            ลืมรหัสผ่าน?
          </router-link>
        </div> -->

        <!-- Login Button -->
        <button type="submit"
          class="w-full bg-teal-600 text-white py-2 rounded-full hover:bg-teal-800 transition-colors font-bold">
          เข้าสู่ระบบ
        </button>

        <!-- Register Link -->
        <p class="text-center text-sm text-orange-400">
          ยังไม่ได้เป็นสมาชิก?
          <router-link to="register" class="text-teal-600 hover:underline">
            สมัครสมาชิก
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Loading from '@/components/Loading.vue'

const router = useRouter()
const toast = useToast()

// กำหนดข้อมูลฟอร์ม
const formData = reactive({
  username: '',
  password: ''
})

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const isLoading = ref(false)

// ฟังก์ชันสำหรับส่งข้อมูลล็อกอินไปยัง API และรับ JWT token
const handleSubmit = async () => {
  // Set loading state before API call
  isLoading.value = true

  // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
  if (!formData.username || !formData.password) {
    isLoading.value = false
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center"
    })
    return
  }

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    })

    // ถ้า response ไม่สำเร็จ
    if (!response.ok) {
      const errorData = await response.json()
      var errorMessage;
      if (response.status == 401) {
        errorMessage = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
      } else {
        errorMessage = 'เข้าสู่ระบบล้มเหลว';
      }

      toast.error(errorMessage, {
        position: "top-center",
        timeout: 1000,
        toastClassName: "custom-toast-center"
      })
      isLoading.value = false // Hide loading on error
      return
    }

    // อ่านข้อมูล JSON ที่ส่งกลับมา
    const data = await response.json();

    // ดึง token จาก data.access_token
    const token = data.access_token;

    // เก็บ JWT token ใน localStorage
    localStorage.setItem('jwtToken', token);

    //  เก็บ username
    localStorage.setItem('username', formData.username);

    const response1 = await fetch(`/api/user/${formData.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (!response1.ok) {
      throw new Error(`HTTP error! status: ${response1.status}`);
    }
    const data1 = await response1.json();

    // get email
    localStorage.setItem('email', data1.email);
    
    // แสดง success toast
    toast.success('เข้าสู่ระบบสำเร็จ', {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center"
    })

    // Keep loading state while redirecting
    setTimeout(() => {
      isLoading.value = false // Hide loading spinner
      router.push('/home')
    }, 1000)

  } catch (error) {
    isLoading.value = false // Hide loading on error
    console.error('Error during login:', error)
    toast.error('เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ', {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center"
    })
  }
}
</script>

<style scoped>
/* Background Style */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

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

/* Button Effects */
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
