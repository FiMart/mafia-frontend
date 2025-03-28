<template>
  <div class="surveyex-page flex justify-center items-center min-h-screen bg-gray-100">
    <!-- Update Loading Components -->
    <Loading
      v-if="isSubmitting"
      message="กำลังบันทึกคำตอบ..."
      class="fixed inset-0 bg-black bg-opacity-80 z-50"
    />

    <Loading
      v-if="isNavigating"
      message="กำลังนำทางไปยังหน้าถัดไป..."
      class="fixed inset-0 bg-black bg-opacity-80 z-50"
    />

    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex relative">
      <!-- Left Panel -->
      <div class="w-1/2 p-6 flex flex-col items-center border-r justify-center">
        <img src="@/assets/icon/logo1.png" alt="MAFIA Logo" class="w-60 mb-4" />
        <img src="@/assets/icon/survey.png" alt="Checklist" class="w-56 mb-6" />
        <h2 class="text-lg font-bold text-center leading-tight">
          แบบสอบถามเกี่ยวกับประสบการณ์<br />การลงทุนในกองทุนรวม
        </h2>
        <div class="w-full mt-6 flex flex-col items-center">
          <div class="relative w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div
              class="bg-orange-500 h-full transition-all duration-300"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <p class="text-sm text-center mt-2 font-semibold">{{ progress }}%</p>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="w-1/2 p-8 flex flex-col justify-between" v-if="!showResult">
        <!-- Question Title with Image -->
        <div class="flex items-center justify-between mb-6">
          <!-- Increase image size from w-1/3 to w-2/5 -->
          <img
            v-if="currentQuestion === 6"
            src="@/assets/images/graph.png"
            alt="Investment Graph"
            class="w-2/5 h-auto ml-4"
          />
          <h1
            class="text-xl font-bold text-center"
            :class="{ 'w-3/5': currentQuestion === 6 }"
          >
            {{ questions[currentQuestion].title }}
          </h1>
        </div>
        <div>
          <!-- Multiple select for question 4 -->
          <template v-if="currentQuestion === 3">
            <label
              v-for="(option, index) in questions[currentQuestion].options"
              :key="index"
              class="mb-4 flex items-center cursor-pointer transition-all duration-200 border p-4 rounded-lg"
              :class="{ 'border-orange-500 bg-orange-100': isOptionSelected(option) }"
            >
              <input
                type="checkbox"
                :checked="isOptionSelected(option)"
                @change="toggleOption(option)"
                class="hidden"
              />
              <span
                class="w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center mr-4 transition-all duration-200"
                :class="{ 'border-orange-500': isOptionSelected(option) }"
              >
                <div
                  v-if="isOptionSelected(option)"
                  class="w-2 h-2 bg-orange-500 rounded"
                ></div>
              </span>
              {{ option }}
            </label>
          </template>

          <!-- Single select for other questions -->
          <template v-else>
            <label
              v-for="(option, index) in questions[currentQuestion].options"
              :key="index"
              class="mb-4 flex items-center cursor-pointer transition-all duration-200 border p-4 rounded-lg"
              :class="{
                'border-orange-500 bg-orange-100': answers[currentQuestion] === option,
              }"
            >
              <input
                type="radio"
                v-model="answers[currentQuestion]"
                :value="option"
                class="hidden"
              />
              <span
                class="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center mr-4 transition-all duration-200"
                :class="{ 'border-orange-500': answers[currentQuestion] === option }"
              >
                <div
                  v-if="answers[currentQuestion] === option"
                  class="w-2 h-2 bg-orange-500 rounded-full"
                ></div>
              </span>
              {{ option }}
            </label>
          </template>
        </div>
        <div class="flex justify-between items-center mt-6">
          <button
            @click="prevQuestion"
            :disabled="currentQuestion === 0"
            class="px-4 py-2 text-white bg-orange-400 rounded-full disabled:opacity-50 hover:bg-orange-500"
          >
            🡄
          </button>
          <p class="text-gray-600 font-semibold">
            {{ currentQuestion + 1 }}/{{ questions.length }}
          </p>
          <button
            v-if="currentQuestion < questions.length - 1"
            @click="nextQuestion"
            class="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
          >
            🡆
          </button>
          <button
            v-else
            @click="submitAnswers"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full disabled:opacity-50"
          >
            {{ isSubmitting ? "กำลังส่งคำตอบ..." : "ส่งคำตอบ" }}
          </button>
        </div>
      </div>

      <!-- Result Panel -->
      <div class="w-1/2 p-8 flex flex-col justify-center text-center" v-if="showResult">
        <!-- Show different header based on whether showing additional questions -->
        <h1 class="text-xl font-bold mb-6">
          {{ !showAdditionalQuestions ? "สรุปผลการวิเคราะห์" : "เป้าหมายการลงทุน" }}
        </h1>

        <div v-if="!showAdditionalQuestions" class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <p class="text-lg font-semibold mb-2">
            ระดับความเสี่ยงของคุณ:
            <span :class="riskLevelColorClass" class="font-bold">
              ระดับ {{ calculateRiskLevel() }} - {{ riskLevel }}
            </span>
          </p>
          <p class="text-md text-gray-600">({{ totalScore }} คะแนน)</p>
          <p class="text-sm text-gray-500 mt-2">
            {{ getRiskLevelRange() }}
          </p>
        </div>

        <!-- Add additional questions when showing results -->
        <div class="mt-6 flex flex-col space-y-4" v-if="!showAdditionalQuestions">
          <p class="mt-4">
            ขอบคุณที่ทำแบบสอบถาม ระบบได้วิเคราะห์ความเสี่ยงของคุณตามคำตอบที่เลือก
          </p>
          <button
            @click="showAdditionalQuestions = true"
            class="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 mx-auto w-64"
          >
            ตอบคำถามเพิ่มเติม
          </button>
          <button
            @click="restartSurvey"
            class="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 mx-auto w-64"
          >
            ทำแบบสอบถามใหม่
          </button>
        </div>

        <!-- Additional questions form -->
        <div v-else class="mt-6 text-left">
          <div
            class="mb-8 bg-gradient-to-r from-teal-50 to-teal-100 p-5 rounded-lg shadow-sm border border-teal-200"
          >
            <label class="block text-gray-800 font-medium mb-3">
              <div class="flex items-center">
                <span
                  class="bg-teal-500 text-white w-7 h-7 rounded-md flex items-center justify-center mr-3 shadow-sm"
                  >1</span
                >
                เป้าหมายผลตอบแทนต่อปีในการลงทุนของคุณคือกี่เปอร์เซ็นต์?
              </div>
            </label>
            <div
              class="flex items-center bg-white rounded-md shadow-sm overflow-hidden border border-gray-200"
            >
              <input
                type="number"
                v-model="returnTarget"
                min="0"
                max="100"
                step="0.1"
                placeholder="กรอกค่า เช่น 10"
                @blur="handleBlur"
                class="w-full p-4 text-right focus:outline-none focus:ring-0 border-0 text-teal-700 font-medium text-lg"
              />
              <div class="bg-teal-500 px-5 py-4 text-white font-bold">%</div>
            </div>
            <div class="mt-2 text-xs text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              ตัวอย่าง: 5% หมายถึง คุณคาดหวังผลตอบแทน 5% ต่อปี
            </div>
          </div>

          <div
            class="mb-8 bg-gradient-to-r from-teal-50 to-teal-100 p-5 rounded-lg shadow-sm border border-teal-200"
          >
            <label class="block text-gray-800 font-medium mb-3">
              <div class="flex items-center">
                <span
                  class="bg-teal-500 text-white w-7 h-7 rounded-full flex items-center justify-center mr-3 shadow-sm"
                  >2</span
                >
                ความผันผวนที่คุณรับได้ต่อผลตอบแทน 1% คือกี่เปอร์เซ็นต์?
              </div>
            </label>
            <div
              class="flex items-center bg-white rounded-md shadow-sm overflow-hidden border border-gray-200"
            >
              <input
                type="number"
                v-model="volatilityTolerance"
                min="0"
                max="100"
                step="0.1"
                placeholder="กรอกค่า เช่น 5"
                @blur="!skipValidation && validateVolatilityTolerance()"
                class="w-full p-4 text-right focus:outline-none focus:ring-0 border-0 text-teal-700 font-medium text-lg"
              />
              <div class="bg-teal-500 px-5 py-4 text-white font-bold">%</div>
            </div>
            <div class="mt-2 text-xs text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              ตัวอย่าง: 2% หมายถึง คุณยอมรับความผันผวนได้ 2% ต่อผลตอบแทน 1%
            </div>
          </div>

          <div class="mt-8 flex justify-center space-x-5">
            <button
              @click="
                skipValidation = true;
                showAdditionalQuestions = false;
              "
              class="px-6 py-3 bg-gray-400 text-white rounded-full hover:bg-gray-500 font-medium transition-all duration-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              ย้อนกลับ
            </button>
            <button
              @click="showSurveyTaxPopUp"
              class="px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:opacity-50 font-medium shadow-md transition-all duration-200 flex items-center"
              :disabled="!isAdditionalQuestionsValid"
            >
              ต่อไป
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SurveyTax Popup -->
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="isSurveyTaxPopUpVisible"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative">
        <SurveyTaxPopUp @close="isSurveyTaxPopUpVisible = false" />
      </div>
    </div>
  </transition>

  <!-- Add toast component -->
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="showToast"
      :class="[
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg',
        toastType === 'error' ? 'bg-red-500' : 'bg-green-500',
        'text-white',
      ]"
    >
      {{ toastMessage }}
    </div>
  </transition>

  <!-- Result Section -->
  <!-- <div v-if="showResult" class="result-section p-8">
    <h2 class="text-xl font-bold mb-4">ผลการประเมินความเสี่ยง</h2>
    <div class="mb-4">
      <p>คะแนนที่ได้: {{ totalScore }} คะแนน</p>
      <p>
        ระดับความเสี่ยง: <span :class="riskLevelClass">{{ riskLevel }}</span>
      </p>
    </div>
  </div> -->
</template>

<!-- <script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

const handleSubmit = async () => {
  try {
    // Your form submission logic here

    toast.success("บันทึกข้อมูลสำเร็จ", {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center",
    });

    setTimeout(() => {
      router.push("/home");
    }, 1000);
  } catch (error) {
    toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่", {
      position: "top-center",
      timeout: 1000,
      toastClassName: "custom-toast-center",
    });
  }
};
</script> -->

<script>
import SurveyTaxPopUp from "@/components/SurveyTaxPopUp.vue";
import Loading from "@/components/Loading.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    SurveyTaxPopUp,
    Loading,
  },
  data() {
    return {
      currentQuestion: 0,
      answers: {},
      showResult: false,
      riskLevel: "",
      isSurveyTaxPopUpVisible: false,
      skipValidation: false,
      questions: [
        {
          title: "ปัจจุบันท่านอายุ?",
          options: ["ตั้งแต่อายุ 60 ปีขึ้นไป", "45-59 ปี", "35-44 ปี", "น้อยกว่า 35 ปี"],
        },
        {
          title:
            "ปัจจุบันท่านมีภาระทางการเงินและค่าใช้จ่ายประจำ เช่น ค่าผ่อนบ้าน รถ ค่าใช้จ่ายส่วนตัว และค่าเลี้ยงดูครอบครัวเป็นสัดส่วนเท่าใด?",
          options: [
            "มากกว่าร้อยละ 75 ของรายได้ทั้งหมด",
            "ระหว่างร้อยละ 50 ถึงร้อยละ 75 ของรายได้ทั้งหมด",
            "ตั้งแต่ร้อยละ 25 แต่น้อยกว่าร้อยละ 50 ของรายได้ทั้งหมด",
            "น้อยกว่าร้อยละ 25 ของรายได้ทั้งหมด",
          ],
        },
        {
          title: "ท่านมีสถานภาพทางการเงินในปัจจุบันอย่างไร?",
          options: [
            "มีทรัพย์สินน้อยกว่าหนี้สิน",
            "มีทรัพย์สินเท่ากับหนี้สิน",
            "มีทรัพย์สินมากกว่าหนี้สิน",
            "มีความมั่นใจว่ามีเงินออมหรือเงินลงทุนเพียงพอสำหรับการใช้ชีวิตหลังเกษียณอายุแล้ว",
          ],
        },
        {
          title:
            "ท่านเคยมีประสบการณ์หรือมีความรู้ในการลงทุนในทรัพย์สินกลุ่มใดต่อไปนี้บ้าง?(เลือกได้มากกว่า 1 ข้อ)",
          options: [
            "เงินฝากธนาคาร",
            "พันธบัตรรัฐบาลหรือกองทุนรวมพันธบัตรรัฐบาล",
            "หุ้นกู้หรือกองทุนรวมตราสารหนี้",
            "หุ้นสามัญหรือกองทุนรวมหุ้นหรือสินทรัพย์อื่นที่มีความเสี่ยงสูง",
          ],
        },
        {
          title: "ระยะเวลาที่ท่านคาดว่าจะไม่มีความจำเป็นต้องใช้เงินลงทุนนี้?",
          options: [
            "ไม่เกิน 1 ปี",
            "ตั้งแต่ 1 แต่น้อยกว่า 3 ปี",
            "ตั้งแต่ 3 ปี ถึง 5 ปี",
            "มากกว่า 5 ปี",
          ],
        },
        {
          title: "ความสามารถในการรับความเสี่ยงของท่านคือ?",
          options: [
            "เน้นเงินต้นต้องปลอดภัยและได้รับผลตอบแทนสม่ำเสมอแต่ต่ำได้",
            "เน้นโอกาสได้รับผลตอบแทนที่สม่ำเสมอแต่อาจเสี่ยงที่จะสูญเสียเงินต้นได้บ้าง",
            "เน้นโอกาสได้รับผลตอบแทนที่สูงขึ้นแต่อาจเสี่ยงที่จะสูญเสียเงินต้นได้มากขึ้น",
            "เน้นผลตอบแทนสูงสุดในระยะยาวแต่อาจเสี่ยงที่จะสูญเงินต้นส่วนใหญ่ได้",
          ],
        },
        {
          title:
            "เมื่อพิจารณารูปแสดงผลตอบแทนของกลุ่มการลงทุนที่อาจเกิดขึ้นด้านข้างท่านคิดว่าจะลงทุนในกลุ่มการลงทุนใดมากที่สุด?",
          options: [
            "กลุ่มการลงทุนที่ 1 มีโอกาสได้รับผลตอบแทน 2.5% โดยไม่ขาดทุนเลย",
            "กลุ่มการลงทุนที่ 2 มีโอกาสได้รับผลตอบแทนสูงสุด 7% แต่อาจมีผลขาดทุนได้ถึง 1%",
            "กลุ่มการลงทุนที่ 3 มีโอกาสได้รับผลตอบแทนสูงสุด 15% แต่อาจมีผลขาดทุนได้ถึง 5%",
            "กลุ่มการลงทุนที่ 4 มีโอกาสได้รับผลตอบแทนสูงสุด 25% แต่อาจมีผลขาดทุนได้ถึง 15%",
          ],
        },
        {
          title:
            "ถ้าท่านเลือกลงทุนในทรัพย์สินที่มีโอกาสได้รับผลตอบแทนมากแต่มีโอกาสขาดทุนสูงด้วยเช่นกัน ท่านจะรู้สึกอย่างไร?",
          options: [
            "กังวลและตื่นตระหนกกลัวขาดทุน",
            "ไม่สบายใจแต่พอเข้าใจได้บ้าง",
            "เข้าใจและรับความผันผวนได้ในระดับหนึ่ง",
            "ไม่กังวลกับโอกาสขาดทุนสูงและหวังกับผลตอบแทนที่อาจจะได้รับสูงขึ้น",
          ],
        },
        {
          title:
            "ท่านจะรู้สึกกังวลหรือรับไม่ได้เมื่อมูลค่าเงินลงทุนของท่านมีการปรับตัวลดลงในสัดส่วนเท่าใด?",
          options: [
            "5% หรือ น้อยกว่า",
            "มากกว่า 5% - 10%",
            "มากกว่า 10% - 20%",
            "มากกว่า 20% ขึ้นไป",
          ],
        },
        {
          title:
            "หากปีที่แล้วท่านลงทุนไป 100,000 บาท ปีนี้ท่านพบว่ามูลค่าเงินลงทุนลดลงเหลือ 85,000 บาท ท่านจะทำอย่างไร?",
          options: [
            "ตกใจและต้องการขายการลงทุนที่เหลือทิ้ง",
            "กังวลใจและจะปรับเปลี่ยนการลงทุนบางส่วนไปในทรัพย์สินที่เสี่ยงน้อยลง",
            "อดทนถือต่อไปได้ และรอผลตอบแทนปรับตัวกลับมา",
            "ยังมั่นใจเพราะเข้าใจว่าต้องลงทุนระยะยาวและจะเพิ่มเงินลงทุนในแบบเดิมเพื่อเฉลี่ยต้นทุน",
          ],
        },
      ],
      showToast: false,
      toastMessage: "",
      toastType: "error", // 'error' | 'success'
      multipleAnswers: [], // Initialize question 4 answers as array
      // Add loading states
      isSubmitting: false,
      isNavigating: false,
      showAdditionalQuestions: false, // Add state for additional questions
      returnTarget: "", // Changed from 5.0 to empty string
      volatilityTolerance: "", // Changed from 2.0 to empty string
    };
  },
  computed: {
    progress() {
      return Math.round(((this.currentQuestion + 1) / this.questions.length) * 100);
    },
    riskLevelClass() {
      return {
        "text-red-500": this.riskLevel === "สูง",
        "text-yellow-500": this.riskLevel === "ปานกลาง",
        "text-green-500": this.riskLevel === "ต่ำ",
      };
    },
    totalScore() {
      return this.calculateScore();
    },
    riskLevelColorClass() {
      const level = this.calculateRiskLevel();
      switch (level) {
        case 1:
          return "text-green-500"; // เสี่ยงต่ำ
        case 2:
          return "text-yellow-300"; // เสี่ยงปานกลางค่อนข้างต่ำ
        case 3:
          return "text-yellow-500"; // เสี่ยงปานกลางค่อนข้างสูง
        case 4:
          return "text-orange-500"; // เสี่ยงสูง
        case 5:
          return "text-red-500"; // เสี่ยงสูงมาก
        default:
          return "text-gray-500";
      }
    },
    isAdditionalQuestionsValid() {
      return (
        this.returnTarget !== null &&
        this.returnTarget !== "" &&
        this.volatilityTolerance !== null &&
        this.volatilityTolerance !== ""
      );
    },
  },
  methods: {
    async postRiskLevel(risk) {
      const toast = useToast(); // 👈 ใส่ไว้ใน method
      try {
        const username = localStorage.getItem("username");
        const jwtToken = localStorage.getItem("jwtToken");

        const endpoint = `/api/user/${username}/risk-level/`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ risk_level: risk }),
        });

        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message || "เกิดข้อผิดพลาด", {
            position: "top-center",
          });
          return false;
        }

        toast.success("อัปเดตระดับความเสี่ยงเรียบร้อยแล้ว", {
          position: "top-center",
        });

        return true;
      } catch (error) {
        console.error("POST risk level error:", error);
        toast.error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", {
          position: "top-center",
        });
        return false;
      }
    },

    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      }
    },
    prevQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
    async submitAnswers() {
      const toast = useToast(); // 👈 ใส่ไว้ใน method

      // Check if all questions have been answered
      const totalQuestions = this.questions.length;
      const answeredQuestions = Object.keys(this.answers).length;

      // Special handling for question 4 (index 3) which allows multiple selections
      if (answeredQuestions < totalQuestions) {
        toast.error("กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งคำตอบ", {
          position: "top-center",
          timeout: 3000,
        });
        return;
      }

      // Check specifically for question 4 (index 3) to ensure it has answers
      if (
        this.currentQuestion === 3 &&
        (!this.multipleAnswers || this.multipleAnswers.length === 0)
      ) {
        toast.error("กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งคำตอบ", {
          position: "top-center",
          timeout: 3000,
        });
        return;
      }

      this.isSubmitting = true;

      try {
        const riskLevel = this.calculateRiskLevel();
        await this.postRiskLevel(riskLevel);

        this.showResult = true;
        toast.success("ประเมินความเสี่ยงเสร็จสิ้น", {
          position: "top-center",
        });
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("เกิดข้อผิดพลาดในการส่งคำตอบ", {
          position: "top-center",
        });
      } finally {
        this.isSubmitting = false;
      }
    },
    async showSurveyTaxPopUp() {
      const toast = useToast(); // 👈 ใส่ไว้ใน method
      if (this.showAdditionalQuestions) {
        if (!this.returnTarget || !this.volatilityTolerance) {
          toast.error("กรุณากรอกข้อมูลให้ครบถ้วน", {
            position: "top-center",
            timeout: 3000,
          });
          return;
        }

        // Validate both fields
        const isReturnValid = this.validateReturnTarget();
        const isVolatilityValid = this.validateVolatilityTolerance();

        // If both are valid, check the relationship between them
        if (isReturnValid && isVolatilityValid) {
          const returnValue = parseFloat(this.returnTarget);
          const volatilityValue = parseFloat(this.volatilityTolerance);

          // if (returnValue < volatilityValue) {
          //   toast.warning(
          //     "โปรดพิจารณาอีกครั้ง: ผลตอบแทนที่คาดหวังน้อยกว่าความผันผวนที่รับได้",
          //     {
          //       position: "top-center",
          //       timeout: 4000,
          //     }
          //   );
          //   // Still allow proceeding, just giving a warning
          // }
        } else {
          // If any validation failed, don't proceed
          return;
        }
      }

      this.isNavigating = true;
      try {
        // Save additional questions data if needed
        await this.saveAdditionalQuestionsData();

        this.isSurveyTaxPopUpVisible = true;
        toast.success("บันทึกเป้าหมายการลงทุนแล้ว", {
          position: "top-center",
          timeout: 2000,
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error("Error saving additional questions:", error);
        toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", {
          position: "top-center",
          timeout: 3000,
        });
      } finally {
        this.isNavigating = false;
      }
    },
    async saveAdditionalQuestionsData() {
      // This is where you'd send the data to your API
      try {
        const username = localStorage.getItem("username");
        const jwtToken = localStorage.getItem("jwtToken");

        if (!username || !jwtToken) {
          console.error("Missing username or token");
          return;
        }

        // Create data object with the additional answers
        const additionalData = {
          rate_fund: parseFloat(this.returnTarget) / 100 || 0,
          std_fund: parseFloat(this.volatilityTolerance) / 100 || 0,
        };

        // Send to API (commented out until API endpoint is ready)

        const response = await fetch(`/api/goal//rate-std/user/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(additionalData),
        });

        if (!response.ok) {
          throw new Error("Failed to save investment preferences");
        }

        // For now, let's just log the data
        console.log("Investment preferences to be saved:", additionalData);
      } catch (error) {
        console.error("Error saving investment preferences:", error);
        throw error; // Rethrow to handle in calling function
      }
    },
    async handleSubmit() {
      const toast = useToast(); // 👈 ใส่ไว้ใน method
      try {
        const username = localStorage.getItem("username");

        // Your form submission logic here
        const data = {
          username: username,
          risk_level: this.calculateRiskLevel(),
          annual_return_target: parseFloat(this.returnTarget) || 0,
          volatility_tolerance: parseFloat(this.volatilityTolerance) || 0,
        };

        console.log("Form data to submit:", data);

        toast.success("บันทึกข้อมูลสำเร็จ", {
          position: "top-center",
          timeout: 1000,
          toastClassName: "custom-toast-center",
        });

        setTimeout(() => {
          this.$router.push("/home");
        }, 1000);
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่", {
          position: "top-center",
          timeout: 1000,
          toastClassName: "custom-toast-center",
        });
      }
    },
    calculateScore() {
      let totalScore = 0;

      Object.keys(this.answers).forEach((questionIndex) => {
        const questionNum = parseInt(questionIndex);
        if (questionNum === 3) {
          // Question 4 (index 3) - multiple select
          // Get highest score from selected options
          const optionScores = this.multipleAnswers.map((option) => {
            return this.questions[3].options.indexOf(option) + 1;
          });
          totalScore += Math.max(...optionScores, 0);
        } else {
          // Single select questions
          const answerIndex = this.questions[questionNum].options.indexOf(
            this.answers[questionNum]
          );
          totalScore += answerIndex + 1;
        }
      });

      return totalScore;
    },
    calculateRiskLevel() {
      const score = this.calculateScore();

      if (score < 15) {
        this.riskLevel = "เสี่ยงต่ำ";
        return 1;
      } else if (score >= 15 && score <= 21) {
        this.riskLevel = "เสี่ยงปานกลางค่อนข้างต่ำ";
        return 2;
      } else if (score >= 22 && score <= 29) {
        this.riskLevel = "เสี่ยงปานกลางค่อนข้างสูง";
        return 3;
      } else if (score >= 30 && score <= 36) {
        this.riskLevel = "เสี่ยงสูง";
        return 4;
      } else {
        this.riskLevel = "เสี่ยงสูงมาก";
        return 5;
      }
    },
    restartSurvey() {
      this.currentQuestion = 0;
      this.answers = {};
      this.showResult = false;
      this.riskLevel = "";
      this.multipleAnswers = []; // Reset multiple answers array
      this.isSurveyTaxPopUpVisible = false;
      this.showAdditionalQuestions = false;
      this.returnTarget = ""; // Changed from 5.0 to empty string
      this.volatilityTolerance = ""; // Changed from 2.0 to empty string
    },

    resetQuestion4() {
      this.multipleAnswers = [];
      if (this.answers[3]) {
        delete this.answers[3];
      }
    },

    reviewAnswers() {
      this.showResult = false;
      this.currentQuestion = 0;
    },
    showToastMessage(message, type = "error") {
      toastMessage = message;
      toastType = type;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    isOptionSelected(option) {
      return this.currentQuestion === 3 ? this.multipleAnswers.includes(option) : false;
    },
    toggleOption(option) {
      if (this.currentQuestion === 3) {
        const index = this.multipleAnswers.indexOf(option);
        if (index === -1) {
          this.multipleAnswers.push(option);
        } else {
          this.multipleAnswers.splice(index, 1);
        }
        this.answers[this.currentQuestion] = this.multipleAnswers;
      }
    },
    getRiskLevelRange() {
      const score = this.totalScore;
      if (score < 15) return "น้อยกว่า 15 คะแนน";
      if (score >= 15 && score <= 21) return "15-21 คะแนน";
      if (score >= 22 && score <= 29) return "22-29 คะแนน";
      if (score >= 30 && score <= 36) return "30-36 คะแนน";
      return "37 คะแนนขึ้นไป";
    },
    // Fix validation methods
    handleBlur() {
      if (!this.skipValidation) {
        this.validateReturnTarget();
      }
    },

    validateReturnTarget() {
      const toast = useToast(); // 👈 ใส่ไว้ใน method
      if (!toast) {
        console.warn("Toast ไม่พร้อมใช้งาน");
        return false;
      }

      const rawValue = this.returnTarget;
      const value = parseFloat(rawValue);

      if (
        rawValue === null ||
        rawValue === undefined ||
        rawValue.toString().trim() === ""
      ) {
        toast.warning("กรุณากรอกผลตอบแทนที่คุณคาดหวัง", {
          position: "top-center",
          timeout: 3000,
        });
        return false;
      }

      if (isNaN(value)) {
        toast.warning("กรุณากรอกตัวเลขเท่านั้น", {
          position: "top-center",
          timeout: 3000,
        });
        return false;
      } else if (value < 0) {
        toast.error("ผลตอบแทนต้องไม่ติดลบ", {
          position: "top-center",
          timeout: 3000,
        });
        this.returnTarget = "";
        return false;
      } 
      // else if (value > 100) {
      //   toast.warning("ผลตอบแทนต่อปีที่คาดหวังสูงเกินความเป็นจริง", {
      //     position: "top-center",
      //     timeout: 3000,
      //   });
      //   return false;
      // } else if (value > 20) {
      //   toast.info("ผลตอบแทนสูงมาก อาจมีความเสี่ยงสูงตามไปด้วย", {
      //     position: "top-center",
      //     timeout: 3000,
      //   });
      //   return true;
      // }

      return true;
    },
    validateVolatilityTolerance() {
      const toast = useToast(); // 👈 ใส่ไว้ใน method
      if (!toast) {
        console.warn("Toast ยังไม่พร้อมใช้งาน");
        return false;
      }

      const rawValue = this.volatilityTolerance;
      const value = parseFloat(rawValue);

      if (
        rawValue === null ||
        rawValue === undefined ||
        rawValue.toString().trim() === ""
      ) {
        toast.warning("กรุณากรอกความผันผวนที่คุณรับได้", {
          position: "top-center",
          timeout: 3000,
        });
        return false;
      }

      if (isNaN(value)) {
        toast.warning("กรุณากรอกตัวเลขเท่านั้น", {
          position: "top-center",
          timeout: 3000,
        });
        return false;
      } else if (value < 0) {
        toast.error("ความผันผวนที่รับได้ต้องไม่ติดลบ", {
          position: "top-center",
          timeout: 3000,
        });
        this.volatilityTolerance = "";
        return false;
      } 
      // else if (value > 10) {
      //   toast.warning("ความผันผวนที่รับได้สูงมาก แสดงถึงความเสี่ยงสูง", {
      //     position: "top-center",
      //     timeout: 3000,
      //   });
      //   return true;
      // } else if (value < 1) {
      //   toast.info("ความผันผวนที่รับได้ต่ำ อาจทำให้ผลตอบแทนไม่สูงนัก", {
      //     position: "top-center",
      //     timeout: 3000,
      //   });
      //   return true;
      // }

      return true;
    },
  },
};
</script>

<style scoped>
/* Basic Background */
.surveyex-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/images/bg0.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

/* Basic Logo/Image Animation */
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.05);
}

/* Basic Option Selection */
label {
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  padding: 10px;
}

label:hover {
  border-color: #f97316;
  background-color: #fff7ed;
}

/* Selected Option State */
.border-orange-500 {
  border-color: #f97316;
}

.bg-orange-100 {
  background-color: #ffedd5;
}

/* Basic Button Animation */
button {
  transition: all 0.3s ease;
}

button:not(:disabled):hover {
  transform: translateY(-2px);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Basic Loading Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fixed {
  animation: fadeIn 0.3s ease-out;
}

/* Loading Background */
.bg-opacity-80 {
  background-color: rgba(0, 0, 0, 0.9) !important;
}

/* Basic Toast Styling */
.custom-toast-center {
  margin: 0 auto !important;
  text-align: center !important;
}

.question-title {
  text-align: center;
  margin-bottom: 1rem;
}

/* Add image styles */
img {
  max-width: 300px;
  object-fit: contain;
}

.option-box {
  border: 2px solid transparent;
  padding: 10px;
  cursor: pointer;
}

.option-box.selected-option {
  border-color: blue;
}

.border-orange-500 {
  border-color: #f97316;
}

.bg-orange-100 {
  background-color: #ffedd5;
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

/* Add these styles for loading overlay */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* Additional questions styling */
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Highlight animation for input fields */
input[type="number"]:focus {
  animation: highlight-pulse 1s ease;
}

@keyframes highlight-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.2);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(13, 148, 136, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(13, 148, 136, 0);
  }
}
</style>
