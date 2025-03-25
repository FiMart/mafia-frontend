<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center">
<<<<<<< HEAD
    <!-- Add Loading overlay -->
    <Loading v-if="isLoading" 
            message="กำลังเปิดแบบประเมิน..." 
            class="fixed inset-0 bg-black bg-opacity-90 z-50" />

=======
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
    <div class="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-4">
      <div class="flex flex-col items-center">
        <!-- Clipboard Icon -->
        <div class="w-12 h-12 mb-4">
          <svg 
            viewBox="0 0 24 24" 
            class="w-full h-full"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
          >
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              stroke="#fbbf24"
            />
            <path d="M9 14l2 2 4-4" stroke="#22c55e" />
          </svg>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 text-center">
          โปรดทำแบบประเมินความเหมาะสม
        </h3>
        <h4 class="text-lg font-semibold mb-4 text-center">
          ในการลงทุนจำนวน 10 ข้อ
        </h4>

        <!-- Description -->
        <p class="mb-4 text-center text-gray-600">
          กรุณาตอบให้ตรงกับข้อ
        </p>
        <p class="mb-4 text-center text-gray-600">
          มีผลกับการวิเคราะห์ความเสี่ยงในการลงทุนที่เหมาะสมผู้ใช้
        </p>

        <!-- List Items -->
        <div class="w-full space-y-4 mb-4">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-1 text-red-500">⚠️</div>
            <span class="text-sm text-gray-600">
              แบบสอบถามนี้ใช้เวลาทำประมาณ 5-10 นาที และทำแค่เฉพาะครั้งแรกที่สมัครใช้งาน แบบสอบถามนี้ผู้จัดทำรวบรวมมาเพื่อเป็นเกณฑ์วัดระดับความเสี่ยงของการลงทุนตามเกณฑ์ผู้ดูแลผู้ใช้
            </span>
          </div>
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-1 text-green-500">✓</div>
            <span class="text-sm text-gray-600">
              แบบสอบถามนี้ผู้จัดทำได้รวบรวมจาก MFC Asset Management plc. ถ้าผิดพลาดประการใดผู้จัดทำขออภัยไว้ ณ ที่นี้ด้วยนะครับ
            </span>
          </div>
        </div>

<<<<<<< HEAD
        <!-- Button with loading state -->
        <button
          @click="navigateToSurvey"
          :disabled="isLoading"
          class="w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-800 transition duration-200 disabled:opacity-50"
        >
          {{ isLoading ? 'กำลังโหลด...' : 'ทำแบบประเมิน' }}
=======
        <!-- Button -->
        <button
          @click="navigateToSurvey"
          class="w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-800 transition duration-200"
        >
          ทำแบบประเมิน
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loading from './Loading.vue';

const isLoading = ref(false);
const router = useRouter();
=======
import { useRouter } from 'vue-router';
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['confirm']);
<<<<<<< HEAD

const navigateToSurvey = async () => {
  isLoading.value = true;
  try {
    emit('confirm');
    await router.push('survey-experience');
  } catch (error) {
    console.error('Navigation error:', error);
  } finally {
    isLoading.value = false;
  }
=======
const router = useRouter();

const navigateToSurvey = () => {
  emit('confirm');
  router.push('survey-experience');
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
};
</script>

<style scoped>
/* Adjusted styles for smaller popup */
<<<<<<< HEAD
.fixed {
  position: fixed;
  animation: fadeIn 0.3s ease-out;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.z-50 {
  z-index: 50;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Simple Card Style */
.bg-white {
  transition: all 0.3s ease;
}

.bg-white:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Basic Icon Animation */
.w-12 {
  transition: transform 0.3s ease;
}

.w-12:hover {
  transform: scale(1.1);
}

/* Simple Button Style */
button {
  transition: all 0.3s ease;
}

button:not(:disabled):hover {
  transform: translateY(-2px);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Basic Text Hover */
.text-gray-600 {
  transition: color 0.3s ease;
}

.text-gray-600:hover {
  color: #374151;
}

/* Loading State */
.disabled\:opacity-50:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
=======
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
</style>
