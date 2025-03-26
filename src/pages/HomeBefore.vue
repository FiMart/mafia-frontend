<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavbarBefore />

    <!-- Loading Indicator -->
    <Loading v-if="isNavigating || isSorting || isLoading" message="กำลังโหลดข้อมูล..."
      class="fixed inset-0 bg-black/50 z-50 text-white" />

    <div class="flex-1 container mx-auto p-10">
      <div class="bg-white rounded-lg shadow p-6 mb-6">

        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-xl font-bold text-gray-800">แนะนำกองทุนจากผลประกอบการย้อนหลัง</h1>
          <p class="text-gray-600 text-sm mt-1">
            ค้นหาและเปรียบเทียบกองทุนเพื่อการลงทุนที่ตรงกับความต้องการของคุณ
          </p>
        </div>

        <!-- Search Bar -->
        <div class="mb-4">
          <div class="relative">
            <input type="text" placeholder="ค้นหากองทุนโดยชื่อ..." v-model="search"
              class="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500" />
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-3 gap-3 mb-5">
          <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <p class="text-sm text-gray-500 mb-1">จำนวนกองทุนทั้งหมด</p>
            <p class="text-lg font-bold text-gray-800">{{ apiData?.length || 0 }}</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <p class="text-sm text-gray-500 mb-1">เสี่ยงต่ำ</p>
            <p class="text-lg font-bold text-gray-800">
              {{apiData?.filter(item => item.fund_risk <= 3).length || 0}} </p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <p class="text-sm text-gray-500 mb-1">เสี่ยงสูง</p>
            <p class="text-lg font-bold text-gray-800">
              {{apiData?.filter(item => item.fund_risk >= 6).length || 0}}
            </p>
          </div>
        </div>

        <!-- Fund Table -->
        <div class="overflow-x-auto border border-gray-200 rounded-lg mb-4">
          <table class="w-full">
            <thead>
              <tr class="bg-green-500 border-b border-gray-200 text-white">
                <th class="p-3 text-center font-medium">
                  <button @click="sort('fund_name')" class="flex items-center justify-center w-full">
                    ชื่อกองทุน
                    <span v-if="sortKey === 'fund_name'" class="ml-1">
                      <svg class="h-3 w-3 transform" :class="{ 'rotate-180': sortOrder === -1 }"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </span>
                  </button>
                </th>
                <th class="p-3 text-center font-medium">
                  <button @click="sort('fund_risk')" class="flex items-center justify-center w-full">
                    ความเสี่ยง
                    <span v-if="sortKey === 'fund_risk'" class="ml-1">
                      <svg class="h-3 w-3 transform" :class="{ 'rotate-180': sortOrder === -1 }"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </span>
                  </button>
                </th>
                <th class="p-3 text-center font-medium">
                  <button @click="sort('one_year_roc')" class="flex items-center justify-center w-full">
                    ผลตอบแทนย้อนหลัง 1 ปี (%)
                    <span v-if="sortKey === 'one_year_roc'" class="ml-1">
                      <svg class="h-3 w-3 transform" :class="{ 'rotate-180': sortOrder === -1 }"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </span>
                  </button>
                </th>
                <th class="p-3 text-center font-medium">
                  <button @click="sort('five_year_roc')" class="flex items-center justify-center w-full">
                    ผลตอบแทนย้อนหลัง 5 ปี (%)
                    <span v-if="sortKey === 'five_year_roc'" class="ml-1">
                      <svg class="h-3 w-3 transform" :class="{ 'rotate-180': sortOrder === -1 }"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </span>
                  </button>
                </th>
                <th class="p-3 text-center font-medium">
                  <button @click="sort('ten_year_roc')" class="flex items-center justify-center w-full">
                    ผลตอบแทนย้อนหลัง 10 ปี (%)
                    <span v-if="sortKey === 'ten_year_roc'" class="ml-1">
                      <svg class="h-3 w-3 transform" :class="{ 'rotate-180': sortOrder === -1 }"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </span>
                  </button>
                </th>
                <th class="p-3 text-center font-medium">
                  <button @click="sort('std_one_year')" class="flex items-center justify-center w-full">
                    SD
                    <span v-if="sortKey === 'std_one_year'" class="ml-1">
                      <svg class="h-3 w-3 transform" :class="{ 'rotate-180': sortOrder === -1 }"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </span>
                  </button>
                </th>
                <th class="p-3 text-center font-medium">
                  <button @click="sort('sharpe_ratio_one_year')" class="flex items-center justify-center w-full">
                    Sharp Ratio
                    <span v-if="sortKey === 'sharpe_ratio_one_year'" class="ml-1">
                      <svg class="h-3 w-3 transform" :class="{ 'rotate-180': sortOrder === -1 }"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sortedData" :key="item.id" :class="['border-b border-gray-200 hover:bg-gray-50',
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50']">
                <td @click="handleFundClick(item.fund_name)" class="p-3 text-left cursor-pointer hover:text-blue-600 font-medium">
                  {{ item.fund_name }}
                </td>
                <td class="p-3 text-center">
                  <span class="inline-block px-2 py-1 text-xs font-medium rounded" :class="{
                    'bg-blue-100 text-blue-800': item.fund_risk <= 3,
                    'bg-green-100 text-green-800': item.fund_risk > 3 && item.fund_risk <= 5,
                    'bg-yellow-100 text-yellow-800': item.fund_risk > 5 && item.fund_risk <= 7,
                    'bg-red-100 text-red-800': item.fund_risk > 7,
                  }">
                    {{ item.fund_risk }}
                  </span>
                </td>
                <td class="px-10 text-right text-gray-600">{{ item.one_year_roc.toFixed(2) }}</td>
                <td class="px-10 text-right text-gray-600">{{ item.five_year_roc.toFixed(2) }}</td>
                <td class="px-10 text-right text-gray-600">{{ item.ten_year_roc.toFixed(2) }}</td>
                <td class="px-10 text-right text-gray-600">{{ item.std_one_year.toFixed(2) }}</td>
                <td class="px-10 text-right text-gray-600">{{ item.sharpe_ratio_one_year.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-600">
            แสดงทั้งหมด {{ sortedData?.length || 0 }} รายการ จากฐานข้อมูลกองทุน {{ apiData?.length || 0 }} กองทุน
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavbarBefore from "@/components/NavbarBefore";
import Loading from "@/components/Loading";
import { useToast } from "vue-toastification";

export default {
  name: "HomeBefore",
  components: {
    NavbarBefore,
    Loading,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      isLoading: true,
      isSorting: false,
      isNavigating: false,
      apiData: [],
      search: "",
      sortKey: "fund_name",
      sortOrder: 1,
      headers: {
        fund_name: "ชื่อกองทุน",
        fund_risk: "ความเสี่ยง",
        one_year_roc: "ตอบแทนย้อน 1 ปี (%)",
        five_year_roc: "ตอบแทนย้อน 5 ปี (%) (Annualized)",
        ten_year_roc: "ตอบแทนย้อน 10 ปี (%) (Annualized)",
        std_one_year: "SD (จากข้อมูล 1 ปี)",
        sharpe_ratio_one_year: "Sharp Ratio (ของปีนั้น)",
      },
    };
  },
  computed: {
    // Filter data based on search input (always returns an array)
    filteredData() {
      return (this.apiData || []).filter((item) =>
        item.fund_name?.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    // Sorts the filtered data
    // 2️⃣ เรียงลำดับข้อมูลตาม sortKey (รวมถึง fund_risk)
    sortedData() {
      return [...this.filteredData].sort((a, b) => {
        const valueA = a[this.sortKey];
        const valueB = b[this.sortKey];

        // 🛠 กรณีเป็นตัวอักษร -> ใช้ localeCompare() (เช่น fund_name)
        if (typeof valueA === "string" && typeof valueB === "string") {
          return valueA.localeCompare(valueB) * this.sortOrder;
        }

        // 🛠 กรณีเป็นตัวเลข -> ใช้คำนวณปกติ (เช่น fund_risk)
        return (valueA - valueB) * this.sortOrder;
      });
    },
    // Sorts the filtered data
    filteredAndSortedData() {
      return [...this.filteredData].sort((a, b) => {
        if (typeof a[this.sortKey] === "string") {
          return a[this.sortKey].localeCompare(b[this.sortKey]) * this.sortOrder;
        }
        return (a[this.sortKey] - b[this.sortKey]) * this.sortOrder;
      });
    }
  },
  methods: {
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }

      // Added slight delay for smooth UI effect
      this.isSorting = true;
      setTimeout(() => {
        this.isSorting = false;
      }, 200);
    },
    // Optimized API Fetching with better error handling
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await fetch("/api/performance-mutual-funds/all-with-risk");
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        this.apiData = Array.isArray(data) ? data : []; // Ensure it's always an array
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.toast.error("ไม่สามารถโหลดข้อมูลกองทุนได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        this.isLoading = false;
      }
    },
    // Optimized function to handle fund click
    async handleFundClick() {
      this.toast.warning("จำเป็นต้องเข้าสู่ระบบก่อน", {
        timeout: 1000,
        position: "top-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: "button",
        icon: true,
      });

      // Delay before navigating
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.goToLogin();
    },
    // Optimized function to navigate to login
    async goToLogin() {
      if (this.isNavigating) return; // Prevent multiple clicks

      this.isNavigating = true;
      try {
        await this.$router.push("/login");
      } catch (error) {
        console.error("Navigation error:", error);
        this.toast.error("เกิดข้อผิดพลาดในการนำทาง");
      } finally {
        this.isNavigating = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
/* Replace the clean white background with a background image and overlay */
.min-h-screen {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/images/bg1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Remove this since we want the background image */
/* .min-h-screen::before {
  content: none;
} */

/* Main content container with slightly translucent white background for better contrast against the image */
.flex-1>div {
  background-color: rgba(255, 255, 255, 0.95) !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(5px) !important;
  /* Slight blur for better readability */
}

/* Keep the colorful stat cards as they are */
.grid-cols-2.md\:grid-cols-4>div:nth-child(1) {
  background: linear-gradient(135deg, #4f46e5, #6366f1) !important;
  color: white;
  border: none !important;
}

.grid-cols-2.md\:grid-cols-4>div:nth-child(2) {
  background: linear-gradient(135deg, #10b981, #34d399) !important;
  color: white;
  border: none !important;
}

.grid-cols-2.md\:grid-cols-4>div:nth-child(3) {
  background: linear-gradient(135deg, #3b82f6, #60a5fa) !important;
  color: white;
  border: none !important;
}

.grid-cols-2.md\:grid-cols-4>div:nth-child(4) {
  background: linear-gradient(135deg, #f59e0b, #fbbf24) !important;
  color: white;
  border: none !important;
}

/* Rest of your styles remain the same */
/* Text color for stat cards */
.grid-cols-2.md\:grid-cols-4 p.text-sm.text-gray-500,
.grid-cols-2.md\:grid-cols-4 p.text-lg.font-bold {
  color: white !important;
  text-shadow: none;
}

/* Table container with solid background */
.overflow-x-auto,
.overflow-y-auto {
  background-color: #ffffff !important;
  backdrop-filter: none;
  border: 1px solid #e5e7eb;
  /* Light gray border */
}

/* Table header */
thead tr.bg-green-500 {
  background-color: #10b981 !important;
}

/* Table rows with solid background */
tbody tr:nth-child(even) {
  background-color: #f9fafb !important;
}

tbody tr:nth-child(odd) {
  background-color: #ffffff !important;
}

/* Table row hover with clean effect */
tbody tr:hover {
  background-color: #f0f9ff !important;
  box-shadow: none;
}

/* Button styles */
.bg-green-600 {
  background-color: #10b981 !important;
  background-image: none;
}

.bg-green-600:hover {
  background-color: #059669 !important;
  opacity: 1;
}

/* Remove text shadows */
h1.text-gray-800,
p.text-gray-600,
.text-gray-500,
td.text-gray-800,
td.text-gray-600 {
  text-shadow: none;
}

/* Clean scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

/* Make stat cards rounded and add shadow */
.grid-cols-2.md\:grid-cols-4>div {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.grid-cols-2.md\:grid-cols-4>div:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

/* Update the existing stat card styles to match the grid-cols-3 class */

/* First card - Purple gradient for "จำนวนกองทุนทั้งหมด" */
.grid-cols-3>div:nth-child(1) {
  background: linear-gradient(135deg, #4f46e5, #6366f1) !important;
  color: white;
  border: none !important;
}

/* Second card - Green gradient for "เสี่ยงต่ำ" */
.grid-cols-3>div:nth-child(2) {
  background: linear-gradient(135deg, #10b981, #34d399) !important;
  color: white;
  border: none !important;
}

/* Third card - Blue/orange gradient for "เสี่ยงสูง" */
.grid-cols-3>div:nth-child(3) {
  background: linear-gradient(135deg, #f59e0b, #fbbf24) !important;
  color: white;
  border: none !important;
}

/* Update the text color for these cards */
.grid-cols-3 p.text-sm.text-gray-500,
.grid-cols-3 p.text-lg.font-bold {
  color: white !important;
  text-shadow: none;
}

/* Update the hover effect for the cards */
.grid-cols-3>div {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.grid-cols-3>div:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

/* The following styles are no longer needed since we're using grid-cols-3 instead of grid-cols-2.md:grid-cols-4 */
</style>
