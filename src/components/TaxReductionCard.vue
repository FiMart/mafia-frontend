<template>
<<<<<<< HEAD
  <div class="tax-reduction-card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
      <div class="tax-badge">{{ Math.round(progressPercentage) }}%</div>
    </div>

    <div class="space-y-4">
      <!-- Progress Bar -->
      <div class="relative pt-1">
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
      </div>

      <!-- Amount Details
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div class="amount-box current">
          <span class="text-sm text-gray-500">ลดหย่อนแล้ว</span>
          <span class="text-lg font-bold text-teal-600">{{ currentAmount }}</span>
        </div>
        <div class="amount-box target">
          <span class="text-sm text-gray-500">เป้าหมาย</span>
          <span class="text-lg font-bold text-blue-600">{{ totalTarget }}</span>
        </div>
      </div> -->

      <!-- Remaining Amount -->
      <div class="remaining-amount">
        <span class="text-sm text-gray-500">เหลืออีก</span>
        <span class="text-base font-semibold text-orange-500">
          {{ formatCurrency(getRemainingAmount) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    currentAmount: String,
    totalTarget: String,
    progressPercentage: Number,
  },
  computed: {
    getRemainingAmount() {
      const current = parseFloat(this.currentAmount.replace(/[^\d.-]/g, ""));
      const target = parseFloat(this.totalTarget.replace(/[^\d.-]/g, ""));
      return target - current;
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(value);
    },
  },
};
</script>

<style scoped>
.tax-reduction-card {
  padding: 1rem;
}

.tax-badge {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #14b8a6 0%, #0891b2 100%);
  border-radius: 9999px;
  animation: pulse 2s infinite;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.tax-badge:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15);
}

.progress-container {
  overflow: hidden;
  height: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  display: flex;
  border-radius: 9999px;
  background-color: #e5e7eb;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
  background-color: #14b8a6;
  transition-property: all;
  transition-duration: 1000ms;
  background: linear-gradient(90deg, #0d9488 0%, #0891b2 100%);
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: glow 2s ease-in-out infinite;
}

.progress-bar::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

.amount-box {
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.amount-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.amount-box.current {
  background: linear-gradient(135deg, rgb(240 253 250) 0%, rgb(236 254 255) 100%);
}

.amount-box.target {
  background: linear-gradient(135deg, rgb(239 246 255) 0%, rgb(236 254 255) 100%);
}

.remaining-amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, rgb(255 247 237) 0%, rgb(255 237 213) 100%);
  margin-top: 1rem;
  animation: fadeIn 0.5s ease-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.remaining-amount:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.text-lg {
  animation: float 3s ease-in-out infinite;
}

@keyframes glow {
  0%,
  100% {
    filter: brightness(100%);
  }
  50% {
    filter: brightness(110%);
  }
}
</style>
=======
    <div
      class="flex flex-col gap-2 text-black border rounded-xl shadow-md px-5 py-4 bg-gray-0 bg-opacity-30 backdrop-filter backdrop-blur-lg"
    >
      <!-- Title -->
      <div class="font-semibold text-lg">{{ title }}</div>
  
      <!-- Amount -->
      <div class="font-semibold text-4xl tracking-tight">{{ currentAmount }}</div>
  
      <!-- Total Target -->
      <div class="font-normal">/{{ totalTarget }}</div>
  
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
          :style="{ width: progressPercentage + '%' }"
        >
          {{ progressPercentage }}%
        </div>
      </div>
      <hr class="my-2" />
      <!-- Total Target -->
      <div class="font-normal">เพดานสิทธิลดหย่อนภาษีของกองทุน RMF</div>
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          class="bg-red-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          :style="{ width: progressPercentage + '%' }"
        >
          {{ progressPercentage }}%
        </div>
      </div>

      <!-- Total Target -->
      <div class="font-normal">เพดานสิทธิลดหย่อนภาษีของกองทุน SSF</div>
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          class="bg-red-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          :style="{ width: progressPercentage + '%' }"
        >
          {{ progressPercentage }}%
        </div>
      </div>

      <!-- Total Target -->
      <div class="font-normal">เพดานสิทธิลดหย่อนภาษีของกองทุน <b>ThaiESG</b></div>
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          class="bg-red-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          :style="{ width: progressPercentage + '%' }"
        >
          {{ progressPercentage }}%
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TaxReductionCard",
    props: {
      title: {
        type: String,
        default: "เป้าหมายการลดหย่อนภาษีจากการลงทุนในกองทุนรวม ปี 2568",
      },
      currentAmount: {
        type: String,
        default: "20,000.00 บาท",
      },
      totalTarget: {
        type: String,
        default: "100,000.00",
      },
      progressPercentage: {
        type: Number,
        default: 20, // Default progress percentage
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  </style>
  
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
