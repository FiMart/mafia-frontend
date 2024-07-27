<template>
    <div class="flex bg-gray-200 rounded-lg shadow-md overflow-hidden" :class="cardSize">
      <!-- Left color band -->
      <div :class="`w-4 ${leftColor}`"></div>
      <div class="p-4 flex flex-col w-full">
        <div class="flex justify-between items-start">
          <div class="flex flex-col items-end text-right space-y-5">
            <h2 class="sm:text-l md:text-xl font-semibold">{{ title }}</h2>
            <p class="text-gray-500 text-xl">{{ formatNumber(amount) }} Baht</p>
          </div>
          <div class="flex flex-col items-end text-right space-y-5">
            <h2 :class="`sm:text-l md:text-xl font-semibold ${changePercentage >= 0 ? 'text-green-500' : 'text-red-500'}`">{{ formattedChangePercentage }}</h2>
            <p class="text-gray-500 text-xl">{{ formatNumber(changeAmount) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      changePercentage: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      changeAmount: {
        type: Number,
        required: true,
      },
      leftColor: {
        type: String,
        default: 'bg-red-500',
      },
      cardSize: {
        type: String,
        default: 'w-full max-w-80 h-32', // default card size, adjust as needed
      },
    },
    computed: {
      formattedChangePercentage() {
        return this.changePercentage > 0 
          ? `+${this.changePercentage.toFixed(2)}%` 
          : `${this.changePercentage.toFixed(2)}%`;
      },
    },
    methods: {
      formatNumber(value) {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here if needed */
  </style>
  