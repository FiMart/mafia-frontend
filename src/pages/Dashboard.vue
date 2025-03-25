<template>
<<<<<<< HEAD
  <div class="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 via-gray-50 to-purple-50">
    <Navbar />

    <!-- Main Container -->
    <!-- Year Selector at top-right -->
    <div class="container mx-auto px-4 py-6 max-w-7xl">
      <!-- สร้าง grid 2 คอลัมน์ (md:grid-cols-2) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- คอลัมน์ซ้าย: มี 2 การ์ดซ้อนกัน -->
        <div class="space-y-6">
          <!-- (1) การ์ดมูลค่าสินทรัพย์ + เป้าหมายลดหย่อนภาษี -->
          <div class="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
            <!-- Asset Value Section -->
            <div class="relative overflow-hidden">
              <!-- Year Selector -->
              <div class="flex justify-end top-4  z-10">
                <select v-model="selectedYear"
                  class="rounded-md border border-gray-300 bg-white text-sm text-gray-700 py-1.5 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500">
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
              <!-- Decorative Background Element -->
              <div
                class="absolute -right-4 -top-4  bg-gradient-to-br from-teal-100 to-blue-100 rounded-full opacity-50">
              </div>

              <div class="flex items-center justify-between mb-6 relative">
                <div class="space-y-2">
                  <h2
                    class="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    มูลค่าสินทรัพย์
                  </h2>
                  <div class="flex items-baseline space-x-2">
                    <div class="text-4xl font-bold text-gray-800">
                      ฿{{ formatNumber(totalAsset) }}
                    </div>
                    <span :class="[
                      'text-sm px-2 py-1 rounded-full font-medium',
                      totalReturn >= 0
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600',
                    ]">
                      {{ totalReturn >= 0 ? "↑" : "↓" }}
                      {{ formatNumber(Math.abs(totalReturn)) }}%
                    </span>
                  </div>
                </div>

                <!-- Return Value with Card -->
                <div class="relative">
                  <div class="p-3 rounded-xl shadow-sm" :class="totalReturn_value >= 0 ? 'bg-green-50' : 'bg-red-50'">
                    <p class="text-xs text-gray-600 mb-1">กำไร/ขาดทุน</p>
                    <p class="text-lg font-semibold"
                      :class="totalReturn_value >= 0 ? 'text-green-600' : 'text-red-600'">
                      ฿{{ formatNumber(Math.abs(totalReturn_value)) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Divider with Gradient -->
            <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6"></div>

            <!-- Tax Reduction Card with Enhanced Style -->
            <div class="mt-4 bg-gray-50 rounded-xl p-4">
              <TaxReductionCard title="เป้าหมายลดหย่อนภาษี" :currentAmount="formatCurrency(30000)"
                :totalTarget="formatCurrency(150000)" :progressPercentage="10" class="bg-white shadow-sm rounded-lg" />
            </div>
          </div>

          <!-- (2) Enhanced Portfolio Overview Card -->
          <div
            class="bg-white rounded-2xl shadow-md p-6 transform hover:scale-[1.02] transition-all duration-300 card-animation">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800">ภาพรวมพอร์ต</h2>
              <div class="bg-blue-50 px-3 py-1 rounded-full pulse-effect">
                <span class="text-blue-600 text-sm font-medium">Portfolio Overview</span>
              </div>
            </div>

            <!-- Portfolio Distribution Chart -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <p class="text-sm font-medium text-gray-600">สัดส่วนการลงทุน</p>
                <p class="text-xs text-gray-500">จำนวน {{ apiData.length }} กองทุน</p>
              </div>

              <!-- Portfolio Distribution Bar -->
              <div class="h-3 w-full bg-gray-100 rounded-md overflow-hidden flex">
                <div v-for="(group, idx) in groupedFundsWithWidth" :key="idx"
                  :style="{ width: `${group.adjustedWidth}%` }" :class="[
                    'h-full transition-all duration-500',
                    idx === 0
                      ? 'bg-blue-500'
                      : idx === 1
                        ? 'bg-green-500'
                        : idx === 2
                          ? 'bg-indigo-500'
                          : idx === 3
                            ? 'bg-amber-500'
                            : 'bg-purple-500',
                  ]"></div>
              </div>

              <!-- Legend should show portfolio percentages -->
              <div class="flex flex-wrap gap-3 mt-3">
                <div v-for="(group, idx) in groupedFundsWithWidth" :key="idx"
                  class="flex items-center space-x-1 text-xs">
                  <div :class="[
                    'w-3 h-3 rounded-full',
                    idx === 0
                      ? 'bg-blue-500'
                      : idx === 1
                        ? 'bg-green-500'
                        : idx === 2
                          ? 'bg-indigo-500'
                          : idx === 3
                            ? 'bg-amber-500'
                            : 'bg-purple-500',
                  ]"></div>
                  <span class="text-gray-600">
                    {{ group.fund_type }} ({{ formatNumber(group.portfolioPercentage) }}%)
                  </span>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

            <!-- Enhanced Fund Cards with fixed percentage calculation -->
            <div class="grid grid-cols-1 gap-4 mb-4">
              <div v-for="(group, index) in groupedFunds" :key="index"
                class="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:translate-x-1"
                :style="{ animationDelay: index * 100 + 'ms' }">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div :class="[
                      'w-10 h-10 rounded-lg flex items-center justify-center text-white',
                      index === 0
                        ? 'bg-blue-500'
                        : index === 1
                          ? 'bg-green-500'
                          : index === 2
                            ? 'bg-indigo-500'
                            : index === 3
                              ? 'bg-amber-500'
                              : 'bg-purple-500',
                    ]">
                      <span class="text-lg font-bold">{{ group.fundCount }}</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">{{ group.fund_type }}</p>
                      <p class="text-xs text-gray-500">{{ group.fundCount }} กองทุน</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-800">
                      ฿{{ formatNumber(group.amount) }}
                    </p>
                    <div class="flex items-center justify-end space-x-1 mt-1">
                      <span :class="[
                        'text-xs font-medium',
                        group.percentageValue >= 0 ? 'text-green-600' : 'text-red-600',
                      ]">
                        {{ group.percentageValue >= 0 ? "▲" : "▼" }}
                        {{ formatNumber(Math.abs(group.percentage)) }}%
                      </span>
                      <span class="text-xs text-gray-500">(฿{{ formatNumber(Math.abs(group.percentageValue)) }})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- คอลัมน์ขวา: (3) การ์ดคำแนะนำการลงทุน -->
        <div
          class="bg-white rounded-2xl shadow-md p-6 transform hover:scale-[1.02] transition-all duration-300 h-full card-animation">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">
                คำแนะนำการลงทุน
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                ประจำวันที่ {{ overviewData.date }}
              </p>
            </div>
            <div class="bg-green-50 px-3 py-1 rounded-full pulse-effect">
              <span class="text-green-600 text-sm font-medium">Investment Advice</span>
            </div>
          </div>

          <!-- Investment Goals Summary -->
          <div class="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 mb-6 space-y-3 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">เป้าหมายคงเหลือ (เดือน)</span>
              <span class="font-semibold text-gray-800">{{
                formatCurrency(overviewData.remain_amount_month)
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">เป้าหมายคงเหลือ (ปี)</span>
              <span class="font-semibold text-gray-800">{{
                formatCurrency(overviewData.remain_amount_year)
              }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">สถานะการลงทุน</span>
              <span class="font-medium text-blue-600">{{ balanceDescription }}</span>
            </div>
          </div>

          <!-- Improved Advice Table with enhanced prominence and visual impact -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
            <!-- Add an attention-grabbing header bar -->
            <div class="bg-gradient-to-r from-green-500 to-teal-500 py-3 px-5 flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <div class="bg-white bg-opacity-30 p-1.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-white font-medium">รายละเอียดคำแนะนำ</span>
              </div>
              <span class="text-xs text-white bg-white bg-opacity-20 px-2.5 py-1 rounded-full">
                {{ adviseItems.length }} รายการ
              </span>
            </div>

            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 border-b">
                  <th class="px-5 py-4 text-left text-sm font-semibold text-gray-700 w-1/3">
                    <div class="flex items-center space-x-2">
                      <div class="w-1.5 h-6 bg-green-500 rounded-full"></div>
                      <span>กองทุน</span>
                    </div>
                  </th>
                  <th class="px-5 py-4 text-left text-sm font-semibold text-gray-700 w-1/3">
                    <div class="flex items-center space-x-2">
                      <div class="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                      <span>แนวโน้ม</span>
                    </div>
                  </th>
                  <th class="px-5 py-4 text-left text-sm font-semibold text-gray-700 w-1/3">
                    <div class="flex items-center space-x-2">
                      <div class="w-1.5 h-6 bg-purple-500 rounded-full"></div>
                      <span>แนะนำ</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in adviseItems" :key="index"
                  class="border-b border-gray-100 hover:bg-green-50/40 transition-all duration-200">
                  <td class="px-5 py-5">
                    <div class="flex items-center">
                      <div
                        class="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center text-green-700 font-bold mr-3 shadow-sm">
                        {{ item.fund.charAt(0) }}
                      </div>
                      <span class="text-sm font-medium text-gray-800">{{
                        item.fund
                      }}</span>
                    </div>
                  </td>
                  <td class="px-5 py-5">
                    <span :class="[
                      'px-4 py-2 rounded-full text-xs font-medium inline-flex items-center shadow-sm',
                      item.trend.includes('ขึ้น')
                        ? 'bg-gradient-to-r from-green-500 to-green-400 text-white'
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-white',
                    ]">
                      <span v-if="item.trend.includes('ขึ้น')" class="mr-1.5 text-sm">↑</span>
                      <span v-else class="mr-1.5 text-sm">→</span>
                      {{ item.trend }}
                    </span>
                  </td>
                  <td class="px-5 py-5">
                    <span :class="[
                      'px-4 py-2 rounded-full text-xs font-medium inline-flex items-center shadow-sm',
                      item.action.includes('ชะลอ')
                        ? 'bg-gradient-to-r from-red-500 to-red-400 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white',
                    ]">
                      <span v-if="item.action.includes('ชะลอ')" class="mr-1.5">⏸</span>
                      <span v-else class="mr-1.5">⏱</span>
                      {{ item.action }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Add a footer with subtle explanation/direction -->
            <div class="bg-gray-50 py-3 px-5 text-xs text-gray-500 border-t border-gray-100">
              คำแนะนำอัปเดตอัตโนมัติทุกวัน จากข้อมูลตลาดล่าสุด
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <template v-if="isLoading">
    <div class="shimmer h-20 rounded-xl mb-4"></div>
  </template>
</template>

<script>
import Navbar from "@/components/Navbar";
import TaxReductionCard from "@/components/TaxReductionCard.vue";
import AOS from "aos";
import "aos/dist/aos.css";
const TrendEnum = {
  TREND_UP: "ราคามีแนวโน้มขึ้น",
  TREND_DOWN: "ยังไม่มีสัญญาณแนวโน้มขึ้น",
};

const BalanceEnum = {
  FULL_BALANCE_MONTH: "คุณลงทุนครบจำนวนต่อเดือนแล้ว",
  FULL_BALANCE_YEAR: "คุณลงทุนครบจำนวนต่อปีแล้ว",
  UNFULL_BALANCE_MONTH: "คุณยังลงทุนไม่ครบเป้าหมายของเดือนนี้",
  UNFULL_BALANCE_YEAR: "คุณยังลงทุนไม่ครบเป้าหมายของปีนี้",
};

const ActionEnum = {
  HOLD: "ควรชะลอการลงทุน",
  BUY: "เป็นช่วงเวลาที่ดีในการลงทุน",
};

// --------------------- 2) ตาราง Mapping TREND+BALANCE -> ACTION ---------------------
const adviceMap = {
  TREND_UP_FULL_BALANCE_MONTH: "HOLD",
  TREND_UP_UNFULL_BALANCE_MONTH: "BUY",
  TREND_DOWN_FULL_BALANCE_MONTH: "HOLD",
  TREND_DOWN_UNFULL_BALANCE_MONTH: "HOLD",

  TREND_UP_FULL_BALANCE_YEAR: "HOLD",
  TREND_UP_UNFULL_BALANCE_YEAR: "BUY",
  TREND_DOWN_FULL_BALANCE_YEAR: "HOLD",
  TREND_DOWN_UNFULL_BALANCE_YEAR: "BUY",
};

=======

  <div class="min-h-screen">
    <Navbar />
    <div class=" flex flex-col  mx-48 my-10">
      <div class="flex flex-col gap-5 justify-center">
        <div class="grid grid-flow-col grid-rows-4 gap-3.5">
          <div class="row-span-1">
            <div
              class="border border-stroke dark:border-strokedark rounded-xl shadow-md py-4 px-5 bg-gray-0 bg-opacity-30 backdrop-filter backdrop-blur-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4.5">
                  <div>
                    <div class="font-semibold text-lg">
                      มูลค่าสินทรัพย์
                    </div>
                    <div class="font-semibold text-5xl tracking-tight">$12,453.00</div>
                  </div>
                </div>

                <div class="text-right">
                  <p class="mb-0.5 flex items-center justify-end gap-1 text-lg font-medium text-meta-3">
                    0.14%
                    <svg class="fill-current" width="9" height="7" viewBox="0 0 9 7" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.23511 0.193115L8.23815 6.19312H0.232065L4.23511 0.193115Z" fill=""></path>
                    </svg>
                  </p>
                  <p class="text-lg font-medium text-meta-3">
                    + $1,984.00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row-span-5">
            <TaxReductionCard title="เป้าหมายการลดหย่อนภาษี" currentAmount="30,000.00 บาท" totalTarget="150,000.00 บาท"
              :progressPercentage="80" />
          </div>

          <div
            class="row-span-6 h-fit border border-stroke dark:border-strokedark rounded-xl shadow-md px-5 py-4 bg-gray-0 bg-opacity-30 backdrop-filter backdrop-blur-lg">
            <div class="flex flex-wrap items-center justify-between gap-2 px-2">
              <div>
                <p class="text-xl font-bold text-black dark:text-white">
                  ภาพรวมพอร์ต
                </p>
              </div>
              <div class="relative z-20 inline-block rounded">
                <select
                  class="relative z-20 inline-flex appearance-none rounded border border-stroke bg-transparent py-[5px] pl-3 pr-8 text-sm font-medium outline-none dark:border-strokedark">
                  <option value="" class="dark:bg-boxdark">Short by</option>
                  <option value="" class="dark:bg-boxdark">Monthly</option>
                  <option value="" class="dark:bg-boxdark">Yearly</option>
                </select>
                <span class="absolute right-3 top-1/2 z-10 -translate-y-1/2">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.61025 11.8872C8.46025 11.8872 8.33525 11.8372 8.21025 11.7372L2.46025 6.08723C2.23525 5.86223 2.23525 5.51223 2.46025 5.28723C2.68525 5.06223 3.03525 5.06223 3.26025 5.28723L8.61025 10.5122L13.9603 5.23723C14.1853 5.01223 14.5353 5.01223 14.7603 5.23723C14.9853 5.46223 14.9853 5.81223 14.7603 6.03723L9.01025 11.6872C8.88525 11.8122 8.76025 11.8872 8.61025 11.8872Z"
                      fill="#64748B"></path>
                  </svg>
                </span>
              </div>
            </div>
            
            <!-- this contrent inside fit in block and the bloack not over grid -->
            <div class="flex flex-col h-full max-h-96 overflow-y-auto scrollbar-style mt-5 mb-4">
              <!-- <hr></hr> -->
              <FundCard title="กองทุนรวมสินทรพย์ทางเลือก" fundCount="5 กองทุน" amount="10,000.00 บาท"
                percentage="-1.25%" percentageValue="-125.00 บาท" />
              <FundCard title="กองทุนรวมหมวดอุตสาหกรรม" fundCount="5 กองทุน" amount="10,000.00 บาท" percentage="-1.25%"
                percentageValue="-125.00 บาท" />
              <FundCard title="กองทุนรวมตราสารทุน" fundCount="5 กองทุน" amount="10,000.00 บาท" percentage="-1.25%"
                percentageValue="-125.00 บาท" />
              <FundCard title="กองทุนรวมผสม" fundCount="5 กองทุน" amount="10,000.00 บาท" percentage="-1.25%"
                percentageValue="-125.00 บาท" />
              <FundCard title="กองทุนรวมตราสารหนี้" fundCount="5 กองทุน" amount="10,000.00 บาท" percentage="-1.25%"
                percentageValue="-125.00 บาท" />
              <FundCard title="กองทุนรวมพันธบัตรรัฐบาล" fundCount="5 กองทุน" amount="10,000.00 บาท" percentage="-1.25%"
                percentageValue="-125.00 บาท" />
              <FundCard title="กองทุนรวมตลาดเงินต่างประเทศ" fundCount="5 กองทุน" amount="10,000.00 บาท"
                percentage="-1.25%" percentageValue="-125.00 บาท" />
              <FundCard title="กองทุนรวมตลาดเงินในประเทศ" fundCount="5 กองทุน" amount="10,000.00 บาท"
                percentage="-1.25%" percentageValue="-125.00 บาท" />
            </div>

          </div>
        </div>

        <!-- <div class="border-2">
          6
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import FundCard from '@/components/FundCard.vue';
import TaxReductionCard from "@/components/TaxReductionCard.vue";
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
export default {
  name: "Dashboard",
  components: {
    Navbar,
<<<<<<< HEAD
    TaxReductionCard,
  },
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      years: this.generateYears(6),
      apiData: [],
      totalAsset: 0,
      totalReturn_value: 0,
      totalReturn: 0,

      // ข้อมูล JSON ตัวอย่าง
      overviewData: {
        advise_funds: [],
        date: "",
        non_trend_up_funds: [],
        remain_amount_month: "",
        remain_amount_year: "",
        // ค่านี้จะเป็น FULL_BALANCE_MONTH / UNFULL_BALANCE_MONTH / FULL_BALANCE_YEAR / UNFULL_BALANCE_YEAR
        // ตัวอย่างตั้งไว้
        remainingInvestmentNeeded: "",
        // ถ้า fund อยู่ใน trend_up_funds => ถือว่า TREND_UP, ไม่อยู่ => TREND_DOWN
        trend_up_funds: [],
        username: "",
      },
      isLoading: false,
    };
  },
  created() {
    this.generateYears(6); // 6 ปีย้อนหลัง
  },
  computed: {
    balanceDescription() {
      return (
        BalanceEnum[this.overviewData.remainingInvestmentNeeded] || "ไม่ทราบสถานะการลงทุน"
      );
    },
    /*
     * สร้างตาราง mapping เงื่อนไข:
     * TREND_UP + FULL_BALANCE_MONTH -> "HOLD"
     * TREND_UP + UNFULL_BALANCE_MONTH -> "BUY"
     * TREND_DOWN + FULL_BALANCE_MONTH -> "HOLD"
     * TREND_DOWN + UNFULL_BALANCE_MONTH -> "HOLD"
     * TREND_UP + FULL_BALANCE_YEAR -> "HOLD"
     * TREND_UP + UNFULL_BALANCE_YEAR -> "BUY"
     * TREND_DOWN + FULL_BALANCE_YEAR -> "HOLD"
     * TREND_DOWN + UNFULL_BALANCE_YEAR -> "BUY"
     */
    adviseItems() {
      return this.overviewData.advise_funds.map((fundItem) => {
        // ตรวจสอบว่ากองทุนอยู่ใน trend_up_funds หรือไม่
        const isUp = this.overviewData.trend_up_funds.includes(fundItem.fund);
        const trendKey = isUp ? "TREND_UP" : "TREND_DOWN";

        // เอาข้อความจาก TrendEnum
        const trendText = TrendEnum[trendKey];

        // เตรียม key สำหรับ adviceMap
        const balanceKey = this.overviewData.remainingInvestmentNeeded;
        const adviceKey = `${trendKey}_${balanceKey}`;
        // ดึง action (BUY / HOLD)
        const actionRaw = adviceMap[adviceKey] || "HOLD";
        // แปลงเป็นข้อความจาก ActionEnum
        const actionText = ActionEnum[actionRaw];

        return {
          fund: fundItem.fund,
          trend: trendText,
          action: actionText,
        };
      });
    },

    // รวมมูลค่า asset
    totalAssetComputed() {
      return this.apiData.reduce((sum, fund) => sum + fund.holding_value, 0);
    },
    // รวมกำไร/ขาดทุน
    totalReturnComputed() {
      return this.apiData.reduce((sum, fund) => sum + fund.gain_loss_value, 0);
    },
    // Group apiData ตาม fund_type และสรุปข้อมูล
    groupedFunds() {
      const groups = {};
      let totalAmount = 0;

      // Calculate totals first
      this.apiData.forEach((fund) => {
        totalAmount += fund.holding_value;
      });

      // Group by fund type
      this.apiData.forEach((fund) => {
        const type = fund.fund_type;
        if (!groups[type]) {
          groups[type] = {
            fund_type: type,
            fundCount: 0,
            amount: 0,
            percentageValue: 0,
          };
        }
        groups[type].fundCount += 1;
        groups[type].amount += fund.holding_value;
        groups[type].percentageValue += fund.gain_loss_value;
      });

      return Object.values(groups).map((group) => {
        // Calculate percentage of total portfolio
        const portfolioPercentage =
          totalAmount > 0 ? (group.amount / totalAmount) * 100 : 0;

        // Calculate return percentage
        const returnPercentage =
          group.amount > 0 ? (group.percentageValue / group.amount) * 100 : 0;

        return {
          ...group,
          percentage: returnPercentage, // Percentage return
          portfolioPercentage: portfolioPercentage, // Percentage of total portfolio for chart
        };
      });
    },
    groupedFundsWithWidth() {
      // First, check if there are any funds
      if (this.groupedFunds.length === 0) return [];

      // Calculate total percentage (should be close to 100%)
      const totalPercentage = this.groupedFunds.reduce(
        (sum, group) => sum + group.portfolioPercentage,
        0
      );

      // Adjust each group's width to ensure they add up to 100%
      return this.groupedFunds.map((group, index) => {
        let adjustedWidth;

        // If it's the last element, use the remaining percentage to reach 100%
        if (index === this.groupedFunds.length - 1) {
          const previousSum = this.groupedFunds
            .slice(0, index)
            .reduce((sum, g) => sum + (g.portfolioPercentage / totalPercentage) * 100, 0);
          adjustedWidth = 100 - previousSum;
        } else {
          // Otherwise distribute proportionally
          adjustedWidth = (group.portfolioPercentage / totalPercentage) * 100;
        }

        return {
          ...group,
          adjustedWidth: adjustedWidth,
        };
      });
    },
  },
  watch: {
    // เมื่อคำนวณใหม่ ให้เอาค่าไปใส่ใน totalAsset, totalReturn
    totalAssetComputed(newVal) {
      this.totalAsset = newVal;
    },
    totalReturnComputed(newVal) {
      this.totalReturn_value = newVal;
      if (this.totalAsset !== 0) {
        this.totalReturn = (newVal / this.totalAsset) * 100;
      } else {
        this.totalReturn = 0;
      }
    },
    selectedYear(newYear) {
      this.fetchData();
    },
  },
  methods: {
    generateYears(range = 6) {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: range }, (_, i) => currentYear - i);
    },
    formatNumber(value) {
      return new Intl.NumberFormat().format(value);
    },
    formatCurrency(value) {
      return '฿' + new Intl.NumberFormat().format(value);
    },
    async fetchAdvise() {
      const jwtToken = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");
      if (!jwtToken) {
        console.error("JWT token ไม่ถูกพบใน localStorage");
        return;
      }
      try {
        const response = await fetch(`/api/user-advise/user/${username}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched API data:", data);
        this.overviewData = data;
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      }
    },
    async fetchData() {
      this.isLoading = true;
      const jwtToken = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");
      if (!jwtToken) {
        console.error("JWT token ไม่ถูกพบใน localStorage");
        return;
      }
      try {
        const response = await fetch(`/api/portfolio/user/${username}/year/${this.selectedYear}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched API data:", data);
        this.apiData = data;
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      }
      await this.fetchAdvise();
      this.isLoading = false;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    },
    formatNumber(num) {
      return Number(num).toFixed(2);
    },
  },
  mounted() {
    this.fetchData();
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
    });
=======
    FundCard,
    TaxReductionCard
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
  },
};
</script>

<style scoped>
<<<<<<< HEAD
/* (คงสไตล์เดิมทั้งหมด) */
.min-h-screen {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/images/bg1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* เพิ่ม animations */
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

/* Apply animations to cards */
.card-animation {
  animation: slideIn 0.6s ease-out;
}

.pulse-effect:hover {
  animation: pulse 1.5s infinite;
}

/* Glass morphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

/* Add a new style for clean cards without borders */
.clean-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.clean-card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

/* Other existing styles remain unchanged */

/* Shimmer effect for loading state */
.shimmer {
  background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

/* Add these new styles */
.shadow-hover {
  transition: all 0.3s ease;
}

.shadow-hover:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Gradient text animation */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-animate {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Enhanced table styling */
table {
  border-collapse: separate;
  border-spacing: 0;
}

thead tr {
  height: 60px;
}

tbody tr {
  height: 65px;
  /* Slightly taller rows for better spacing */
}

/* More subtle alternating row styling */
tbody tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 1);
}

tbody tr:nth-child(even) {
  background-color: rgba(249, 250, 251, 0.5);
}

/* Improved hover effect */
tbody tr:hover {
  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.15);
  background-color: rgba(239, 246, 255, 0.6) !important;
}

/* Better spacing between badges and text */
.inline-flex {
  align-items: center;
  justify-content: center;
}

/* Enhanced badges */
.rounded-full {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

/* Add subtle transition to all elements */
th,
td,
tr,
.rounded-full,
.bg-green-100,
.bg-yellow-100,
.bg-red-100,
.bg-blue-100 {
  transition: all 0.2s ease-in-out;
}

/* Fund initial letter styling */
.w-8.h-8.rounded-md {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
=======
/* Scrollbar Container */
::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
  height: 8px; /* Height of the scrollbar for horizontal scroll */
}

/* Scrollbar Track */
::-webkit-scrollbar-track {
  background: #e0e0e0; /* Background of the track */
  border-radius: 10px; /* Rounded corners */
}

/* Scrollbar Thumb */
::-webkit-scrollbar-thumb {
  background: #64748b; /* Color of the scrollbar thumb */
  border-radius: 10px; /* Rounded corners */
  border: 2px solid #e0e0e0; /* Adds space around thumb */
}

/* Scrollbar Thumb Hover */
::-webkit-scrollbar-thumb:hover {
  background: #4b5563; /* Darker color on hover */
}

/* Scrollbar for Firefox (Fallback for unsupported browsers) */
.scrollbar-style {
  scrollbar-width: thin; /* Make the scrollbar thin */
  scrollbar-color: #64748b #e0e0e0; /* Thumb color and track color */
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
}
</style>
