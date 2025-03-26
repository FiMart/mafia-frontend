<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <!-- Add loading overlay for initial data fetch -->
    <Loading v-if="isLoading" message="กำลังโหลดข้อมูลกองทุน..." class="fixed inset-0 bg-black bg-opacity-90 z-50" />

    <div v-else class="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-[150px_auto] gap-4 mx-4 lg:mx-64 mt-10 mb-10">
      <!-- Card 1: Asset Card -->
      <div
        class="lg:col-span-6 w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md sm:p-4 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-between items-start gap-6">
          <!-- ด้านซ้าย: ชื่อกองทุน + NAV + GainLoss -->
          <div class="flex flex-col space-y-2 text-left">
            <!-- ชื่อกองทุน -->
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
              {{ fundName }}
            </h2>
            <!-- NAV ล่าสุด -->
            <p class="text-2xl font-bold">
              {{ formatNumber(nav_latest) }}
            </p>
            <!-- Gain/Loss -->
            <p :class="gainloss_value >= 0 ? 'text-green-500' : 'text-red-500'" class="text-lg font-semibold">
              {{ formatNumber(gainloss_value) }} ({{ formatNumber(gainloss_percent) }}%)
            </p>
          </div>

          <!-- ด้านขวา: คำแนะนำ + Tooltip + ปุ่มซื้อขาย -->
          <div class="relative flex flex-col space-y-2 items-end text-right">
            <!-- คำแนะนำ -->
            <div class="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <span class="mr-1">คำแนะนำ:</span>
              <span :class="recommendationClass">
                {{ recommendationText }}
              </span>
              <!-- Info Icon + Tooltip -->
              <div class="relative inline-block ml-2 text-gray-500 cursor-pointer" @mouseover="isHovered = true"
                @mouseleave="isHovered = false">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.25 8.25h1.5m-1.5 3v5.25m9-3.75A9 9 0 113 12a9 9 0 0118 0z" />
                </svg>
                <!-- Tooltip -->
                <transition name="fade">
                  <div v-if="isHovered"
                    class="absolute z-10 min-w-max p-2 text-sm text-white bg-gray-700 rounded shadow-lg top-0 right-0 transform translate-x-full -translate-y-full">
                    <div class="flex justify-between gap-2 text-green-400">
                      <span>โอกาสแนวโน้มเป็นขาขึ้น:</span>
                      <span class="font-bold">{{ (predict_fund.up_trend_prob * 100).toFixed(2) }}%</span>
                    </div>
                    <div class="flex justify-between gap-2 text-yellow-400">
                      <span>โอกาสแนวโน้มไม่เป็นขาขึ้น:</span>
                      <span class="font-bold">{{ (predict_fund.down_trend_prob * 100).toFixed(2) }}%</span>
                    </div>
                  </div>
                </transition>
              </div>

            </div>

            <!-- ปุ่มลงทุนในกองทุนนี้ -->
            <button type="button" @click="openModal"
              class="px-4 py-2 text-sm font-medium text-white bg-[#0F172A] rounded-md shadow-md hover:bg-[#1E293B] transition">
              ลงทุนในกองทุนนี้
            </button>

            <!-- Teleport & Modal Popup -->
            <teleport to="body">
              <transition name="fade">
                <div v-if="isModalOpen"
                  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <BuySellPopUp @close="closeModal" :name="fundName" :fund-type="fund_type" />
                </div>
              </transition>
            </teleport>
          </div>
        </div>
      </div>

      <!-- Card 2: ผลการดำเนินการย้อนหลัง และคำแนะนำ -->
      <div class="lg:col-span-6 lg:row-span-2">
        <!-- <div
          class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700"> -->
        <div>
          <div
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
            <div class="mb-2">
              <h3 class="text-lg font-bold leading-none text-gray-900 dark:text-white">
                ผลการดำเนินการย้อนหลัง
              </h3>
            </div>
            <div class="flex items-center justify-left mb-6">
              <nav class="p-1 bg-gray-100 rounded-xl">
                <div class="flex space-x-1"> <!-- เพิ่มช่องว่างระหว่างปุ่ม -->
                  <button v-for="(item, index) in [
                    { id: 'return', label: 'Return' },
                    { id: 'sd', label: 'SD' },
                    { id: 'sharpeRatio', label: 'Sharpe Ratio' },
                  ]" :key="index" @click="updateContent(item.id)" :class="[
                    'inline-block px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    selectedContent === item.id
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300',
                  ]">
                    {{ item.label }}
                  </button>
                </div>
              </nav>
            </div>


            <div class="flow-root">
              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                        3 เดือน
                      </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {{
                        selectedContent === 'return'
                          ? SummaryData.find((item) => item.duration === "3 เดือน")?.percentage + '%'
                          : SummaryData.find((item) => item.duration === "3 เดือน")?.percentage
                      }}
                    </div>
                  </div>
                </li>

                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                        6 เดือน
                      </p>
                    </div>

                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {{
                        selectedContent === 'return'
                          ? SummaryData.find((item) => item.duration === "6 เดือน")?.percentage + '%'
                          : SummaryData.find((item) => item.duration === "6 เดือน")?.percentage
                      }}
                    </div>
                  </div>
                </li>

                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                        1 ปี
                      </p>
                    </div>

                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {{
                        selectedContent === 'return'
                          ? SummaryData.find((item) => item.duration === "1 ปี")?.percentage + '%'
                          : SummaryData.find((item) => item.duration === "1 ปี")?.percentage
                      }}
                    </div>
                  </div>
                </li>

                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                        3 ปี
                      </p>
                    </div>

                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {{
                        selectedContent === 'return'
                          ? SummaryData.find((item) => item.duration === "3 ปี")?.percentage + '%'
                          : SummaryData.find((item) => item.duration === "3 ปี")?.percentage
                      }}
                    </div>
                  </div>
                </li>

                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                        5 ปี
                      </p>
                    </div>

                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {{
                        selectedContent === 'return'
                          ? SummaryData.find((item) => item.duration === "5 ปี")?.percentage + '%'
                          : SummaryData.find((item) => item.duration === "5 ปี")?.percentage
                      }}
                    </div>
                  </div>
                </li>

                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                        10 ปี
                      </p>
                    </div>

                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {{
                        selectedContent === 'return'
                          ? SummaryData.find((item) => item.duration === "10 ปี")?.percentage + '%'
                          : SummaryData.find((item) => item.duration === "10 ปี")?.percentage
                      }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
      <!-- Card 3: กราฟและปุ่มเลือก timeframe -->
      <div
        class="lg:col-span-6 w-full bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">

        <div class="flex flex-col justify-center h-full">
          <div class="mb-2">
            <h3 class="text-lg font-bold leading-none text-gray-900 dark:text-white">
              กราฟราคาย้อนหลัง
            </h3>
          </div>
          <!-- Button Container for Timeframe -->
          <!-- <div class="flex space-x-2 mb-4">
            <button v-for="option in timeframeOptions" :key="option" @click="selectedTimeframe = option" :class="[
              'text-xs bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded',
              selectedTimeframe === option ? 'bg-blue-500 text-white' : '',
            ]">
              {{ option }}
            </button>
          </div> -->
          <!-- ปุ่ม -->
          <div class="flex flex-wrap gap-3 mb-4">
            <button v-for="option in timeframeOptions" :key="option.value" @click="selectTimeframe(option.value)"
              :class="[
                'px-5 py-2 text-sm font-medium rounded-lg border transition duration-200',
                selectedTimeframe === option.value
                  ? 'bg-blue-600 text-white shadow-md border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border-gray-300 hover:border-blue-300',
              ]">
              {{ option.label }}
            </button>
          </div>

          <!-- Chart Container -->
          <div class="flex items-center justify-center h-full">
            <Line :data="LinechartData" :options="LinechartOptions" style="height: 400px; width: 100%;" />
          </div>
        </div>
      </div>

      <!-- Card 4: Tab Navigation & Content -->
      <!-- Card: รายละเอียดกองทุน (ไม่ใช้ Tab) -->
      <div
        class="lg:col-span-6 lg:row-span-1 w-full bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
        <!-- ส่วนเนื้อหา “รายละเอียดกองทุน” -->
        <div class="p-4">
          <!-- สามารถใส่หัวข้อเพิ่มได้ตามต้องการ -->
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            รายละเอียดกองทุน
          </h3>
          <div class="relative grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <!-- หนังสือชี้ชวน -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">หนังสือชี้ชวน</span>
                <template v-if="fund_info.fund_fact">
                  <a :href="fund_info.fund_fact" target="_blank" rel="noopener noreferrer"
                    class="text-blue-500 hover:underline dark:text-blue-400">
                    หนังสือชี้ชวน
                  </a>
                </template>
                <template v-else>
                  <span class="text-gray-400">ไม่มีข้อมูล</span>
                </template>
              </div>
              <!-- บลจ. -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">บลจ.</span>
                <span class="text-gray-500 dark:text-gray-400">{{
                  fund_info.company
                  }}</span>
              </div>
              <!-- ประเภทกองทุน -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">ประเภทกองทุน</span>
                <span class="text-gray-500 dark:text-gray-400">{{
                  fund_info.fund_type
                  }}</span>
              </div>
              <!-- ความเสี่ยง -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">ความเสี่ยง</span>
                <span class="text-gray-500 dark:text-gray-400">{{
                  fund_info.fund_risk
                  }}</span>
              </div>
              <!-- จ่ายปันผล -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">นโยบายการจ่ายปันผล</span>
                <span class="text-gray-500 dark:text-gray-400">
                  {{ fund_info.dividend_policy || 'ไม่จ่ายปันผล' }}
                </span>
              </div>
              <!-- มูลค่าทรัพย์สินสุทธิ -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">มูลค่าทรัพย์สินสุทธิ</span>
                <span class="text-gray-500 dark:text-gray-400">{{ formatNumber(lasted_info.total_net_assets) }}
                  บาท</span>
              </div>
              <!-- เส้นแบ่งคอลัมน์ (เฉพาะในจอใหญ่) -->
              <div class="hidden md:block absolute inset-y-0 left-1/2 w-px bg-gray-300"></div>
            </div>

            <div>
              <!-- ค่าธรรมเนียมการขาย -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">ค่าธรรมเนียมการขาย</span>
                <span class="text-gray-500 dark:text-gray-400">{{ formatNumber(fund_info.purchase_fee) }}%</span>
              </div>
              <!-- ค่าธรรมเนียมรับซื้อคืน -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">ค่าธรรมเนียมรับซื้อคืน</span>
                <span class="text-gray-500 dark:text-gray-400">{{ formatNumber(fund_info.redemption_fee) }}%</span>
              </div>
              <!-- ค่าใช้จ่ายกองทุนรวม -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">ค่าใช้จ่ายกองทุนรวม</span>
                <span class="text-gray-500 dark:text-gray-400">{{ formatNumber(fund_info.fund_expense_ratio) }}%</span>
              </div>
              <!-- ลงทุนขั้นต่ำ -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">ลงทุนขั้นต่ำ</span>
                <span class="text-gray-500 dark:text-gray-400">{{ formatNumber(fund_info.minimum_initial_investment) }}
                  บาท</span>
              </div>
              <!-- วันจดทะเบียนกองทุน -->
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">วันจดทะเบียนกองทุน</span>
                <span class="text-gray-500 dark:text-gray-400">{{
                  fund_info.fund_registration_date
                  }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import BuySellPopUp from "@/components/BuySellPopUp";
import Loading from "@/components/Loading";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import 'chartjs-adapter-date-fns';
import { TimeScale } from 'chart.js'
import { th } from 'date-fns/locale'; // นำเข้า locale ภาษาไทย
import { Line } from "vue-chartjs";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ArcElement // ต้องเพิ่มอันนี้
);

export default {
  name: "Buysell",
  components: {
    Navbar,
    Line,
    BuySellPopUp,
    Loading,
  },
  data() {
    return {
      /* -- State หลัก (Options API) -- */
      isLoading: true,
      isHovered: false,
      selectedTimeframe: (30 * 3).toString(), // หน่วยเป็นวัน
      timeframeOptions: [
        { label: '3 เดือน', value: (30 * 3).toString() },
        { label: '6 เดือน', value: (30 * 6).toString() },
        { label: '1 ปี', value: (365 * 1).toString() },
        { label: '3 ปี', value: (365 * 3).toString() },
        { label: '5 ปี', value: (365 * 5).toString() },
        { label: '10 ปี', value: (365 * 10).toString() },
      ],
      nav_data: [],
      fund_info: {
        category: "",
        company: "",
        dividend_policy: "",
        fund_expense_ratio: 0.0,
        fund_fact: "",
        fund_name: "",
        fund_registration_date: "",
        fund_risk: "",
        fund_type: "",
        minimum_initial_investment: 0,
        model_ml_info_path: null,
        purchase_fee: 0.0,
        redemption_fee: 0.0,
        securities_industry: "",
      },
      lasted_info: {
        change: 0.0,
        date: "",
        fund_name: "",
        fund_type: "",
        nav: 0.0,
        redemption_price: 0.0,
        selling_price: 0.0,
        total_net_assets: 0.0,
      },
      /* ข้อมูลพยากรณ์ (API /api/prediction-trend-funds/latest/xxx) */
      predict_fund: {
        date: "",
        down_trend_prob: 0.0,
        fund_name: "",
        indicator: "",
        reason: "",
        trend: 0,
        up_trend_prob: 0.0,
      },
      showMenu: false,
      isModalOpen: false,
      modalType: "buy",

      /* Line chart สำหรับ NAV History */
      LinechartData: {
        labels: [],
        datasets: [
          {
            label: "NAV",
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "rgba(75,192,192,1)",
            pointRadius: 0,          // 👈 ซ่อนจุดบนกราฟ
            pointHoverRadius: 0,     // 👈 ซ่อนจุดตอน hover
            data: [],
            fill: false,
            tension: 0.4, // เส้นโค้ง (ถ้าไม่ต้องการโค้งใช้ 0)
          },
        ],
      },
      // LinechartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      // },
      // LinechartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   scales: {
      //     x: {
      //       ticks: {
      //         callback: function (value, index, ticks) {
      //           // Move the Set OUTSIDE this function so it resets every redraw
      //           if (!this._chartMonthSet || ticks[0].index === 0) {
      //             this._chartMonthSet = new Set();
      //           }

      //           const label = this.getLabelForValue(value); // e.g. "2025-02-14"
      //           const dateObj = new Date(label);
      //           const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}`; // e.g. "2025-1"

      //           if (!this._chartMonthSet.has(monthKey)) {
      //             this._chartMonthSet.add(monthKey);

      //             const month = dateObj.toLocaleString("th-TH", { month: "short" }); // ภาษาไทย
      //             const year = dateObj.getFullYear();
      //             return `${month}-${year}`; // "Feb-2025"
      //           }

      //           return ""; // skip duplicate months
      //         },
      //         maxRotation: 45,
      //         minRotation: 30,
      //         autoSkip: false, // important to prevent auto skipping
      //       },
      //       title: {
      //         display: true,
      //         text: "Month-Year",
      //       },
      //     },
      //     y: {
      //       title: {
      //         display: true,
      //         text: "NAV",
      //       },
      //     },
      //   },

      // },

      LinechartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month', // แสดงเดือนละ 1 label
              displayFormats: {
                month: 'MMM-yyyy' // เช่น "Mar-2025"
              },
              tooltipFormat: 'PPP', // แสดงวันที่เต็มใน tooltip
            },
            adapters: {
              date: {
                locale: th, // 👈 ตั้ง locale ภาษาไทยตรงนี้
              },
            },
            title: {
              display: true,
              text: '',
            },
            ticks: {
              autoSkip: true, // ให้ Chart.js จัดการ label เองอย่างฉลาด
              maxRotation: 45,
              minRotation: 30,
            }
          },
          y: {
            title: {
              display: true,
              text: 'NAV',
            },
          },
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
          }
        }
      },

      /* Tabs */
      activeTab: "tab1",
      tabs: [
        { id: "tab1", name: "คำแนะนำ" },
        { id: "tab2", name: "รายละเอียดกองทุน" },
      ],

      /* อื่น ๆ */
      risk_level: "",
      catagory_type: "",
      fund_type: "",
      securities_industry: "",
      category: "",
      nav_latest: 0,
      gainloss_value: 0.0,
      gainloss_percent: 0.0,
      total_net_assets: 0.0,
      timeframe: 90,

      /* -- State สำหรับ "ผลการดำเนินการย้อนหลัง" -- */
      SummaryData: [
        { duration: "3 เดือน", percentage: "-10%" },
        { duration: "6 เดือน", percentage: "-10%" },
        { duration: "1 ปี", percentage: "-10%" },
        { duration: "3 ปี", percentage: "-10%" },
        { duration: "5 ปี", percentage: "-10%" },
        { duration: "10 ปี", percentage: "-10%" },
      ],
      selectedContent: "return",
    };
  },
  computed: {
    // รับชื่อกองทุนจาก query parameter ใน route
    // สร้างข้อความคำแนะนำ (Buy / Hold / Sell) โดยดูจาก trend
    // กำหนดตามที่ระบุ: 1 = ขาขึ้น, 0 = ทรงตัว, -1 = ขาลง (หรือปรับตามเงื่อนไขที่ต้องการ)
    recommendationText() {
      const { trend } = this.predict_fund;
      if (trend === 1) {
        return "มีแนวโน้มเป็นขาขึ้น";
      } else if (trend === 0) {
        return "ยังไม่มีแนวโน้มเป็นขาขึ้น";
      } else {
        return "ยังไม่มีแนวโน้มเป็นขาขึ้น";
      }
    },
    // สำหรับใส่สีข้อความตาม trend
    recommendationClass() {
      const { trend } = this.predict_fund;
      if (trend === 1) {
        return "text-green-500 font-semibold";
      } else if (trend === 0) {
        return "text-yellow-500 font-semibold";
      } else {
        return "text-yellow-500 font-semibold";
      }
    },
    fundName() {
      return this.$route.query.name || "";
    },

    // เตรียม Data สำหรับ Donut Chart (up_trend_prob, down_trend_prob)
    DonutchartData() {
      const upVal = this.predict_fund?.up_trend_prob ?? 0;
      const downVal = this.predict_fund?.down_trend_prob ?? 0;
      return {
        labels: ["Up Trend %", "Down Trend %"],
        datasets: [
          {
            data: [upVal, downVal],
            backgroundColor: ["#34D399", "#F87171"], // เขียว/แดง
            hoverBackgroundColor: ["#10B981", "#EF4444"],
          },
        ],
      };
    },
    DonutchartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%", // ทำให้เป็น donut (เจาะรูตรงกลาง)
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      };
    },
  },
  methods: {
    formatNumber(num) {
      if (isNaN(num) || num === null || num === undefined) {
        return "-";
      }
      return Number(num)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    handleClickOutside(event) {
      if (this.$refs.menuContainer && !this.$refs.menuContainer.contains(event.target)) {
        this.showMenu = false;
      }
    },
    openModal(type) {
      this.modalType = type;
      this.isModalOpen = true;
      this.showMenu = false;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    // ดึงข้อมูลหลักเกี่ยวกับกองทุน + NAV + คาดการณ์
    async fetchData() {
      this.isLoading = true;
      try {
        // 1) ดึงข้อมูลกองทุน
        const endpoint1 = `/api/mutual-fund/${encodeURIComponent(this.fundName)}`;
        const response1 = await fetch(endpoint1, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response1.ok) {
          throw new Error(`HTTP error! status: ${response1.status}`);
        }
        const data1 = await response1.json();
        this.fund_info = data1;

        // 2) ดึงข้อมูล NAV ล่าสุด (window=1)
        const endpoint2 = `/api/nav-history/fund/${encodeURIComponent(
          this.fundName
        )}/window/1`;
        const response2 = await fetch(endpoint2, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data2 = await response2.json();
        this.lasted_info = data2[0] || {};
        this.nav_latest = this.lasted_info.nav;
        this.gainloss_value = this.lasted_info.change;
        this.gainloss_percent =
          (this.gainloss_value / (this.gainloss_value + this.nav_latest)) * 100.0;

        // 3) ดึงข้อมูลคาดการณ์แนวโน้ม (up/down trend)
        const jwtToken = localStorage.getItem("jwtToken");
        const endpoint3 = `/api/prediction-trend-funds/latest/${encodeURIComponent(
          this.fundName
        )}`;
        const response3 = await fetch(endpoint3, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data3 = await response3.json();
        if (!response3.ok) {
          console.log("fetch predict error:", data3);
        } else {
          this.predict_fund = data3;
          console.log("Prediction fund data:", this.predict_fund);
        }

        // 4) ดึงข้อมูล NAV แบบช่วง (timeframe=90) เพื่อ plot line chart
        await this.fetchNav();
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    selectTimeframe(days) {
      this.selectedTimeframe = days;
      this.fetchNav(); // เรียกข้อมูลใหม่ตามช่วง
    },
    async fetchNav() {
      try {
        const endpoint1 = `/api/nav-history/fund/${encodeURIComponent(
          this.fundName
        )}/window/${this.selectedTimeframe}`;
        const response1 = await fetch(endpoint1, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response1.ok) {
          throw new Error(`HTTP error! status: ${response1.status}`);
        }
        const data1 = await response1.json();
        this.nav_data = data1;
        this.updateChartData();
      } catch (error) {
        console.error("Failed to fetch NAV data:", error);
      }
    },

    updateChartData() {
      if (!this.nav_data || this.nav_data.length === 0) {
        console.warn("No NAV data available.");
        return;
      }
      // เรียงลำดับจาก (latest→oldest) เป็น (oldest→latest)
      const reversedData = [...this.nav_data].reverse();
      const labels = reversedData.map((item) => item.date);
      const dataPoints = reversedData.map((item) => item.nav);

      // const labels = reversedData.map((item) => {
      //   const dateObj = new Date(item.date);
      //   const month = dateObj.toLocaleString("default", { month: "short" }); // e.g. "Mar"
      //   const year = dateObj.getFullYear(); // e.g. 2025
      //   return `${month}-${year}`; // "Mar-2025"
      // });
      // const dataPoints = reversedData.map((item) => item.nav);

      // เรียงข้อมูลจากวันที่ล่าสุด -> เก่าสุด เป็น เก่าสุด -> ล่าสุด
      // const sortedData = [...this.nav_data].sort((a, b) => new Date(a.date) - new Date(b.date));

      // const seenMonths = new Set();
      // const labels = [];
      // const dataPoints = [];

      // sortedData.forEach((item) => {
      //   const dateObj = new Date(item.date);
      //   const monthKey = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, "0")}`; // "2025-03"

      //   if (!seenMonths.has(monthKey)) {
      //     seenMonths.add(monthKey);

      //     const label = `${dateObj.toLocaleString("default", { month: "short" })}-${dateObj.getFullYear()}`; // "Mar-2025"
      //     labels.push(label);
      //     dataPoints.push(item.nav);
      //   }
      // });

      this.LinechartData = {
        labels,
        datasets: [
          {
            label: "ราคา NAV ต่อหน่วย",
            data: dataPoints,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.1,
          },
        ],
      };
    },

    /* ฟังก์ชัน updateContent() สำหรับแท็บ “ผลการดำเนินการย้อนหลัง” */
    async updateContent(content = "return") {
      console.log("updateContent fired:", content);

      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        console.error("JWT token ไม่ถูกพบใน localStorage");
        return;
      }

      let data;
      try {
        const response = await fetch(
          `/api/performance-mutual-funds/lastest/${encodeURIComponent(this.fundName)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            console.log("Token expired or invalid, please login again.");
            return;
          } else {
            console.log("Request error:", data);
          }
        }
      } catch (error) {
        console.error("Error in get_performance_mutual_funds:", error);
      }

      this.selectedContent = content;

      /* โค้ดเปลี่ยน SummaryData ตามแท็บที่เลือก (return, sd, sharpeRatio) */
      if (content === "return") {
        this.SummaryData = [
          { duration: "3 เดือน", percentage: data?.three_month_roc || "-" },
          { duration: "6 เดือน", percentage: data?.six_month_roc || "-" },
          { duration: "1 ปี", percentage: data?.one_year_roc || "-" },
          { duration: "3 ปี", percentage: data?.three_year_roc || "-" },
          { duration: "5 ปี", percentage: data?.five_year_roc || "-" },
          { duration: "10 ปี", percentage: data?.ten_year_roc || "-" },
        ];
      } else if (content === "sd") {
        this.SummaryData = [
          { duration: "3 เดือน", percentage: data?.std_tree_month || "-" },
          { duration: "6 เดือน", percentage: data?.std_six_month || "-" },
          { duration: "1 ปี", percentage: data?.std_one_year || "-" },
          { duration: "3 ปี", percentage: data?.std_three_year || "-" },
          { duration: "5 ปี", percentage: data?.std_five_year || "-" },
          { duration: "10 ปี", percentage: data?.std_ten_year || "-" },
        ];
      } else if (content === "sharpeRatio") {
        this.SummaryData = [
          { duration: "3 เดือน", percentage: data?.sharpe_ratio_three_month || "-" },
          { duration: "6 เดือน", percentage: data?.sharpe_ratio_six_month || "-" },
          { duration: "1 ปี", percentage: data?.sharpe_ratio_one_year || "-" },
          { duration: "3 ปี", percentage: data?.sharpe_ratio_three_year || "-" },
          { duration: "5 ปี", percentage: data?.sharpe_ratio_five_year || "-" },
          { duration: "10 ปี", percentage: data?.sharpe_ratio_ten_year || "-" },
        ];
      }

      console.log("selectedContent:", this.selectedContent);
      console.log("SummaryData:", this.SummaryData);
    },
  },
  mounted() {
    // ดึงข้อมูลหลัก (fund_info, nav, predict_fund) เสร็จแล้ว จึงค่อยอัปเดต SummaryData
    this.fetchData().then(() => {
      this.$nextTick(() => {
        this.updateContent("return");
      });
    });

    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
/* Basic Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #e0e0e0;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background: #64748b;
  border-radius: 8px;
}

/* Card Hover Effect */
.bg-white {
  transition: all 0.3s ease;
}

.bg-white:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Button Style */
button {
  transition: all 0.3s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

/* Tab Hover Effect */
.hover-effect {
  transition: all 0.3s ease;
}

.hover-effect:hover {
  color: #3b82f6;
}

/* Simple Loading Fade */
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

/* Chart Hover */
.chart-container {
  transition: all 0.3s ease;
}

.chart-container:hover {
  transform: scale(1.01);
}

/* Risk Tag Animation */
.bg-blue-200 {
  transition: all 0.3s ease;
}

.bg-blue-200:hover {
  background-color: #60a5fa;
  color: white;
}

/* Scrollbar Container */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Scrollbar Track */
::-webkit-scrollbar-track {
  background: #e0e0e0;
  border-radius: 10px;
}

/* Scrollbar Thumb */
::-webkit-scrollbar-thumb {
  background: #64748b;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
}

/* Scrollbar Thumb Hover */
::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Optional: Add hover animation */
button {
  position: relative;
  overflow: hidden;
}

button::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: currentColor;
  opacity: 0;
  transition: opacity 0.2s ease;
}

button:hover::after {
  opacity: 0.1;
}

/* Optional: Add a subtle hover effect */
.hover-effect {
  position: relative;
  overflow: hidden;
}

.hover-effect::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.hover-effect:hover::after {
  transform: scaleX(1);
}

/* Add to existing styles */
.transition-all {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

button {
  position: relative;
  outline: none;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
}

/* Active pill animation */
button.active {
  animation: pill-press 0.2s ease forwards;
}

@keyframes pill-press {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

/* Hover effect */
button:not(.active):hover {
  background-color: rgba(59, 130, 246, 0.1);
}

/* Add these styles for loading overlay */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.z-50 {
  z-index: 50;
}

.bg-opacity-90 {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
