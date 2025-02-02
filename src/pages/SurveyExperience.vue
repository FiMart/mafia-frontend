<template>
  <div class="surveyex-page flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex relative">
      <!-- Left Panel -->
      <div class="w-1/2 p-6 flex flex-col items-center border-r justify-center">
        <img src="@/assets/icon/logo1.png" alt="MAFIA Logo" class="w-60 mb-4" />
        <img src="@/assets/icon/survey.png" alt="Checklist" class="w-56 mb-6" />
        <h2 class="text-lg font-bold text-center leading-tight">แบบสอบถามเกี่ยวกับประสบการณ์<br>การลงทุนในกองทุนรวม</h2>
        <div class="w-full mt-6 flex flex-col items-center">
          <div class="relative w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div class="bg-orange-500 h-full transition-all duration-300" :style="{ width: progress + '%' }"></div>
          </div>
          <p class="text-sm text-center mt-2 font-semibold">{{ progress }}%</p>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="w-1/2 p-8 flex flex-col justify-between" v-if="!showResult">
        <!-- Question Title with Image -->
        <div class="flex items-center justify-between mb-6">
           <!-- Increase image size from w-1/3 to w-2/5 -->
           <img v-if="currentQuestion === 6" 
           src="@/assets/images/graph.png" 
           alt="Investment Graph" 
           class="w-2/5 h-auto ml-4">
          <h1 class="text-xl font-bold text-center" :class="{'w-3/5': currentQuestion === 6}">
            {{ questions[currentQuestion].title }}
          </h1>
        </div>
        <div>
          <!-- Multiple select for question 4 -->
          <template v-if="currentQuestion === 3">
            <label v-for="(option, index) in questions[currentQuestion].options" :key="index" 
                   class="mb-4 flex items-center cursor-pointer transition-all duration-200 border p-4 rounded-lg"
                   :class="{ 'border-orange-500 bg-orange-100': isOptionSelected(option) }">
              <input type="checkbox" 
                     :checked="isOptionSelected(option)"
                     @change="toggleOption(option)"
                     class="hidden" />
              <span class="w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center mr-4 transition-all duration-200"
                    :class="{ 'border-orange-500': isOptionSelected(option) }">
                <div v-if="isOptionSelected(option)" class="w-2 h-2 bg-orange-500 rounded"></div>
              </span>
              {{ option }}
            </label>
          </template>
          
          <!-- Single select for other questions -->
          <template v-else>
            <label v-for="(option, index) in questions[currentQuestion].options" :key="index"
                   class="mb-4 flex items-center cursor-pointer transition-all duration-200 border p-4 rounded-lg"
                   :class="{ 'border-orange-500 bg-orange-100': answers[currentQuestion] === option }">
              <input type="radio" v-model="answers[currentQuestion]" :value="option" class="hidden" />
              <span class="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center mr-4 transition-all duration-200"
                    :class="{ 'border-orange-500': answers[currentQuestion] === option }">
                <div v-if="answers[currentQuestion] === option" class="w-2 h-2 bg-orange-500 rounded-full"></div>
              </span>
              {{ option }}
            </label>
          </template>
        </div>
        <div class="flex justify-between items-center mt-6">
          <button @click="prevQuestion" :disabled="currentQuestion === 0" class="px-4 py-2 text-white bg-orange-400 rounded-full disabled:opacity-50 hover:bg-orange-500">🡄</button>
          <p class="text-gray-600 font-semibold">{{ currentQuestion + 1 }}/{{ questions.length }}</p>
          <button v-if="currentQuestion < questions.length - 1" @click="nextQuestion" class="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700">🡆</button>
          <button v-else @click="submitAnswers" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full">ส่งคำตอบ</button>
        </div>
      </div>

      <!-- Result Panel -->
      <div class="w-1/2 p-8 flex flex-col justify-center text-center" v-if="showResult">
        <h1 class="text-xl font-bold mb-6">สรุปผลการวิเคราะห์</h1>
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <p class="text-lg font-semibold mb-2">
            ระดับความเสี่ยงของคุณ: 
            <span :class="riskLevelColorClass" class="font-bold">
              ระดับ {{ calculateRiskLevel() }} - {{ riskLevel }}
            </span>
          </p>
          <p class="text-md text-gray-600">
            ({{ totalScore }} คะแนน)
          </p>
          <p class="text-sm text-gray-500 mt-2">
            {{ getRiskLevelRange() }}
          </p>
        </div>
        <p class="mt-4">ขอบคุณที่ทำแบบสอบถาม ระบบได้วิเคราะห์ความเสี่ยงของคุณตามคำตอบที่เลือก</p>
        <button @click="showSurveyTaxPopUp" class="mt-6 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700">ต่อไป</button>
        <button @click="restartSurvey" class="mt-6 px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500">ทำแบบสอบถามใหม่</button>
      </div>
    </div>
    <!-- Remove this line -->
    <!-- <SurveyTaxPopUp v-if="isSurveyTaxPopUpVisible" @close="isSurveyTaxPopUpVisible = false" /> -->
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
    <div v-if="isSurveyTaxPopUpVisible" class="fixed inset-0 flex items-center justify-center z-50">
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
    <div v-if="showToast"
         :class="[
           'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg',
           toastType === 'error' ? 'bg-red-500' : 'bg-green-500',
           'text-white'
         ]">
      {{ toastMessage }}
    </div>
  </transition>

  <!-- Result Section -->
  <div v-if="showResult" class="result-section p-8">
    <h2 class="text-xl font-bold mb-4">ผลการประเมินความเสี่ยง</h2>
    <div class="mb-4">
      <p>คะแนนที่ได้: {{ totalScore }} คะแนน</p>
      <p>ระดับความเสี่ยง: <span :class="riskLevelClass">{{ riskLevel }}</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const handleSubmit = async () => {
  try {
    // Your form submission logic here
    
    toast.success('บันทึกข้อมูลสำเร็จ', {
      position: "top-center",
      timeout: 2000,
      toastClassName: "custom-toast-center"
    })

    setTimeout(() => {
      router.push('/home')
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

<script>
import SurveyTaxPopUp from '@/components/SurveyTaxPopUp.vue';

export default {
  components: {
    SurveyTaxPopUp,
  },
  data() {
    return {
      currentQuestion: 0,
      answers: {},
      showResult: false,
      riskLevel: '',
      isSurveyTaxPopUpVisible: false,
      questions: [
         {
          title: 'ปัจจุบันท่านอายุ?',
          options: ['ตั้งแต่อายุ 60 ปีขึ้นไป', '45-59 ปี', '35-44 ปี', 'น้อยกว่า 35 ปี']
        },
        {
          title: 'ปัจจุบันท่านมีภาระทางการเงินและค่าใช้จ่ายประจำ เช่น ค่าผ่อนบ้าน รถ ค่าใช้จ่ายส่วนตัว และค่าเลี้ยงดูครอบครัวเป็นสัดส่วนเท่าใด?',
          options: ['มากกว่าร้อยละ 75 ของรายได้ทั้งหมด', 'ระหว่างร้อยละ 50 ถึงร้อยละ 75 ของรายได้ทั้งหมด', 'ตั้งแต่ร้อยละ 25 แต่น้อยกว่าร้อยละ 50 ของรายได้ทั้งหมด', 'น้อยกว่าร้อยละ 25 ของรายได้ทั้งหมด']
        },
        {
          title: 'ท่านมีสถานภาพทางการเงินในปัจจุบันอย่างไร?',
          options: ['มีทรัพย์สินน้อยกว่าหนี้สิน', 'มีทรัพย์สินเท่ากับหนี้สิน', 'มีทรัพย์สินมากกว่าหนี้สิน', 'มีความมั่นใจว่ามีเงินออมหรือเงินลงทุนเพียงพอสำหรับการใช้ชีวิตหลังเกษียณอายุแล้ว']
        },
        {
          title: 'ท่านเคยมีประสบการณ์หรือมีความรู้ในการลงทุนในทรัพย์สินกลุ่มใดต่อไปนี้บ้าง?(เลือกได้มากกว่า 1 ข้อ)',
          options: ['เงินฝากธนาคาร', 'พันธบัตรรัฐบาลหรือกองทุนรวมพันธบัตรรัฐบาล', 'หุ้นกู้หรือกองทุนรวมตราสารหนี้', 'หุ้นสามัญหรือกองทุนรวมหุ้นหรือสินทรัพย์อื่นที่มีความเสี่ยงสูง']
        },
        {
          title: 'ระยะเวลาที่ท่านคาดว่าจะไม่มีความจำเป็นต้องใช้เงินลงทุนนี้?',
          options: ['ไม่เกิน 1 ปี', 'ตั้งแต่ 1 แต่น้อยกว่า 3 ปี', 'ตั้งแต่ 3 ปี ถึง 5 ปี', 'มากกว่า 5 ปี']
        },
        {
          title: 'ความสามารถในการรับความเสี่ยงของท่านคือ?',
          options: ['เน้นเงินต้นต้องปลอดภัยและได้รับผลตอบแทนสม่ำเสมอแต่ต่ำได้', 'เน้นโอกาสได้รับผลตอบแทนที่สม่ำเสมอแต่อาจเสี่ยงที่จะสูญเสียเงินต้นได้บ้าง', 'เน้นโอกาสได้รับผลตอบแทนที่สูงขึ้นแต่อาจเสี่ยงที่จะสูญเสียเงินต้นได้มากขึ้น', 'เน้นผลตอบแทนสูงสุดในระยะยาวแต่อาจเสี่ยงที่จะสูญเงินต้นส่วนใหญ่ได้']
        },
        {
          title: 'เมื่อพิจารณารูปแสดงผลตอบแทนของกลุ่มการลงทุนที่อาจเกิดขึ้นด้านข้างท่านคิดว่าจะลงทุนในกลุ่มการลงทุนใดมากที่สุด?',
          options: ['กลุ่มการลงทุนที่ 1 มีโอกาสได้รับผลตอบแทน 2.5% โดยไม่ขาดทุนเลย', 'กลุ่มการลงทุนที่ 2 มีโอกาสได้รับผลตอบแทนสูงสุด 7% แต่อาจมีผลขาดทุนได้ถึง 1%', 'กลุ่มการลงทุนที่ 3 มีโอกาสได้รับผลตอบแทนสูงสุด 15% แต่อาจมีผลขาดทุนได้ถึง 5%', 'กลุ่มการลงทุนที่ 4 มีโอกาสได้รับผลตอบแทนสูงสุด 25% แต่อาจมีผลขาดทุนได้ถึง 15%']
        },
        {
          title: 'ถ้าท่านเลือกลงทุนในทรัพย์สินที่มีโอกาสได้รับผลตอบแทนมากแต่มีโอกาสขาดทุนสูงด้วยเช่นกัน ท่านจะรู้สึกอย่างไร?',
          options: ['กังวลและตื่นตระหนกกลัวขาดทุน', 'ไม่สบายใจแต่พอเข้าใจได้บ้าง', 'เข้าใจและรับความผันผวนได้ในระดับหนึ่ง', 'ไม่กังวลกับโอกาสขาดทุนสูงและหวังกับผลตอบแทนที่อาจจะได้รับสูงขึ้น']
        },
        {
          title: 'ท่านจะรู้สึกกังวลหรือรับไม่ได้เมื่อมูลค่าเงินลงทุนของท่านมีการปรับตัวลดลงในสัดส่วนเท่าใด?',
          options: ['5% หรือ น้อยกว่า', 'มากกว่า 5% - 10%', 'มากกว่า 10% - 20%', 'มากกว่า 20% ขึ้นไป']
        },
        {
          title: 'หากปีที่แล้วท่านลงทุนไป 100,000 บาท ปีนี้ท่านพบว่ามูลค่าเงินลงทุนลดลงเหลือ 85,000 บาท ท่านจะทำอย่างไร?',
          options: ['ตกใจและต้องการขายการลงทุนที่เหลือทิ้ง', 'กังวลใจและจะปรับเปลี่ยนการลงทุนบางส่วนไปในทรัพย์สินที่เสี่ยงน้อยลง', 'อดทนถือต่อไปได้ และรอผลตอบแทนปรับตัวกลับมา', 'ยังมั่นใจเพราะเข้าใจว่าต้องลงทุนระยะยาวและจะเพิ่มเงินลงทุนในแบบเดิมเพื่อเฉลี่ยต้นทุน']
        },
      ],
      showToast: false,
      toastMessage: '',
      toastType: 'error', // 'error' | 'success'
      multipleAnswers: [] // Initialize question 4 answers as array
    };
  },
  computed: {
    progress() {
      return Math.round(((this.currentQuestion + 1) / this.questions.length) * 100);
    },
    riskLevelClass() {
      return {
        'text-red-500': this.riskLevel === 'สูง',
        'text-yellow-500': this.riskLevel === 'ปานกลาง',
        'text-green-500': this.riskLevel === 'ต่ำ'
      };
    },
    totalScore() {
      return this.calculateScore();
    },
    riskLevelColorClass() {
      const level = this.calculateRiskLevel();
      switch(level) {
        case 1: return 'text-green-500';    // เสี่ยงต่ำ
        case 2: return 'text-yellow-300';    // เสี่ยงปานกลางค่อนข้างต่ำ
        case 3: return 'text-yellow-500';    // เสี่ยงปานกลางค่อนข้างสูง
        case 4: return 'text-orange-500';    // เสี่ยงสูง
        case 5: return 'text-red-500';       // เสี่ยงสูงมาก
        default: return 'text-gray-500';
      }
    }
  },
  methods: {
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
    submitAnswers() {
      if (Object.keys(this.answers).length < this.questions.length) {
        this.showToastMessage('กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งคำตอบ', 'error')
      } else {
        this.calculateRiskLevel();
        this.showResult = true;
        this.showToastMessage('ประเมินความเสี่ยงเสร็จสิ้น', 'success')
      }
    },
    calculateScore() {
      let totalScore = 0;
      
      Object.keys(this.answers).forEach(questionIndex => {
        const questionNum = parseInt(questionIndex);
        if (questionNum === 3) { // Question 4 (index 3) - multiple select
          // Get highest score from selected options
          const optionScores = this.multipleAnswers.map(option => {
            return this.questions[3].options.indexOf(option) + 1;
          });
          totalScore += Math.max(...optionScores, 0);
        } else {
          // Single select questions
          const answerIndex = this.questions[questionNum].options.indexOf(this.answers[questionNum]);
          totalScore += (answerIndex + 1);
        }
      });
      
      return totalScore;
    },
    calculateRiskLevel() {
      const score = this.calculateScore();
      
      if (score < 15) {
        this.riskLevel = 'เสี่ยงต่ำ';
        return 1;
      } else if (score >= 15 && score <= 21) {
        this.riskLevel = 'เสี่ยงปานกลางค่อนข้างต่ำ';
        return 2;
      } else if (score >= 22 && score <= 29) {
        this.riskLevel = 'เสี่ยงปานกลางค่อนข้างสูง';
        return 3;
      } else if (score >= 30 && score <= 36) {
        this.riskLevel = 'เสี่ยงสูง';
        return 4;
      } else {
        this.riskLevel = 'เสี่ยงสูงมาก';
        return 5;
      }
    },
    restartSurvey() {
      this.currentQuestion = 0;
      this.answers = {};
      this.showResult = false;
      this.riskLevel = '';
      this.multipleAnswers = []; // Reset multiple answers array
      this.isSurveyTaxPopUpVisible = false;
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
    showSurveyTaxPopUp() {
      this.isSurveyTaxPopUpVisible = true;
    },
    showToastMessage(message, type = 'error') {
      this.toastMessage = message
      this.toastType = type
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    },
    isOptionSelected(option) {
      return this.currentQuestion === 3 ? this.multipleAnswers.includes(option) : false
    },
    toggleOption(option) {
      if (this.currentQuestion === 3) {
        const index = this.multipleAnswers.indexOf(option)
        if (index === -1) {
          this.multipleAnswers.push(option)
        } else {
          this.multipleAnswers.splice(index, 1)
        }
        this.answers[this.currentQuestion] = this.multipleAnswers
      }
    },
    getRiskLevelRange() {
      const score = this.totalScore;
      if (score < 15) return "น้อยกว่า 15 คะแนน";
      if (score >= 15 && score <= 21) return "15-21 คะแนน";
      if (score >= 22 && score <= 29) return "22-29 คะแนน";
      if (score >= 30 && score <= 36) return "30-36 คะแนน";
      return "37 คะแนนขึ้นไป";
    }
  }
};
</script>

<style scoped>
label {
  transition: all 0.2s ease-in-out;
  border: 1px solid #ccc; /* เพิ่มเส้นขอบ */
  padding: 10px; /* เพิ่ม padding */
}

input[type="radio"]:checked+label {
  border-color: #f97316;
  background-color: #fef3c7;
}
.surveyex-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
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
</style>