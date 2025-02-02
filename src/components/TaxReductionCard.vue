<template>
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
  