<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center">
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

        <!-- Button -->
        <button
          @click="navigateToSurvey"
          class="w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-800 transition duration-200"
        >
          ทำแบบประเมิน
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['confirm']);
const router = useRouter();

const navigateToSurvey = () => {
  emit('confirm');
  router.push('survey-experience');
};
</script>

<style scoped>
/* Adjusted styles for smaller popup */
</style>
