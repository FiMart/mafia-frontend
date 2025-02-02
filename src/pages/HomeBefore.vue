<template>
  <div class="min-h-screen bg-gray-100">
    <!-- นำ NavbarBefore มาแสดง -->
    <NavbarBefore />
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
              @click="goToLogin(item.name)" 
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
  </div>
</template>

<script>
import NavbarBefore from "@/components/NavbarBefore";
export default {
  name: "HomeBefore",
  components: {
    NavbarBefore,
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
        tenYearReturn: 'ตอบแทนย้อน 10 ปี (%) (Annualized)',
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
      ],
    };
  },
  computed: {
    filteredData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.data.filter((item) =>
        item.name.includes(this.search)
      ).slice(start, end);
    },
    sortedData() {
      return this.filteredData.sort((a, b) => {
        let result = 0;
        if (a[this.sortKey] > b[this.sortKey]) result = 1;
        if (a[this.sortKey] < b[this.sortKey]) result = -1;
        return result * this.sortOrder;
      });
    },
    totalPages() {
      return Math.ceil(this.data.length / this.perPage);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    goToLogin(name) {
      this.$router.push(`/login`);
    }
  },
};
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