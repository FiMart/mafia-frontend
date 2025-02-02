<template>

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
export default {
  name: "Dashboard",
  components: {
    Navbar,
    FundCard,
    TaxReductionCard
  },
};
</script>

<style scoped>
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
}
</style>
