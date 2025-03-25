<template>
  <div class="forgotpwd-page flex items-center justify-center relative">
    <!-- Loading Component -->
    <Loading 
      v-if="isLoading" 
      message="กำลังตรวจสอบอีเมล..." 
      class="absolute z-50"
    />
    
    <!-- Overlay when loading -->
    <div v-if="isLoading" class="absolute inset-0 bg-black bg-opacity-50 z-40"></div>

    <!-- Card -->
    <div class="relative bg-white p-8 rounded-lg shadow-lg w-96 z-10">
      <!-- Logo -->
      <div class="flex justify-center mb-4">
        <img src="@/assets/icon/logo1.png" alt="MAFIA Logo" class="h-12">
      </div>

      <!-- Title -->
      <h2 class="text-center text-xl font-semibold text-gray-800 mb-4">รีเซ็ตรหัสผ่าน</h2>

      <!-- Email Input -->
      <input
        v-model="email"
        type="email"
        placeholder="กรอกอีเมลของคุณ"
        :disabled="isLoading"
        class="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
      />

      <!-- Submit Button -->
      <div class="mt-4 flex gap-2">
        <button
          @click="handleSubmit" 
          :disabled="isLoading"
          class="w-full bg-teal-600 text-white py-2 rounded-full hover:bg-teal-700 transition disabled:opacity-50"
        >
          {{ isLoading ? 'กำลังประมวลผล...' : 'ต่อไป' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Loading from '@/components/Loading.vue';

const email = ref('');
const router = useRouter();
const toast = useToast();
const isLoading = ref(false);

const handleSubmit = async () => {
  // Validate email
  if (!email.value) {
    toast.error('กรุณากรอกอีเมล', {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center"
    });
    return;
  }

  // Start loading
  isLoading.value = true;

  try {
    // Simulate API call
    const response = await fetch('/api/auth/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value })
    });

    if (!response.ok) {
      throw new Error('เช็คอีเมลล้มเหลว');
    }

    const data = await response.json();

    if (!data.exists) {
      toast.error('ไม่พบอีเมลผู้ใช้ในระบบ', {
        position: "top-center",
        timeout: 1000,
        toastClassName: "custom-toast-center"
      });
      return;
    }

    // Success case
    toast.success('พบอีเมลผู้ใช้แล้ว', {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center"
    });

    // Keep loading while redirecting
    setTimeout(() => {
      router.push('/reset-password');
    }, 1000);

  } catch (error) {
    console.error('Error checking email:', error);
    toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center"
    });
  } finally {
    // Only hide loading if we're not redirecting
    if (!response?.ok) {
      isLoading.value = false;
    }
  }
};
</script>

<style scoped>
/* Background and Container */
.forgotpwd-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
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

/* Input Field */
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

/* Toast Positioning */
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

/* Loading Overlay Fade */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.absolute {
  animation: fadeIn 0.3s ease-out;
}
</style>
