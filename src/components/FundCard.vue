<template>
  <!-- <div class="flex justify-between px-5 bg-gray-0 bg-opacity-30 backdrop-filter backdrop-blur-lg"> -->
  <!-- stock item start -->
  <div class="flex items-center justify-between rounded-[5px] px-4 py-3.5 hover:bg-[#F8FAFD] dark:hover:bg-meta-4">
    <div class="flex items-center gap-3">
      <div>
        <h5 class="text-sm font-bold leading-6 text-black dark:text-white">
          {{ title }}
        </h5>
        <p class="text-xs font-medium">{{ fundCount }}</p>
      </div>
    </div>

    <div class="text-right">
      <p class="mb-1 font-medium text-black dark:text-white">
        {{ amount }}
      </p>
      <p class="flex items-center justify-end gap-1 text-xs font-medium text-meta-3">
        {{ percentage }} ({{ percentageValue }})
        <svg class="fill-current" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.48804 0.0989982L8.49108 6.099L0.484996 6.099L4.48804 0.0989982Z" fill=""></path>
        </svg>
      </p>
    </div>
    <!-- stock item end -->
  </div>
  <!-- </div> -->
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
