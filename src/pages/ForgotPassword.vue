<template>
  <div class="forgotpwd-page min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
        class="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <!-- Buttons -->
      <div class="mt-4 flex gap-2">
        <button
          @click="handleSubmit"
          class="w-full bg-teal-600 text-white py-2 rounded-full hover:bg-teal-700 transition"
        >
          ต่อไป
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const email = ref('');
const router = useRouter();
const toast = useToast();

const handleSubmit = async () => {
  if (!email.value) {
    toast.error('กรุณากรอกอีเมล', {
      position: "top-center",
      timeout: 3000,
      toastClassName: "custom-toast-center"
    });
    return;
  }

  try {
    // API call to check email
    const emailExists = await checkEmailExists(email.value);
    if (!emailExists) {
      toast.error('ไม่พบอีเมลผู้ใช้ในระบบ', {
        position: "top-center",
        timeout: 3000,
        toastClassName: "custom-toast-center"
      });
      return;
    }
    showToast('พบอีเมลผู้ใช้แล้ว', 'success');
    setTimeout(() => {
      router.push('/reset-password');
    }, 2000);
  } catch (error) {
    toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', {
      position: "top-center",
      timeout: 3000,
      toastClassName: "custom-toast-center"
    });
  }
};
</script>

<style>
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

.forgotpwd-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
</style>
