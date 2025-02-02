<template>
  <div class="fixed inset-0 flex items-center justify-center">
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
        class="w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-800 transition duration-200"
      >
        กรอกข้อมูลภาษี
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SurveyTaxPopUp",
  methods: {
    submitSurvey() {
      this.$router.push('/survey-tax');
    },
  },
};
</script>

<style scoped>
/* Adjust the size as needed */
img {
  height: 96px; /* Example height */
  width: 96px;  /* Example width */
}
</style>