<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />

    <div class="container mx-auto px-4 py-16 mt-14">
      <div
        class="bg-white rounded-lg shadow-lg p-8 transform hover:shadow-2xl transition-all duration-300"
      >
        <h1 class="text-3xl font-bold text-center mb-8 animate-fadeIn">เกี่ยวกับเรา</h1>

        <div class="max-w-4xl mx-auto">
          <!-- Logo with animation -->
          <img
            src="@/assets/icon/logo1.png"
            alt="MAFIA Logo"
            class="h-24 mx-auto mb-8 hover:scale-110 transition-transform duration-300 animate-fadeInDown"
          />

          <!-- Project Name with gradient -->
          <h2
            class="text-2xl font-semibold text-center mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent animate-fadeIn"
          >
            MAFIA หรือ MutuAl Fund Investment Advisor
          </h2>

          <!-- เพิ่มคำอธิบาย -->
          <p
            class="text-gray-600 text-center mb-8 max-w-2xl mx-auto leading-relaxed animate-fadeIn"
          >
            เว็บแอปพลิเคชันที่จะช่วยให้คุณเข้าใจและวางแผนการลงทุนในกองทุนรวมได้อย่างมีประสิทธิภาพ
            พร้อมคำแนะนำในการลงทุนที่เหมาะสมกับความเสี่ยงที่คุณยอมรับได้
            และการวางแผนภาษีเพื่อประโยชน์สูงสุดของคุณ
          </p>

          <!-- Three Purpose Sections with hover effects -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Section 1: Investment Learning -->
            <div
              class="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fadeInLeft"
            >
              <div class="text-3xl mb-4 animate-bounce">📚</div>
              <h3 class="font-semibold mb-2">การเรียนรู้การลงทุน</h3>
              <p class="text-gray-600">
                แพลตฟอร์มที่ช่วยให้คุณเข้าใจการลงทุนในกองทุนรวม
                พร้อมข้อมูลและคำแนะนำที่เข้าใจง่าย
              </p>
            </div>

            <!-- Section 2: Investment Planning -->
            <div
              class="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fadeIn delay-100"
            >
              <div class="text-3xl mb-4 animate-pulse">📊</div>
              <h3 class="font-semibold mb-2">การวางแผนการลงทุน</h3>
              <p class="text-gray-600">
                วิเคราะห์และจัดการพอร์ตการลงทุนของคุณ พร้อมระบบติดตามผลการลงทุนแบบครบวงจร
              </p>
            </div>

            <!-- Section 3: Tax Benefits -->
            <div
              class="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fadeInRight"
            >
              <div class="text-3xl mb-4 animate-bounce">💰</div>
              <h3 class="font-semibold mb-2">สิทธิประโยชน์ทางภาษี</h3>
              <p class="text-gray-600">
                คำนวณและวางแผนภาษีจากการลงทุน เพื่อให้คุณได้รับผลประโยชน์สูงสุด
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Aboutus",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Add custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.animate-fadeInDown {
  animation: fadeInDown 1s ease-out;
}

.animate-fadeInLeft {
  animation: fadeInLeft 1s ease-out;
}

.animate-fadeInRight {
  animation: fadeInRight 1s ease-out;
}

.delay-100 {
  animation-delay: 0.1s;
}
</style>
