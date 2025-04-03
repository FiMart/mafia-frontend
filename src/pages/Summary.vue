<template>
  <div class="min-h-screen">
    <Navbar />

    <!-- Update Loading Components -->
    <div v-if="isLoading || isSorting" class="loading-overlay">
      <Loading :message="isLoading ? 'กำลังโหลดข้อมูลกองทุน...' : 'กำลังเรียงลำดับข้อมูล...'"
        class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" />
    </div>

    <main class="container mx-auto py-6 px-4">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-white">
          สรุป<span class="text-green-500">พอร์ตการลงทุน</span>
        </h1>
        <p class="text-white text-sm">ภาพรวมกองทุนทั้งหมดในพอร์ตของคุณ</p>
      </div>

      <!-- Filters Section with improved layout -->
      <div class="mb-6 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h2 class="text-sm font-medium text-gray-800 mb-3">ตัวกรองข้อมูล</h2>

        <!-- <div class="space-y-4"> -->
        <!-- Fund Type Checkboxes -->
        <!-- <div class="filter-section" :class="{ 'opacity-60': isLoading }">
            <h3 class="text-sm font-medium text-gray-700 mb-2">ประเภทกองทุนรวม</h3>
            <div class="flex flex-wrap gap-2">
              <label v-for="type in fundTypes" :key="type" class="filter-checkbox"
                :class="{ 'filter-selected': selectedFundTypes.includes(type) }">
                <input type="checkbox" v-model="selectedFundTypes" :value="type" :disabled="isLoading || isSorting"
                  class="hidden" />
                <span>{{ type }}</span>
              </label>
            </div>
          </div> -->

        <!-- Horizontal divider -->
        <!-- <hr class="border-gray-200" /> -->

        <!-- Tax Saving Fund Radio -->
        <div class="filter-section">
          <h3 class="text-sm font-medium text-gray-700 mb-2">กองทุนลดหย่อนภาษี</h3>
          <div class="flex flex-wrap gap-2">
            <label class="filter-radio" :class="{ 'filter-selected': selectedFundTypes === 'ทั้งหมด' }">
              <input type="radio" v-model="selectedFundTypes" value="ทั้งหมด" class="hidden" />
              <span>ทั้งหมด</span>
            </label>
            <label v-for="type in fundTypes" :key="type" class="filter-radio"
              :class="{ 'filter-selected': selectedFundTypes === type }">
              <input type="radio" v-model="selectedFundTypes" :value="type" class="hidden" />
              <span>{{ type }}</span>
            </label>
          </div>
        </div>

        <!-- Search Input -->
        <div class="relative w-full max-w-xs mt-3">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input type="text" placeholder="ค้นหากองทุน" v-model="search"
            class="w-full py-1.5 pl-9 pr-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white border border-gray-200 text-gray-700 placeholder-gray-400 text-sm" />
        </div>
        <!-- </div> -->
      </div>

      <!-- Results Count -->
      <div class="mb-3 flex justify-between items-center">
        <div class="text-sm text-white">
          พบ <span class="font-medium">{{ filteredAndSortedFunds.length }}</span> รายการ
        </div>
      </div>

      <!-- Table Section -->
      <transition name="fade" mode="out-in">
        <div v-if="!isLoading && !isSorting" key="content" class="table-wrapper">
          <div class="mb-6 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200" ref="tableContainer">
            <table class="w-full table-fixed">
              <thead>
                <tr>
                  <th v-for="column in columns" :key="column.key" class="table-header">
                    <button class="flex items-center justify-center w-full text-sm" @click="sort(column.key)">
                      {{ column.label }}
                      <span v-if="sortKey === column.key" class="ml-1 sort-icon">
                        {{ sortOrder === 1 ? "▼" : "▲" }}
                      </span>
                      <span v-else class="ml-1 opacity-30">▼</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fund in paginatedFunds" :key="fund.fund_name" class="table-row hover:bg-gray-50 text-sm"
                  @click="highlightRow">
                  <td class="py-3 px-4 font-medium text-blue-700 cursor-pointer hover:underline truncate"
                    :title="fund.fund_name" @click="goToBuySell(fund.fund_name)">
                    {{ fund.fund_name }}
                  </td>
                  <td class="py-3 px-4 text-right font-medium" :class="{
                    'text-green-600': parseFloat(fund.gain_loss_percent) > 0,
                    'text-red-600': parseFloat(fund.gain_loss_percent) < 0,
                    'text-black': parseFloat(fund.gain_loss_percent) === 0
                  }">
                    {{
                      (parseFloat(fund.gain_loss_percent) > 0 ? "+" : "") +
                      parseFloat(fund.gain_loss_percent).toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })
                    }}
                  </td>
                  <td class="py-3 px-4 text-right font-medium" :class="{
                    'text-green-600': fund.gain_loss_value > 0,
                    'text-red-600': fund.gain_loss_value < 0,
                    'text-black': fund.gain_loss_value === 0
                  }">
                    {{
                      (parseFloat(fund.gain_loss_value) > 0 ? "+" : "") +
                      parseFloat(fund.gain_loss_value).toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })
                    }}
                  </td>
                  <td class="py-3 px-4 text-right font-mono money-cell">
                    <span class="highlight-number">{{ Number(fund.holding_value).toLocaleString("th-TH", {
                      minimumFractionDigits: 2, maximumFractionDigits: 2
                    }) }}</span>
                  </td>
                  <td class="py-3 px-4 text-right font-mono money-cell">
                    <span class="highlight-number">{{ Number(fund.cost).toLocaleString("th-TH", {
                      minimumFractionDigits:
                        2, maximumFractionDigits: 2
                    }) }}</span>
                  </td>
                  <td class="py-3 px-4 text-right font-mono">
                    {{ Number(fund.holding_units).toLocaleString("th-TH", {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    }) }}
                  </td>
                  <td class="py-3 px-4 text-right font-mono money-cell">
                    {{ Number(fund.present_nav).toLocaleString("th-TH", {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    }) }}
                    <!-- <span class="highlight-number">{{ Number(fund.present_nav).toLocaleString("th-TH") }}</span> ฿ -->
                  </td>
                  <td class="py-3 px-4 text-right font-mono">
                    {{ Number(fund.nav_average).toLocaleString("th-TH", {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    }) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else key="loading" class="py-20 text-center text-gray-500">
          <!-- Optional placeholder during loading -->
        </div>
      </transition>


      <!-- Empty state -->
      <div v-if="!isLoading && !isSorting && filteredAndSortedFunds.length === 0"
        class="py-10 bg-gray-50 rounded-lg text-center border border-gray-200 empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-gray-700 font-medium">ไม่พบข้อมูลกองทุน</h3>
        <p class="text-gray-500 text-sm">
          ลองเปลี่ยนเงื่อนไขการค้นหา หรือตรวจสอบตัวกรองข้อมูลของคุณ
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="!isLoading && !isSorting && filteredAndSortedFunds.length > 0"
        class="flex justify-between items-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
          ← ก่อนหน้า
        </button>

        <div class="text-sm text-white">
          หน้า <span class="font-medium">{{ currentPage }}</span> จาก
          <span class="font-medium">{{ totalPages }}</span>
        </div>

        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
          ถัดไป →
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import { useRouter } from 'vue-router';

const router = useRouter();

// Add loading states
const isLoading = ref(true);
const isSorting = ref(false);

const columns = [
  { key: "fund_name", label: "ชื่อกองทุน" },
  { key: "gain_loss_percent", label: "Gain/Loss (%)" },
  { key: "gain_loss_value", label: "Gain/Loss (บาท)" },
  { key: "holding_value", label: "มูลค่าปัจจุบัน (บาท)" },
  { key: "cost", label: "ต้นทุน (บาท)" },
  { key: "holding_units", label: "จำนวนหน่วยที่ถือ" },
  { key: "present_nav", label: "NAV ปัจจุบัน (บาท)" },
  { key: "nav_average", label: "NAV ต้นทุน (บาท)" },
];

const fundTypes = ["RMF", "SSF", "THAIESG"];
const selectedFundTypes = ref("ทั้งหมด");  // Default is "ทั้งหมด"

const funds = ref([]);

// Pagination and sorting
const currentPage = ref(1);
const perPage = ref(10);
const sortKey = ref("fund_name");
const sortOrder = ref(1);


// Retrieve JWT token and username from localStorage
const authToken = localStorage.getItem("jwtToken");
const username = localStorage.getItem("username");

// API Endpoint
const apiUrl = `/api/portfolio/user/${username}`;

const search = ref('');

const goToBuySell = async (name) => {
  var isNavigating = true;
  try {
    await router.push(`/buy-sell?name=${name}`);
  } catch (error) {
    console.error("Navigation error:", error);
  } finally {
    isNavigating = false;
  }
}
// Fetch API Data
const fetchPortfolio = async () => {
  if (!authToken) {
    console.error("No JWT token found in localStorage!");
    return;
  }

  isLoading.value = true;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    funds.value = data;
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch data when the component is mounted
onMounted(fetchPortfolio);

// Filter the funds based on selected filters
// const filterFunds = (fund) => {
//   if (search && search.trim() !== '') {
//     const keyword = search.toLowerCase();
//     result = result.filter((item) =>
//       item.fund_name.toLowerCase().includes(keyword)
//     );
//   }
//   // Filter by selected fund types
//   const matchesFundType =
//     selectedFundTypes.value === "ทั้งหมด" ||  // If "ทั้งหมด" is selected, show all
//     selectedFundTypes.value === fund.fund_type;  // Compare fund's type to selected type

//   return matchesFundType;
// };

const filterFunds = (fund) => {
  const keyword = search.value.toLowerCase().trim();

  const matchesSearch =
    !keyword || fund.fund_name.toLowerCase().includes(keyword);

  const matchesFundType =
    selectedFundTypes.value === "ทั้งหมด" ||
    fund.fund_type === selectedFundTypes.value;

  return matchesSearch && matchesFundType;
};


const filteredFunds = computed(() => {
  return funds.value.filter(filterFunds);
});
// Filtered and sorted funds
const filteredAndSortedFunds = computed(() => {

  let result = [...funds.value];

  // Apply the filter
  result = result.filter(filterFunds);

  // Sort data
  return result.sort((a, b) => {
    let comparison = 0;
    if (a[sortKey.value] > b[sortKey.value]) comparison = 1;
    if (a[sortKey.value] < b[sortKey.value]) comparison = -1;
    return comparison * sortOrder.value;
  });
});

// Paginated funds
const paginatedFunds = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredAndSortedFunds.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredAndSortedFunds.value.length / perPage.value)
);

// Sorting function
const sort = async (key) => {
  isSorting.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (sortKey.value === key) {
      sortOrder.value *= -1;
    } else {
      sortKey.value = key;
      sortOrder.value = 1;
    }
    currentPage.value = 1;
  } finally {
    isSorting.value = false;
  }
};

// Pagination functions
const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const goToPage = (pageNumber) => {
  if (pageNumber > 0 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
    // Scroll to the table
    const tableContainer = document.querySelector(".table-wrapper");
    if (tableContainer) {
      const tableTop = tableContainer.offsetTop;
      window.scrollTo({
        top: tableTop - 20,
        behavior: "smooth",
      });
    }
  }
};
</script>




<style scoped>
/* Loading Background */
.bg-opacity-80 {
  background-color: rgba(0, 0, 0, 0.8) !important;
}

/* Table Styles */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th {
  position: sticky;
  top: 0;
  z-index: 10;
}

tbody tr:nth-child(odd) {
  background-color: rgba(249, 250, 251);
}

tbody tr {
  transition: all 0.2s ease;
}

tbody tr:hover {
  background-color: rgba(229, 231, 235, 0.5);
}

/* Checkbox and Radio Styles */
input[type="checkbox"],
input[type="radio"] {
  cursor: pointer;
  height: 16px;
  width: 16px;
}

/* Button Styles */
button {
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
}

button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Improved Loading Animation */
@keyframes pulse {

  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}

.fixed {
  animation: fadeIn 0.3s ease-out;
}

.fixed>div {
  animation: pulse 1.5s infinite;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Basic Input and Select Fields */
input[type="checkbox"],
input[type="radio"],
select {
  cursor: pointer;
}

/* Basic Button Style */
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

/* Simple Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #e0e0e0;
}

::-webkit-scrollbar-thumb {
  background: #64748b;
}

/* Dropdown Basic Animation */
select {
  appearance: none;
  padding-right: 2rem;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em;
  transition: all 0.3s ease;
}

/* Dropdown Hover Effect */
select:hover {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

/* Dropdown Focus Effect */
select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

/* Dropdown Options Styling */
select option {
  padding: 0.5rem;
  background-color: white;
}

select option:hover {
  background-color: #f1f5f9;
}

/* Disabled State */
select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f1f5f9;
}

/* Main Background */
.min-h-screen {
  background-color: #f9fafb;
  min-height: 100vh;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Filter Tags */
.filter-section {
  transition: opacity 0.2s;
}

.filter-checkbox,
.filter-radio {
  display: inline-flex;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-checkbox:hover,
.filter-radio:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.filter-selected {
  background-color: #10b981;
  border-color: #10b981;
  color: white;
}

.filter-selected:hover {
  background-color: #059669;
  border-color: #059669;
  color: white;
}

/* Date inputs */
.date-input-group {
  display: flex;
  flex-direction: column;
}

.date-input {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: white;
  transition: all 0.2s;
}

.date-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.2);
}

.reset-button {
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.reset-button:hover {
  background-color: #e5e7eb;
}

/* Table styling */
.table-header {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 500;
  font-size: 0.875rem;
  color: white;
  background-color: #10b981;
  /* Solid green color instead of gradient */
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-row {
  border-bottom: 1px solid #f3f4f6;
}

.table-row:last-child {
  border-bottom: none;
}

.sort-icon {
  display: inline-block;
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

/* Pagination */
.pagination-button {
  background-color: white;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.pagination-button:not(:disabled):hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-1px);
}

/* Hover and active states */
button:not(:disabled) {
  cursor: pointer;
}

button:not(:disabled):active {
  transform: translateY(1px);
}

/* Font styling for numbers */
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* Adding subtle animations to the table rows */
.table-row {
  transition: all 0.2s ease;
}

.table-row:hover {
  background-color: #f0f9ff !important;
  transform: translateX(3px);
  box-shadow: -3px 0 0 0 #10b981;
}

/* Animated filter tags */
.filter-checkbox,
.filter-radio {
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.filter-checkbox::before,
.filter-radio::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(16, 185, 129, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
}

.filter-checkbox:active::before,
.filter-radio:active::before {
  width: 120px;
  height: 120px;
}

/* Animated button effects */
.reset-button,
.pagination-button {
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.reset-button::after,
.pagination-button::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #10b981;
  transition: width 0.3s;
}

.reset-button:hover::after,
.pagination-button:hover::after {
  width: 100%;
}

/* Better table header hover effects */
.table-header button {
  transition: all 0.2s;
  position: relative;
}

.table-header button:hover {
  color: #f0fff4;
  transform: translateX(2px);
}

.table-header button::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s;
}

.table-header button:hover::after {
  width: 100%;
}

/* Animated sort direction arrows */
.sort-icon {
  transition: transform 0.3s;
}

/* Fun card effect for the empty state */
@keyframes floatAnimation {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}

.empty-state {
  animation: floatAnimation 3s ease-in-out infinite;
}

/* Better table headers */
.table-header {
  background: #10b981;
  /* Change from gradient to solid color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Subtle scale effect on table cells containing money */
.money-cell {
  transition: all 0.3s;
}

.money-cell:hover {
  transform: scale(1.05);
  background-color: #f0fff4;
}

/* Beautiful focus effects for inputs */
input:focus {
  animation: pulse 1s;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }

  70% {
    box-shadow: 0 0 0 5px rgba(16, 185, 129, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

/* Page transition effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Loading indicator animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Money amount highlight */
.highlight-number {
  position: relative;
  display: inline-block;
}

.highlight-number:hover::after {
  content: "฿";
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  color: #10b981;
  font-weight: bold;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
