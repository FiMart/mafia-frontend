<template>
  <!-- stock item start -->
  <div class="flex items-center justify-between rounded-[5px] px-4 py-3.5 hover:bg-[#F8FAFD] dark:hover:bg-meta-4">
    <div class="flex items-center gap-3">
      <div>
        <h5 class="text-sm font-bold leading-6 text-black dark:text-white">
          {{ title }}
        </h5>
        <p class="text-xs font-medium">{{ fundCount }}</p>
        <!-- แสดงประเภทของกองทุน -->
        <!-- <p class="text-xs font-medium text-gray-500">{{ fundType }}</p> -->
      </div>
    </div>

    <div class="text-right">
      <p class="mb-1 font-medium text-black dark:text-white">
        {{ amount }}
      </p>
      <p class="flex items-center justify-end gap-1 text-xs font-medium text-meta-3">
        {{ percentage }} ({{ percentageValue }})
      </p>
    </div>
  </div>
  <!-- stock item end -->
</template>

<script>
export default {
  name: "FundCard",
  props: {
    title: {
      type: String,
      default: "กองทุนรวมที่ถืออยู่",
    },
    fundCount: {
      type: String,
      default: "10 กองทุน",
    },
    fundType: {
      type: String,
      default: "ประเภททั่วไป", // ค่า default สำหรับประเภทของกองทุน
    },
    amount: {
      type: String,
      default: "xx,xxx.xx บาท",
    },
    percentage: {
      type: String,
      default: "0.00%",
    },
    percentageValue: {
      type: String,
      default: "0.00 บาท",
    },
  },
};
</script>

<style scoped>
/* Add specific styles for FundCard if needed */
</style>
