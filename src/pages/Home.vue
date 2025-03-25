<template>
<<<<<<< HEAD
  <div class="min-h-screen">
    <Navbar />
    <div class="p-10">
      <div class="bg-white p-5 rounded-lg">

        <!-- Loading Overlay for Navigation -->
        <div v-if="isNavigating" class="loading-overlay">
          <Loading message="กำลังนำทางไปยังหน้าซื้อขาย..." />
        </div>

        <!-- Simplified Hero Section -->
        <div class="mb-4">
          <h1 class="text-2xl font-semibold text-gray-800">กองทุนรวมที่ใช่สำหรับคุณ</h1>
          <p class="text-gray-600 text-sm">
            เลือกลงทุนกับกองทุนที่เหมาะสมกับเป้าหมายทางการเงินของคุณ
          </p>
        </div>

        <!-- Simplified Section Header -->
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold text-gray-800">แนะนำกองทุนที่เหมาะกับความต้องการของคุณ</h2>
          <span class="bg-green-500 text-white text-xs px-2 py-1 rounded">
            Recommended
          </span>
        </div>

        <!-- Recommended Funds Section -->
        <!-- Carousel Container -->
        <div class="relative bg-white px-6 py-4  border border-gray-200 shadow-lg overflow-hidden">

          <!-- ปุ่ม Prev -->
          <button @click="prevSlide"
            class="absolute left-0 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white text-sm  flex items-center justify-center transition-all duration-300 z-20"
            :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }" :disabled="currentSlide === 0">
            &lt;
          </button>

          <!-- ปุ่ม Next -->
          <button @click="nextSlide"
            class="absolute right-0 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center rounded-l-lg transition-all duration-300 z-20"
            :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= chunkedFunds.length - 1 }"
            :disabled="currentSlide >= chunkedFunds.length - 1">
            &gt;
          </button>

          <!-- Funds grid section -->
          <div class="overflow-hidden px-1">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div
                v-for="(chunk, chunkIndex) in chunkedFunds"
                :key="chunkIndex"
                class="w-full flex-shrink-0"
              >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <!-- Simplified Fund Cards -->
                  <div
                    v-for="fund in chunk"
                    :key="fund.fund_name"
                    class="bg-white rounded-lg p-3 border border-gray-200 hover:border-green-500"
                    @click="goToBuySell(fund.fund_name)"
                  >
                    <!-- Fund Header -->
                    <div class="flex justify-between items-start mb-2">
                      <div>
                        <h3 class="text-base font-semibold text-gray-800">
                          {{ fund.fund_name }}
                        </h3>
                        <p class="text-gray-500 text-xs">
                          ระยะเวลา: {{ getPeriodText(fund.used_period) }}
                        </p>
                      </div>
                      <span
                        class="px-1.5 py-0.5 text-xs font-medium rounded"
                        :class="getRiskClass(fund.fund_risk)"
                      >
                        ความเสี่ยง {{ fund.fund_risk }}
                      </span>
                    </div>

                    <!-- Simplified Stats -->
                    <div class="grid grid-cols-3 gap-2 mt-2">
                      <div class="border border-gray-100 rounded p-2 bg-gray-50">
                        <p class="text-xs text-white mb-1">ผลตอบแทน</p>
                        <p
                          :class="fund.roc >= 0 ? 'text-white' : 'text-white'"
                          class="font-medium"
                        >
                          {{ fund.roc >= 0 ? "+" : "" }}{{ fund.roc.toFixed(2) }}%
                        </p>
                      </div>

                      <div class="border border-gray-100 rounded p-2 bg-gray-50">
                        <p class="text-xs text-white mb-1">Sharp Ratio</p>
                        <p class="font-medium text-white">
                          {{ fund.sharpe_ratio.toFixed(2) }}
                        </p>
                      </div>

                      <div class="border border-gray-100 rounded p-2 bg-gray-50">
                        <p class="text-xs text-white mb-1">ความผันผวน</p>
                        <p class="font-medium text-white">{{ fund.std.toFixed(2) }}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dot Navigation -->
          <div class="flex justify-center mt-4 space-x-1">
            <span v-for="n in chunkedFunds.length" :key="n" @click="goToSlide(n - 1)"
              class="h-1.5 w-6 rounded-full cursor-pointer transition-all duration-300" :class="currentSlide === n - 1
                ? 'bg-green-600'
                : 'bg-gray-300 hover:bg-gray-400'"></span>
          </div>
        </div>


        <!-- Funds Table Section -->
        <div class="mb-4 mt-4 relative">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-gray-800">กองทุนทั้งหมด</h2>
          </div>

          <!-- Search Input -->
          <div class="relative w-full max-w-xs">
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
        </div>

        <!-- Loading State for Initial Data Fetch and Sorting -->
        <div v-if="isLoading" class="loading-overlay">
          <Loading :message="loadingMessage" />
        </div>

        <!-- Simplified Table -->
        <div class="overflow-hidden rounded-xl border border-gray-200 shadow-lg bg-white">
          <table v-if="!isLoading" class="w-full">
            <thead>
              <tr class="bg-green-500 text-white">
                <th v-for="(header, key) in headers" :key="key" class="py-2 px-3 text-xs font-medium text-left">
                  <span class="cursor-pointer flex items-center" @click="sort(key)">
                    {{ header }}
                    <span v-if="sortKey === key" class="ml-1 inline-block">
                      {{ sortOrder === 1 ? "▲" : "▼" }}
                    </span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in sortedData" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
                <td @click="goToBuySell(item.fund_name)"
                  class="py-2 px-3 cursor-pointer hover:text-green-600 font-medium">
                  {{ item.fund_name }}
                </td>
                <td class="py-2 px-3">
                  <span class="px-1.5 py-0.5 rounded text-xs font-medium" :class="getRiskClass(item.fund_risk)">
                    {{ item.fund_risk }}
                  </span>
                </td>
                <td class="py-2 px-3 text-right">{{ item.one_year_roc || "-" }}%</td>
                <td class="py-2 px-3 text-right">{{ item.five_year_roc || "-" }}%</td>
                <td class="py-2 px-3 text-right">{{ item.ten_year_roc || "-" }}%</td>
                <td class="py-2 px-3 text-right">
                  {{ item.std_one_year || "-" }}
                </td>
                <td class="py-2 px-3 text-right font-medium" :class="getSharpRatioClass(item.sharpe_ratio_one_year)">
                  {{ item.sharpe_ratio_one_year || "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
=======
  <div class="min-h-screen bg-gray-100">
    <!-- นำ Navbar มาแสดง -->
    <Navbar />
    <main class="container mx-auto py-10">
      <h1 class="text-2xl font-bold mb-6 text-white">แนะนำกองทุนแบบจัดอันดับ</h1>
      <div class="mb-4 relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src="@/assets/icon/magnifying-glass.png" alt="Search Icon" class="h-6 w-6" />
        </div>
        <input
          type="text"
          placeholder="ค้นหากองทุน"
          v-model="search"
          class="w-full p-2 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <table class="w-full bg-white border rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr class="bg-green-500 text-white">
            <th v-for="(header, key) in headers" :key="key" class="py-2 px-4 text-sm">
              <span class="cursor-pointer" @click="sort(key)">
                {{ header }}
                <span v-if="sortKey === key">
                  {{ sortOrder === 1 ? '▲' : '▼' }}
                </span>
                <span v-else>▼</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedData" :key="item.id" class="odd:bg-gray-100 even:bg-white hover:bg-gray-300">
            <td 
              @click="goToBuySell(item.name)" 
              class="py-2 px-4 text-center hover:underline cursor-pointer hover:text-green-500"
            >
              {{ item.name }}
            </td>
            <td class="py-2 px-4 text-center">{{ item.category }}</td>
            <td class="py-2 px-4 text-center">{{ item.oneYearReturn }}</td>
            <td class="py-2 px-4 text-center">{{ item.fiveYearReturn }}</td>
            <td class="py-2 px-4 text-center">{{ item.tenYearReturn }}</td>
            <td class="py-2 px-4 text-center">{{ item.standardDeviation }}</td>
            <td class="py-2 px-4 text-center">{{ item.sharpRatio }}</td>
          </tr>
        </tbody>
      </table>
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
<<<<<<< HEAD
import Loading from "@/components/Loading";

=======
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
export default {
  name: "Home",
  components: {
    Navbar,
<<<<<<< HEAD
    Loading,
  },
  data() {
    return {
      isLoading: true,
      isNavigating: false,
      loadingMessage: "กำลังโหลดข้อมูลกองทุน...",
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
      recommendedFunds: [
        // {
        //   fund_name: "BGOLDRMF",
        //   fund_risk: "8",
        //   roc: 11.65,
        //   sharpe_ratio: 0.92,
        //   std: 12.95,
        //   used_period: "five_year",
        // },
        // {
        //   fund_name: "B-INNOTECHRMF",
        //   fund_risk: "7",
        //   roc: 12.91,
        //   sharpe_ratio: 0.95,
        //   std: 15.6,
        //   used_period: "one_year",
        // },
        // {
        //   fund_name: "B-INNOTECHSSF",
        //   fund_risk: "7",
        //   roc: 14.26,
        //   sharpe_ratio: 0.89,
        //   std: 18.27,
        //   used_period: "three_year",
        // },
        // {
        //   fund_name: "B-SI-THAIESG",
        //   fund_risk: "6",
        //   roc: 10.5,
        //   sharpe_ratio: 0.88,
        //   std: 11.25,
        //   used_period: "three_year",
        // },
        // {
        //   fund_name: "B25RMF",
        //   fund_risk: "5",
        //   roc: 9.75,
        //   sharpe_ratio: 0.85,
        //   std: 10.5,
        //   used_period: "five_year",
        // },
        // {
        //   fund_name: "MM-RMF",
        //   fund_risk: "6",
        //   roc: 8.95,
        //   sharpe_ratio: 0.82,
        //   std: 9.75,
        //   used_period: "three_year",
        // },
      ],
      currentSlide: 0,
=======
  },
  data() {
    return {
      search: "",
      currentPage: 1,
      perPage: 10,
      sortKey: "",
      sortOrder: 1,
      headers: {
        name: 'ชื่อกองทุน',
        category: 'ความเสี่ยง',
        oneYearReturn: 'ตอบแทนย้อน 1 ปี (%)',
        fiveYearReturn: 'ตอบแทนย้อน 5 ปี (%) (Annualized)',
        tenYearReturn: 'ผลตอบแทนย้อน 10 ปี (%) (Annualized)',
        standardDeviation: 'SD (จากข้อมูล 1 ปี)',
        sharpRatio: 'Sharp Ratio (ของปีนั้น)'
      },
      data: [
        {
          id: 1,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'สูง',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 2,
          name: 'กองทุนเปิดไทยพาณิชย์หุ้นระยะยาว',
          category: 'สูง', 
          oneYearReturn: '14.8',
          fiveYearReturn: '7.9',
          tenYearReturn: '6.8',
          standardDeviation: '11.9',
          sharpRatio: '0.82'
        },
        {
          id: 3,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'ต่ำ',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 4,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'สูง',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 5,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'ต่ำ',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 6,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'ต่ำ',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 7,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'สูง',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 8,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'สูง',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 9,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'สูง',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 10,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'สูง',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
        {
          id: 11,
          name: 'กองทุนเปิดบัวหลวงหุ้นระยะยาว',
          category: 'สูง',
          oneYearReturn: '15.2',
          fiveYearReturn: '8.5',
          tenYearReturn: '7.2',
          standardDeviation: '12.5',
          sharpRatio: '0.85'
        },
      ]
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
    };
  },
  computed: {
    filteredData() {
<<<<<<< HEAD
      return this.apiData.filter((item) =>
        item.fund_name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    sortedData() {
      return this.filteredData.slice().sort((a, b) => {
=======
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.data.filter((item) =>
        item.name.includes(this.search)
      ).slice(start, end);
    },
    sortedData() {
      return this.filteredData.sort((a, b) => {
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        let result = 0;
        if (a[this.sortKey] > b[this.sortKey]) result = 1;
        if (a[this.sortKey] < b[this.sortKey]) result = -1;
        return result * this.sortOrder;
      });
    },
    totalPages() {
<<<<<<< HEAD
      return Math.ceil(this.filteredData.length / this.perPage);
    },
    chunkedFunds() {
      // แสดงข้อมูลทั้งหมดโดยแบ่งเป็นกลุ่มละ 3 รายการ
      const result = [];
      for (let i = 0; i < this.recommendedFunds.length; i += 3) {
        result.push(this.recommendedFunds.slice(i, i + 3));
      }
      return result;
    },
  },
  methods: {
    sort(key) {
      this.isLoading = true;
      this.loadingMessage = "กำลังเรียงลำดับข้อมูล...";
      setTimeout(() => {
        if (this.sortKey === key) {
          this.sortOrder *= -1;
        } else {
          this.sortKey = key;
          this.sortOrder = 1;
        }
        this.isLoading = false;
      }, 300); // Short delay to show loading state during sorting
    },
    async goToBuySell(name) {
      this.isNavigating = true;
      try {
        await this.$router.push(`/buy-sell?name=${name}`);
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        this.isNavigating = false;
      }
    },
    async fetchRec() {
      try {
        // ตัวอย่างข้อมูลจาก API
        // const mockData = [
        //   {
        //     id: 1,
        //     fund_name: "BGOLDRMF",
        //     fund_risk: "8",
        //     oneYearReturn: "11.65",
        //     fiveYearReturn: "8.92",
        //     tenYearReturn: "7.15",
        //     standardDeviation: "12.95",
        //     sharpRatio: "0.92",
        //   },
        //   {
        //     id: 2,
        //     fund_name: "B-INNOTECHRMF",
        //     fund_risk: "7",
        //     oneYearReturn: "12.91",
        //     fiveYearReturn: "9.43",
        //     tenYearReturn: "8.21",
        //     standardDeviation: "15.6",
        //     sharpRatio: "0.95",
        //   },
        //   {
        //     id: 3,
        //     fund_name: "B-INNOTECHSSF",
        //     fund_risk: "7",
        //     oneYearReturn: "14.26",
        //     fiveYearReturn: "10.18",
        //     tenYearReturn: "8.75",
        //     standardDeviation: "18.27",
        //     sharpRatio: "0.89",
        //   },
        //   // เพิ่มข้อมูลตัวอย่างเพื่อให้มีข้อมูลเพียงพอ
        //   {
        //     id: 4,
        //     fund_name: "B-SI-THAIESG",
        //     fund_risk: "6",
        //     oneYearReturn: "10.50",
        //     fiveYearReturn: "7.85",
        //     tenYearReturn: "6.92",
        //     standardDeviation: "11.25",
        //     sharpRatio: "0.88",
        //   },
        //   {
        //     id: 5,
        //     fund_name: "B25RMF",
        //     fund_risk: "5",
        //     oneYearReturn: "9.75",
        //     fiveYearReturn: "6.94",
        //     tenYearReturn: "5.87",
        //     standardDeviation: "10.50",
        //     sharpRatio: "0.85",
        //   },
        //   {
        //     id: 6,
        //     fund_name: "MM-RMF",
        //     fund_risk: "6",
        //     oneYearReturn: "8.95",
        //     fiveYearReturn: "6.45",
        //     tenYearReturn: "5.62",
        //     standardDeviation: "9.75",
        //     sharpRatio: "0.82",
        //   },
        // ];

        // /api/mutual-fund/
        // สร้างการเชื่อมต่อ API จริง
        const username = localStorage.getItem("username");
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await fetch(
          `/api/performance-mutual-funds/recommend/user/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched API data:", data);
        // this.apiData = data;
        this.recommendedFunds = data;

        console.log(this.apiData);
        // ใช้ข้อมูลตัวอย่างแทน
        // console.log("Using mock data:", mockData);
        // this.apiData = mockData;

        // จำลองดีเลย์เล็กน้อยเพื่อให้เห็น loading state
        // await new Promise((resolve) => setTimeout(resolve, 800));
      } catch (error) {
        console.error("Failed to fetch API data:", error);
        this.loadingMessage = "เกิดข้อผิดพลาดในการโหลดข้อมูล";
      } finally {
        this.isLoading = false;
      }
    },
    async fetchData() {
      this.isLoading = true;
      this.loadingMessage = "กำลังโหลดข้อมูลกองทุน...";
      try {
        // ตัวอย่างข้อมูลจาก API
        // const mockData = [
        //   {
        //     id: 1,
        //     fund_name: "BGOLDRMF",
        //     fund_risk: "8",
        //     oneYearReturn: "11.65",
        //     fiveYearReturn: "8.92",
        //     tenYearReturn: "7.15",
        //     standardDeviation: "12.95",
        //     sharpRatio: "0.92",
        //   },
        //   {
        //     id: 2,
        //     fund_name: "B-INNOTECHRMF",
        //     fund_risk: "7",
        //     oneYearReturn: "12.91",
        //     fiveYearReturn: "9.43",
        //     tenYearReturn: "8.21",
        //     standardDeviation: "15.6",
        //     sharpRatio: "0.95",
        //   },
        //   {
        //     id: 3,
        //     fund_name: "B-INNOTECHSSF",
        //     fund_risk: "7",
        //     oneYearReturn: "14.26",
        //     fiveYearReturn: "10.18",
        //     tenYearReturn: "8.75",
        //     standardDeviation: "18.27",
        //     sharpRatio: "0.89",
        //   },
        //   // เพิ่มข้อมูลตัวอย่างเพื่อให้มีข้อมูลเพียงพอ
        //   {
        //     id: 4,
        //     fund_name: "B-SI-THAIESG",
        //     fund_risk: "6",
        //     oneYearReturn: "10.50",
        //     fiveYearReturn: "7.85",
        //     tenYearReturn: "6.92",
        //     standardDeviation: "11.25",
        //     sharpRatio: "0.88",
        //   },
        //   {
        //     id: 5,
        //     fund_name: "B25RMF",
        //     fund_risk: "5",
        //     oneYearReturn: "9.75",
        //     fiveYearReturn: "6.94",
        //     tenYearReturn: "5.87",
        //     standardDeviation: "10.50",
        //     sharpRatio: "0.85",
        //   },
        //   {
        //     id: 6,
        //     fund_name: "MM-RMF",
        //     fund_risk: "6",
        //     oneYearReturn: "8.95",
        //     fiveYearReturn: "6.45",
        //     tenYearReturn: "5.62",
        //     standardDeviation: "9.75",
        //     sharpRatio: "0.82",
        //   },
        // ];

        // /api/mutual-fund/
        // สร้างการเชื่อมต่อ API จริง
        const response = await fetch("/api/performance-mutual-funds/all-with-risk", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched API data:", data);
        // this.apiData = data;
        this.apiData = data;

        console.log(this.apiData);
        // ใช้ข้อมูลตัวอย่างแทน
        // console.log("Using mock data:", mockData);
        // this.apiData = mockData;

        // จำลองดีเลย์เล็กน้อยเพื่อให้เห็น loading state
        // await new Promise((resolve) => setTimeout(resolve, 800));

      } catch (error) {
        console.error("Failed to fetch API data:", error);
        this.loadingMessage = "เกิดข้อผิดพลาดในการโหลดข้อมูล";
      } finally {
        this.isLoading = false;
      }
    },
=======
      return Math.ceil(this.data.length / this.perPage);
    },
  },
  methods: {
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
<<<<<<< HEAD
    getRiskClass(risk) {
      const riskLevel = parseInt(risk);
      if (riskLevel <= 4) return "bg-green-100 text-green-800";
      if (riskLevel <= 7) return "bg-orange-100 text-orange-800";
      return "bg-red-100 text-red-800";
    },
    getPeriodText(period) {
      const periods = {
        one_year: "1 ปี",
        three_year: "3 ปี",
        five_year: "5 ปี",
        ten_year: "10 ปี"
      };
      return periods[period] || period;
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    nextSlide() {
      if (this.currentSlide < this.chunkedFunds.length - 1) {
        this.currentSlide++;
      }
    },
    goToSlide(index) {
      if (index >= 0 && index < this.chunkedFunds.length) {
        this.currentSlide = index;
      }
    },
    getSharpRatioClass(ratio) {
      if (!ratio) return "text-gray-400";
      const value = parseFloat(ratio);
      if (value >= 0.9) return "text-green-600";
      if (value >= 0.7) return "text-blue-600";
      if (value >= 0.5) return "text-yellow-600";
      return "text-orange-600";
    },
  },
  mounted() {
    this.fetchData();
    this.fetchRec();
=======
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    goToBuySell(name) {
      this.$router.push(`/buy-sell?name=${name}`);
    },
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
  },
};
</script>

<<<<<<< HEAD
<style scoped>
/* Cleaner Background */
.min-h-screen {
  background-color: #f9fafb;
  /* Light gray background */
  position: relative;
  color: #1f2937;
}

/* Remove complex background image */
.min-h-screen::before {
  content: none;
  /* Remove background image entirely */
}

/* Simplified content container */
main {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  margin-top: 1rem;
}

/* Simplified section headers */
h1,
h2 {
  color: #111827;
  font-weight: 600;
}

/* Simpler section headers without complex borders */
.bg-white.p-1.rounded-lg.inline-block.shadow-md.border-l-4 {
  background-color: white;
  border-left: 3px solid #10b981;
  box-shadow: none;
  padding-left: 0.5rem;
}

/* Simpler cards */
.bg-white.rounded-lg.p-3.shadow-md {
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

/* Simpler hover effect */
.bg-white.rounded-lg.p-3.shadow-md:hover {
  border-color: #10b981;
  transform: translateY(-2px);
}

/* Flatter stat boxes */
.bg-gray-50.p-2.rounded-md {
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 4px;
}

/* Cleaner table design */
table {
  border-collapse: separate;
  border-spacing: 0;
}

/* Simplified header row */
thead tr {
  background-color: #10b981;
  color: white;
}

th {
  padding: 0.75rem 1rem;
  font-weight: 500;
  text-align: left;
  font-size: 0.85rem;
}

/* Clean table cells */
td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f3f4f6;
}

/* Better formatting for numbers */
td.text-right {
  font-family: monospace;
  font-size: 0.9rem;
}

/* Improved spacing */
.mb-5 {
  margin-bottom: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

/* Cleaner risk badges */
[class*="bg-green-100"],
[class*="bg-orange-100"],
[class*="bg-red-100"] {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  font-size: 0.75rem;
}

/* Monospace for all number values for better readability */
.text-green-600,
.text-red-600,
.text-blue-600,
.text-yellow-600,
.text-orange-600 {
  font-family: monospace;
  font-size: 0.9rem;
}

/* Simplify carousel controls */
button.absolute {
  background-color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Simplify dot navigation */
button.w-2.h-2.rounded-full {
  width: 8px;
  height: 8px;
  margin: 0 2px;
  border-radius: 50%;
  border: none;
}

button.w-2.h-2.rounded-full.bg-green-500 {
  background-color: #10b981;
  width: 10px;
  height: 10px;
}

/* Loading Background */
.bg-opacity-80 {
  background-color: rgba(0, 0, 0, 0.9) !important;
}
</style>
=======
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
