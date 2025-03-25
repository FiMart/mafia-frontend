<template>
<<<<<<< HEAD
  <div class="min-h-screen">
    <Navbar />

    <!-- Loading Components -->
    <div v-if="isLoading || isSorting" class="loading-overlay">
      <Loading :message="isLoading ? 'กำลังโหลดข้อมูลธุรกรรม...' : 'กำลังเรียงลำดับข้อมูล...'" />
    </div>

    <main class="container mx-auto py-6 px-4">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-white">
          ประวัติ<span class="text-green-500">การทำธุรกรรม</span>
        </h1>
        <p class="text-white text-sm">ติดตามประวัติการซื้อ-ขายกองทุนของคุณย้อนหลัง</p>
      </div>

      <!-- Filters Section with improved layout -->
      <div class="mb-6 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h2 class="text-lg font-medium text-gray-800 mb-3">ตัวกรองข้อมูล</h2>

        <div class="space-y-4">
          <!-- Fund Type Filter -->
          <div class="filter-section" :class="{ 'opacity-60': isLoading }">
            <h3 class="text-sm font-medium text-gray-700 mb-2">ประเภทกองทุนรวม</h3>
            <div class="flex flex-wrap gap-2">
              <label v-for="type in fundTypes" :key="type" class="filter-checkbox"
                :class="{ 'filter-selected': selectedFundTypes.includes(type) }">
                <input type="checkbox" v-model="selectedFundTypes" :value="type" :disabled="isLoading || isSorting"
                  class="hidden" />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>

          <!-- Horizontal divider -->
          <hr class="border-gray-200" />

          <!-- Tax Saving Fund Filter -->
          <div class="filter-section">
            <h3 class="text-sm font-medium text-gray-700 mb-2">กองทุนลดหย่อนภาษี</h3>
            <div class="flex flex-wrap gap-2">
              <label class="filter-radio" :class="{ 'filter-selected': selectedTaxSaving === 'ทั้งหมด' }">
                <input type="radio" v-model="selectedTaxSaving" value="ทั้งหมด" class="hidden" />
                <span>ทั้งหมด</span>
              </label>
              <label v-for="type in taxSavingTypes" :key="type" class="filter-radio"
                :class="{ 'filter-selected': selectedTaxSaving === type }">
                <input type="radio" v-model="selectedTaxSaving" :value="type" class="hidden" />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>

          <!-- Horizontal divider -->
          <hr class="border-gray-200" />

          <!-- Date Range Filter -->
          <div class="filter-section">
            <h3 class="text-sm font-medium text-gray-700 mb-2">ระยะเวลา</h3>
            <div class="flex flex-wrap items-center gap-3">
              <div class="date-input-group">
                <span class="text-xs text-gray-500">จาก</span>
                <input type="date" v-model="dateRange.start" :max="dateRange.end" class="date-input" />
              </div>
              <div class="date-input-group">
                <span class="text-xs text-gray-500">ถึง</span>
                <input type="date" v-model="dateRange.end" :min="dateRange.start" class="date-input" />
              </div>
              <button @click="resetDateRange" class="reset-button">ล้างข้อมูล</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-3 flex justify-between items-center">
        <div class="text-sm text-white">
          พบ <span class="font-medium">{{ sortedFunds.length }}</span> รายการ
        </div>
      </div>

      <!-- Table Section - Remove horizontal scroll -->
      <transition name="fade" mode="out-in">
        <div v-if="!isLoading && !isSorting" key="content" class="table-wrapper">
          <div class="mb-6 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200" ref="tableContainer">
            <!-- Remove the overflow-x-auto div wrapper that causes horizontal scrolling -->
            <table class="w-full table-fixed">
              <thead>
                <tr>
                  <!-- Set specific widths for each column to better control the layout -->
                  <th class="table-header w-1/4">
                    <button class="flex items-center" @click="sort('fund_name')">
                      ชื่อกองทุน
                      <span v-if="sortKey === 'fund_name'" class="ml-1 sort-icon">
                        {{ sortOrder === 1 ? "▼" : "▲" }}
                      </span>
                      <span v-else class="ml-1 opacity-30">▼</span>
                    </button>
                  </th>
                  <th class="table-header w-1/12">
                    <button class="flex items-center" @click="sort('transaction_type')">
                      ประเภท
                      <span v-if="sortKey === 'transaction_type'" class="ml-1 sort-icon">
                        {{ sortOrder === 1 ? "▼" : "▲" }}
                      </span>
                      <span v-else class="ml-1 opacity-30">▼</span>
                    </button>
                  </th>
                  <th class="table-header w-1/12">
                    <button class="flex items-center" @click="sort('gain_loss_percent')">
                      %G/L
                      <span v-if="sortKey === 'gain_loss_percent'" class="ml-1 sort-icon">
                        {{ sortOrder === 1 ? "▼" : "▲" }}
                      </span>
                      <span v-else class="ml-1 opacity-30">▼</span>
                    </button>
                  </th>
                  <th class="table-header w-1/8">
                    <button class="flex items-center" @click="sort('units_processed')">
                      จำนวนหน่วย
                      <span v-if="sortKey === 'units_processed'" class="ml-1 sort-icon">
                        {{ sortOrder === 1 ? "▼" : "▲" }}
                      </span>
                      <span v-else class="ml-1 opacity-30">▼</span>
                    </button>
                  </th>
                  <th class="table-header w-1/12">
                    <button class="flex items-center" @click="sort('processed_nav')">
                      NAV
                      <span v-if="sortKey === 'processed_nav'" class="ml-1 sort-icon">
                        {{ sortOrder === 1 ? "▼" : "▲" }}
                      </span>
                      <span v-else class="ml-1 opacity-30">▼</span>
                    </button>
                  </th>
                  <th class="table-header w-1/8">
                    <button class="flex items-center" @click="sort('amount_processed')">
                      จำนวนเงิน
                      <span v-if="sortKey === 'amount_processed'" class="ml-1 sort-icon">
                        {{ sortOrder === 1 ? "▼" : "▲" }}
                      </span>
                      <span v-else class="ml-1 opacity-30">▼</span>
                    </button>
                  </th>
                  <th class="table-header w-1/6">
                    <button class="flex items-center" @click="sort('transaction_date')">
                      วันที่
                      <span v-if="sortKey === 'transaction_date'" class="ml-1 sort-icon">
                        {{ sortOrder === 1 ? "▼" : "▲" }}
                      </span>
                      <span v-else class="ml-1 opacity-30">▼</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fund in paginatedFunds" :key="fund.fundName" class="table-row hover:bg-gray-50"
                  @click="highlightRow">
                  <!-- Adjust the cell content to prevent overflow -->
                  <td class="py-3 px-4 font-medium text-blue-700 cursor-pointer hover:underline truncate"
                    :title="fund.fund_name">
                    {{ fund.fund_name }}
                  </td>
                  <td class="py-3 px-4">
                    <span :class="{
                      'bg-green-100 text-green-800': fund.transaction_type === 1,
                      'bg-red-100 text-red-800': fund.transaction_type === 2,
                    }" class="py-1 px-2 rounded-full text-xs font-medium">
                      {{ transaction_type_str(fund.transaction_type) }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <span :class="parseFloat(fund.gain_loss_percent) >= 0 ? 'text-green-600' : 'text-red-600'"
                      class="font-medium">
                      {{ parseFloat(fund.gain_loss_percent) >= 0 ? "+" : "" }}
                      {{ parseFloat(fund.gain_loss_percent).toFixed(2) }}%
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right font-mono">
                    {{
                      Number(fund.units_processed).toLocaleString("th-TH", {
                        maximumFractionDigits: 4,
                      })
                    }}
                  </td>
                  <td class="py-3 px-4 text-right font-mono">
                    {{
                      Number(fund.processed_nav).toLocaleString("th-TH", {
                        maximumFractionDigits: 4,
                      })
                    }}
                  </td>
                  <td class="py-3 px-4 text-right font-mono money-cell">
                    <span class="highlight-number">
                      {{
                        Number(fund.amount_processed).toLocaleString("th-TH", {
                          maximumFractionDigits: 2,
                        })
                      }}
                    </span>
                    ฿
                  </td>
                  <td class="py-3 px-4">{{ formatDate(fund.transaction_date) }}</td>
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
      <div v-if="!isLoading && !isSorting && sortedFunds.length === 0"
        class="py-10 bg-gray-50 rounded-lg text-center border border-gray-200 empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-gray-700 font-medium">ไม่พบข้อมูลธุรกรรม</h3>
        <p class="text-gray-500 text-sm">
          ลองเปลี่ยนเงื่อนไขการค้นหา หรือตรวจสอบตัวกรองข้อมูลของคุณ
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="!isLoading && !isSorting && sortedFunds.length > 0" class="flex justify-between items-center mt-4">
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
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        </button>
      </div>
    </main>
  </div>
</template>

<<<<<<< HEAD
<script>
import { ref, computed, watch } from "vue";
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "FundTable",
  components: {
    Navbar,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      isSorting: false,
      columns: [
        { key: "fund_name", label: "ชื่อกองทุน" },
        { key: "transaction_type", label: "ประเภทธุรกรรม" },
        { key: "gain_loss_percent", label: "%G/L" },
        { key: "units_processed", label: "จำนวนหน่วย" },
        { key: "processed_nav", label: "NAV" },
        { key: "amount_processed", label: "จำนวนเงิน" },
        { key: "transaction_date", label: "วันที่" },
      ],
      funds: [],
      fundTypes: [
        "กองทุนรวมตลาดเงินในประเทศ",
        "กองทุนรวมตลาดเงินต่างประเทศ",
        "กองทุนรวมพันธบัตรรัฐบาล",
        "กองทุนรวมตราสารหนี้",
        "กองทุนรวมผสม",
        "กองทุนรวมตราสารทุน",
        "กองทุนรวมหมวดอุตสาหกรรม",
        "กองทุนรวมสินทรัพย์ทางเลือก",
      ],
      taxSavingTypes: ["RMF", "SSF", "ThaiESG"],
      selectedFundTypes: [],
      selectedTaxSaving: "ทั้งหมด",
      dateRange: { start: null, end: null },
      currentPage: 1,
      perPage: 10,
      sortKey: "fundName",
      sortOrder: 1,
    };
  },
  computed: {
    filteredData() {
      let result = this.funds;

      if (this.selectedFundTypes.length > 0) {
        result = result.filter((fund) => this.selectedFundTypes.includes(fund.type));
      }

      if (this.selectedTaxSaving !== "ทั้งหมด") {
        result = result.filter((fund) => fund.taxSaving === this.selectedTaxSaving);
      }

      if (this.dateRange.start && this.dateRange.end) {
        const startDate = new Date(this.dateRange.start);
        const endDate = new Date(this.dateRange.end);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        result = result.filter((fund) => {
          const fundDate = new Date(fund.date);
          return fundDate >= startDate && fundDate <= endDate;
        });
      }

      return result;
    },
    sortedFunds() {
      const filtered = [...this.filteredData];

      return filtered.sort((a, b) => {
        const valueA = a[this.sortKey];
        const valueB = b[this.sortKey];

        if (!valueA && valueB) return 1;
        if (valueA && !valueB) return -1;
        if (!valueA && !valueB) return 0;

        if (this.sortKey === "date") {
          return (new Date(valueA) - new Date(valueB)) * this.sortOrder;
        }

        if (this.sortKey === "type") {
          return valueA.localeCompare(valueB, "th") * this.sortOrder;
        }

        if (this.sortKey === "gainLoss") {
          const numA = parseFloat(valueA);
          const numB = parseFloat(valueB);
          return (numA - numB) * this.sortOrder;
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
          return (valueA - valueB) * this.sortOrder;
        }

        return valueA.localeCompare(valueB, "th") * this.sortOrder;
      });
    },
    paginatedFunds() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = Math.min(startIndex + this.perPage, this.sortedFunds.length);
      return this.sortedFunds.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.sortedFunds.length / this.perPage);
    },
  },
  methods: {
    transaction_type_str(type) {
      if (type == 1) return "ซื้อ";
      if (type == 2) return "ขาย";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    formatValue(value, unit = "") {
      if (value === null || value === undefined || value === "") {
        return "-";
      }
      return unit ? `${value} ${unit}` : value;
    },
    async sort(key) {
      this.isSorting = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Add small delay for UX
        if (this.sortKey === key) {
          this.sortOrder *= -1;
        } else {
          this.sortKey = key;
          this.sortOrder = 1;
        }
        this.currentPage = 1;
      } finally {
        this.isSorting = false;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    },
    async resetDateRange() {
      this.isLoading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Small delay for UX
        this.dateRange = { start: null, end: null };
      } finally {
        this.isLoading = false;
      }
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const username = localStorage.getItem("username");
        console.log("fetch api");
        try {
          // Fetch ข้อมูล fund หลัก
          const response = await fetch(`/api/transaction/user/${username}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Fetched API data:", data);
          this.funds = data;
        } catch (error) {
          console.error("Failed to fetch API data:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    highlightRow(event) {
      // Optional method to highlight the current row
      const rows = document.querySelectorAll(".table-row");
      rows.forEach((row) => row.classList.remove("bg-green-50"));
      event.currentTarget.classList.add("bg-green-50");
    },

    // Add smooth scrolling to top after pagination
    goToPage(pageNumber) {
      if (pageNumber > 0 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;

        // Smooth scroll to table top
        const tableTop = this.$refs.tableContainer.offsetTop;
        window.scrollTo({
          top: tableTop - 20,
          behavior: "smooth",
        });
      }
    },
  },
  mounted() {
    this.fetchData();
    // document.addEventListener("click", this.handleClickOutside);
  },
  watch: {
    selectedFundTypes: {
      async handler() {
        this.isLoading = true;
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          this.currentPage = 1;
        } finally {
          this.isLoading = false;
        }
      },
      deep: true,
    },
    selectedTaxSaving() {
      this.currentPage = 1;
    },
    dateRange: {
      async handler() {
        this.isLoading = true;
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          this.currentPage = 1;
        } finally {
          this.isLoading = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
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
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
