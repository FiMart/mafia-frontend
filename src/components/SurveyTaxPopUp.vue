<template>
  <div class="fixed inset-0 flex items-center justify-center">
<<<<<<< HEAD
    <!-- Add Loading overlay -->
    <Loading v-if="isLoading" 
            message="กำลังเปิดแบบสอบถามภาษี..." 
            class="fixed inset-0 bg-black bg-opacity-90 z-50" />

=======
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
      <div class="flex justify-center mb-4">
        <div class="bg-blue-100 p-4 rounded-full">
          <img
            src="@/assets/icon/surveytax.png"
            alt="Tax Survey Icon"
            class="h-24 w-24"
          />
        </div>
      </div>
      <h2 class="text-lg font-bold mb-2 text-gray-800">
        กรอกแบบสอบถามข้อมูลทางภาษีเพื่อนำไปวิเคราะห์สิทธิลดหย่อนภาษีให้กับผู้ใช้งาน
      </h2>
      <p class="text-sm text-gray-600 mb-4 flex items-center justify-center gap-2">
        <span class="text-green-500">✔</span>
        ข้อมูลทางภาษีที่ผู้ใช้กรอกนี้สามารถแก้ไขทีหลังได้เมื่อแก้ไขแล้ว สิทธิลดหย่อนภาษี จะเปลี่ยนไปตามที่ผู้ใช้ได้แก้ไขไป
      </p>
      <p class="text-sm text-gray-600 mb-4 flex items-center justify-center gap-2">
        <span class="text-yellow-500">⚠</span>
        แบบสอบถามนี้ใช้เพื่อการประเมินภาษีที่จะต้องจ่ายมิได้เกี่ยวกับสรรภากรใดๆ
      </p>
      <button
        @click="submitSurvey"
<<<<<<< HEAD
        :disabled="isLoading"
        class="w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-800 transition duration-200 disabled:opacity-50"
      >
        {{ isLoading ? 'กำลังโหลด...' : 'กรอกข้อมูลภาษี' }}
=======
        class="w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-800 transition duration-200"
      >
        กรอกข้อมูลภาษี
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
      </button>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import Loading from './Loading.vue';

export default {
  name: "SurveyTaxPopUp",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async submitSurvey() {
      this.isLoading = true;
      try {
        await this.$router.push('/survey-tax');
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        this.isLoading = false;
      }
=======
export default {
  name: "SurveyTaxPopUp",
  methods: {
    submitSurvey() {
      this.$router.push('/survey-tax');
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
    },
  },
};
</script>

<style scoped>
<<<<<<< HEAD
/* Basic Image Style */
img {
  height: 96px;
  width: 96px;
  transition: transform 0.3s ease;
}

.bg-blue-100:hover img {
  transform: scale(1.1);
}

/* Card Animation */
.bg-white {
  transition: all 0.3s ease;
}

.bg-white:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Basic Button Style */
button {
  transition: all 0.3s ease;
}

button:not(:disabled):hover {
  transform: translateY(-2px);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Icon Animation */
.text-green-500,
.text-yellow-500 {
  transition: transform 0.3s ease;
}

.text-green-500:hover,
.text-yellow-500:hover {
  transform: scale(1.2);
}

/* Loading States */
.fixed {
  position: fixed;
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

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

/* Simple Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.bg-white {
  animation: fadeIn 0.3s ease-out;
=======
/* Adjust the size as needed */
img {
  height: 96px; /* Example height */
  width: 96px;  /* Example width */
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
}
</style>