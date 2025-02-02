<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="container mx-auto py-10">
      <h1 class="text-2xl font-bold mb-6 text-white">ประวัติการทำรายการ</h1>
      
      <!-- Filters Section -->
      <div class="mb-4 flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-md">
        <!-- Fund Type Checkboxes -->
        <div class="flex flex-col space-y-2">
          <label class="text-sm font-medium">ประเภทกองทุนรวม:</label>
          <div class="flex flex-wrap gap-4">
            <label v-for="type in fundTypes" :key="type" class="flex items-center space-x-2">
              <input type="checkbox" 
                     v-model="selectedFundTypes" 
                     :value="type" 
                     class="form-checkbox rounded border-gray-300">
              <span class="text-sm">{{ type }}</span>
            </label>
          </div>
        </div>

        <!-- Tax Saving Fund Radio -->
        <div class="flex flex-col space-y-2">
          <label class="text-sm font-medium">กองทุนลดหย่อนภาษี:</label>
          <div class="flex gap-4">
            <label v-for="type in taxSavingTypes" :key="type" class="flex items-center space-x-2">
              <input type="radio" 
                     v-model="selectedTaxSaving" 
                     :value="type" 
                     class="form-radio border-gray-300">
              <span class="text-sm">{{ type }}</span>
            </label>
          </div>
        </div>

        <!-- Date Range Inputs -->
        <div class="flex items-center space-x-2">
          <label class="text-sm">ระยะเวลา:</label>
          <input 
            type="date" 
            v-model="dateRange.start"
            :max="dateRange.end" 
            class="form-input rounded border p-1">
          <span>ถึง</span>
          <input 
            type="date" 
            v-model="dateRange.end"
            :min="dateRange.start"
            class="form-input rounded border p-1">
          <button 
            @click="resetDateRange"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
            ล้างข้อมูล
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <table class="w-full bg-white border rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr class="bg-green-500 text-white">
            <th v-for="column in columns" 
                :key="column.key" 
                class="py-2 px-4 text-sm">
              <span class="cursor-pointer" @click="sort(column.key)">
                {{ column.label }}
                <span v-if="sortKey === column.key">
                  {{ sortOrder === 1 ? '▼' : '▲' }}
                </span>
                <span v-else>▼</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fund in paginatedFunds" 
              :key="fund.fundName" 
              class="odd:bg-gray-100 even:bg-white hover:bg-gray-300">
            <td class="py-2 px-4 text-center">{{ fund.fundName }}</td>
            <td class="py-2 px-4 text-center">{{ fund.type }}</td>
            <td class="py-2 px-4 text-center">{{ fund.gainLoss }}</td>
            <td class="py-2 px-4 text-center">{{ fund.units }}</td>
            <td class="py-2 px-4 text-center">{{ fund.nav }}</td>
            <td class="py-2 px-4 text-center">{{ fund.amount }}</td>
            <td class="py-2 px-4 text-center">{{ formatDate(fund.date) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-around items-center mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
          🡄 ย้อนกลับ
        </button>
        <span class="text-white">หน้า {{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
          ต่อไป 🡆
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Navbar from '@/components/Navbar.vue'

// Add columns definition
const columns = [
  { key: 'fundName', label: 'ชื่อกองทุน' },
  { key: 'type', label: 'ประเภท' },
  { key: 'gainLoss', label: '%G/L' },
  { key: 'units', label: 'จำนวนหน่วย' },
  { key: 'nav', label: 'NAV' },
  { key: 'amount', label: 'จำนวนเงิน' },
  { key: 'date', label: 'วันที่' }
]

// Update mock data to focus on fund types
const funds = ref([
  {
    fundName: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
    type: 'ThaiESG',
    gainLoss: '+15.2%',
    units: 1000,
    nav: 10.50,
    amount: 10500,
    date: '2024-01-15'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'RMF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
  {
    fundName: 'กองทุนเปิดไทยพาณิชย์',
    type: 'SSF',
    gainLoss: '-5.2%',
    units: 500,
    nav: 15.75,
    amount: 7875,
    date: '2024-01-16'
  },
])

const currentPage = ref(1)
const perPage = ref(10) // Set items per page to 10
const sortKey = ref('fundName')
const sortOrder = ref(1)
const fundType = ref('ThaiESG')

const today = new Date().toISOString().split('T')[0]
const dateRange = ref({
  start: null,
  end: null
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fundTypes = ref([
  'ทั้งหมด',
  'กองทุนรวมตลาดเงินในประเทศ',
  'กองทุนรวมตลาดเงินต่างประเทศ',
  'กองทุนรวมพันธบัตรรัฐบาล',
  'กองทุนรวมตราสารหนี้',
  'กองทุนรวมผสม',
  'กองทุนรวมตราสารทุน',
  'กองทุนรวมหมวดอุตสาหกรรม',
  'กองทุนรวมสินทรัพย์ทางเลือก'
])

const taxSavingTypes = ref(['ทั้งหมด', 'RMF', 'SSF', 'ThaiESG'])
const selectedFundTypes = ref(['ทั้งหมด'])
const selectedTaxSaving = ref('ทั้งหมด')

// Update filtered data computed property
const filteredData = computed(() => {
  let result = funds.value

  // กรองตามประเภทกองทุน
  if (!selectedFundTypes.value.includes('ทั้งหมด')) {
    result = result.filter(fund => 
      selectedFundTypes.value.includes(fund.type)
    )
  }

  // กรองตามประเภทกองทุนลดหย่อนภาษี
  if (selectedTaxSaving.value !== 'ทั้งหมด') {
    result = result.filter(fund => fund.type === selectedTaxSaving.value)
  }

  // กรองตามช่วงวันที่เฉพาะเมื่อมีการเลือกทั้ง start และ end
  if (dateRange.value.start && dateRange.value.end) {
    const startDate = new Date(dateRange.value.start)
    const endDate = new Date(dateRange.value.end)
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(23, 59, 59, 999)
    
    result = result.filter(fund => {
      const fundDate = new Date(fund.date)
      return fundDate >= startDate && fundDate <= endDate
    })
  }

  return result
})

const sortedFunds = computed(() => {
  return [...filteredData.value].sort((a, b) => {
    let result = 0
    if (a[sortKey.value] > b[sortKey.value]) result = 1
    if (a[sortKey.value] < b[sortKey.value]) result = -1
    return result * sortOrder.value
  })
})

const paginatedFunds = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return sortedFunds.value.slice(start, end)
})

const sort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
}

const totalPages = computed(() => Math.ceil(sortedFunds.value.length / perPage.value))

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}

// Reset dateRange function
const resetDateRange = () => {
  dateRange.value = {
    start: null,
    end: null
  }
}

watch([selectedFundTypes, selectedTaxSaving, dateRange], () => {
  currentPage.value = 1 // Reset to first page when filters change
}, { deep: true })

watch([dateRange], () => {
  if (dateRange.value.start && dateRange.value.end) {
    currentPage.value = 1
  }
}, { deep: true })

watch([selectedTaxSaving], () => {
  currentPage.value = 1 // Reset pagination เมื่อเปลี่ยน filter
})
</script>

<style>
.min-h-screen {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}
</style>