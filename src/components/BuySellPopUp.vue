<template>
  <div class="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
    <!-- Update loading overlay -->
    <Loading v-if="isLoading" message="กำลังดำเนินการ..." class="absolute inset-0 bg-black bg-opacity-50 z-50" />

    <!-- ✅ Tab Selector for Buy/Sell -->
    <div class="flex">
      <button @click="confirmChangeTransactionType('buy')" :class="[
        'flex-1 py-3 text-lg font-semibold text-center',
        transactionType === 'buy'
          ? 'bg-green-500 text-white'
          : 'bg-gray-200 text-gray-600',
      ]">
        ซื้อ
      </button>
      <button @click="confirmChangeTransactionType('sell')" :class="[
        'flex-1 py-3 text-lg font-semibold text-center',
        transactionType === 'sell'
          ? 'bg-red-500 text-white'
          : 'bg-gray-200 text-gray-600',
      ]">
        ขาย
      </button>
    </div>
    <div class="text-center mt-2">
      ประเภทรายการ: <span class="font-extrabold">{{ transactionText }}</span>
    </div>

    <div class="p-6">
      <!-- ✅ Input Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Fund Name (Full Width) -->
        <div class="md:col-span-2">
          <label class="block text-gray-700 font-medium mb-1">ชื่อกองทุน</label>
          <p class="w-full p-3 border rounded-full bg-gray-100 text-gray-600">
            {{ name }}
          </p>
        </div>

        <!-- Amount (บาท) -->
        <div>
          <label class="block text-gray-700 font-medium mb-1 group relative">
            จำนวนเงิน (บาท)
            <span class="tooltip">
              ℹ️
              <span class="tooltip-text">กรุณากรอกจำนวนเงินที่ต้องการลงทุน</span>
            </span>
          </label>
          <input type="text" v-model="amount_processed" @focus="activeField = 'amount_processed'"
            @input="(e) => { onAmountInput(e); calculateValues(); }" @blur="() => { activeField = ''; formatAmount(); }"
            class="w-full p-3 border rounded-full text-right focus:ring-2 focus:ring-teal-500" />

        </div>

        <!-- Price per Unit -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">ราคาต่อหน่วย (บาท)</label>
          <input type="text" v-model="processed_nav" @focus="activeField = 'processed_nav'"
            @input="(e) => { onNavInput(e); calculateValues(); }" @blur="() => { activeField = ''; formatNav(); }"
            class="w-full p-3 border rounded-full text-right focus:ring-2 focus:ring-teal-500" />
        </div>

        <!-- Number of Units -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">จำนวนหน่วย (หน่วย)</label>
          <input type="text" v-model="units_processed" @focus="activeField = 'units_processed'"
            @input="(e) => { validatePositiveDecimal(e, 'units_processed', 4); calculateValues(); }"
            @blur="() => { activeField = ''; formatUnits(); }"
            class="w-full p-3 border rounded-full text-right focus:ring-2 focus:ring-teal-500" />
        </div>

        <!-- Transaction Date -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">วันที่ดำเนินการ</label>
          <input type="date" class="w-full p-3 border rounded-full focus:ring-2 focus:ring-teal-500"
            v-model="transaction_date" />
        </div>
      </div>

      <!-- Error Popup -->
      <!-- <div
        v-if="showErrorPopup"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg max-w-md mx-auto">
          <h3 class="text-lg font-bold text-red-600 mb-2">เกิดข้อผิดพลาด</h3>
          <p class="mt-2 text-gray-700">{{ error_message }}</p>
          <button
            @click="showErrorPopup = false"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            ปิด
          </button>
        </div>
      </div> -->

      <!-- ✅ Action Buttons -->
      <div class="mt-6 flex space-x-4">
        <button @click="confirmCancel" :disabled="isLoading"
          class="w-1/2 bg-gray-500 text-white py-3 rounded-full font-semibold hover:bg-gray-600 transition disabled:opacity-50">
          ยกเลิก
        </button>

        <button :disabled="isLoading" class="w-1/2 py-3 rounded-full font-semibold transition disabled:opacity-50"
          :class="[
            transactionType === 'buy'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white',
            { 'success-animation': showSuccess },
            { 'error-animation': showError },
          ]" @click="confirmTransaction">
          ยืนยัน
        </button>
      </div>

      <!-- Confirmation Popup -->
      <div v-if="showConfirmationPopup"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg max-w-md mx-auto">
          <h3 class="text-lg font-bold mb-2">ยืนยันการดำเนินการ</h3>
          <p class="text-gray-700">คุณแน่ใจหรือไม่ว่าต้องการดำเนินการนี้?</p>
          <div class="mt-4 flex justify-center space-x-4">
            <button @click="
              confirmationAction();
            showConfirmationPopup = false;
            " class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              ตกลง
            </button>
            <button @click="showConfirmationPopup = false"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "./Loading.vue";
import { useToast } from "vue-toastification";

export default {
  name: "BuySellPopUp",
  components: {
    Loading,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: {
    name: {
      type: String,
      default: "N/A",
    },
    fundType: {
      type: String,
      default: "N/A",
    },
  },
  data() {
    return {
      username: "",
      transactionType: "buy", // Default to "buy"
      amount_processed: "",
      processed_nav: "",
      units_processed: "",
      activeField: '', // <-- add this
      transaction_date: new Date().toISOString().split("T")[0], // Default to current date
      hasData: false,
      isLoading: false,
      nav_data: {},
      showErrorPopup: false,
      showConfirmationPopup: false,
      confirmationAction: null,
      error_message: "",
      showSuccess: false,
      showError: false,
    };
  },
  computed: {
    headerClass() {
      return this.transactionType === "buy" ? "bg-green-500" : "bg-red-500";
    },
    transactionText() {
      return this.transactionType === "buy" ? "ซื้อ" : "ขาย";
    },
    transactionEnum() {
      return this.transactionType === "buy" ? 1 : 2;
    },
  },
  watch: {
    transactionType() {
      this.updateProcessedNav();
    },
    nav_data: {
      deep: true,
      handler() {
        this.updateProcessedNav();
      },
    },
    amount_processed(val) {
      this.checkData();
      // this.calculateValues("amount_processed");
      this.calculateValues();
    },
    processed_nav(val) {
      this.checkData();
      this.calculateValues();
      // this.calculateValues("processed_nav");
    },
    units_processed(val) {
      this.checkData();
      this.calculateValues();
      // this.calculateValues("units_processed");
    },
    transaction_date(newDate) {
      this.checkData();
      this.fetchNAVData(this.name, newDate);
    },
  },
  mounted() {
    this.fetchNAVData(this.name, this.transaction_date);
  },
  methods: {
    validatePositiveDecimal(event, field, decimalPlaces = 2) {
      let val = event.target.value;

      // ลบทุกตัวที่ไม่ใช่ตัวเลขหรือจุด
      val = val.replace(/[^\d.]/g, '');

      // แยกส่วนก่อนและหลังจุดทศนิยม
      let parts = val.split('.');
      if (parts.length > 2) {
        val = parts[0] + '.' + parts[1]; // ตัดจุดทศนิยมเกิน
        parts = val.split('.'); // อัปเดต parts อีกครั้ง
      }

      // ไม่ให้ขึ้นต้นด้วย 0 หลายตัว (แต่อนุญาต "0." และ ".5")
      if (parts[0]) {
        parts[0] = parts[0].replace(/^0+(?=\d)/, '');
      }

      // จำกัดจำนวนทศนิยม
      if (parts[1]) {
        parts[1] = parts[1].slice(0, decimalPlaces);
      }

      val = parts.join('.');

      // อัปเดต input และ model โดยไม่ parse เป็น number ทันที
      event.target.value = val;
      this[field] = val;
    },
    onNavInput(e) {
      let val = e.target.value.replace(/[^\d.]/g, '');
      const parts = val.split('.');
      if (parts.length > 2) {
        val = parts[0] + '.' + parts[1];
      }

      parts[0] = parts[0].replace(/^0+(?=\d)/, '');

      if (parts[1]) {
        parts[1] = parts[1].slice(0, 4);
      }

      val = parts.join('.');

      e.target.value = val;
      this.processed_nav = val;
    },
    formatUnits() {
      const num = parseFloat(this.units_processed);
      if (!isNaN(num)) {
        this.units_processed = num.toFixed(4);
      } else {
        this.units_processed = '';
      }
    },
    formatNav() {
      // format ให้มีทศนิยมสูงสุด 4 ตำแหน่ง
      const num = parseFloat(this.processed_nav);
      if (!isNaN(num)) {
        this.processed_nav = num.toFixed(4);
      } else {
        // Clear or reset if input is invalid
        this.processed_nav = '';
      }
    },
    onAmountInput(e) {
      let val = e.target.value;

      // Remove non-digit and non-dot characters
      val = val.replace(/[^\d.]/g, '');

      // Prevent multiple dots
      const parts = val.split('.');
      if (parts.length > 2) {
        val = parts[0] + '.' + parts[1]; // Keep only the first dot
      }

      // Remove negative sign
      val = val.replace(/^-/, '');

      // Set input field and model as-is (string)
      e.target.value = val;
      this.amount_processed = val;
    },
    formatAmount() {
      const num = parseFloat(this.amount_processed);
      if (!isNaN(num)) {
        this.amount_processed = num.toFixed(2);
      } else {
        this.amount_processed = '';
      }
    },
    async fetchNAVData(fund, date) {
      if (!fund || !date) return;

      const apiUrl = `/api/nav-history/fund/${fund}/date/${date}`;

      try {
        console.log(`Fetching NAV history from: ${apiUrl}`);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "เกิดข้อผิดพลาด");
        }

        this.nav_data = await response.json();
        this.error_message = "";
        this.showErrorPopup = false;
      } catch (error) {
        console.error("Error fetching NAV data:", error.message);
        this.error_message = error.message;
        this.showErrorPopup = true; // Show error popup
      }
    },
    updateProcessedNav() {
      if (this.nav_data) {
        this.processed_nav =
          this.transactionType === "buy"
            ? this.nav_data.redemption_price
            : this.nav_data.selling_price;
        this.activeField = 'processed_nav';
      }
    },
    checkData() {
      this.hasData = !!(
        this.amount_processed ||
        this.processed_nav ||
        this.units_processed
      );
    },
    async confirmTransaction() {
      if (
        !this.amount_processed ||
        !this.processed_nav ||
        !this.units_processed ||
        !this.transaction_date
      ) {
        this.toast.warning("กรุณากรอกข้อมูลให้ครบก่อนทำรายการ", {
          position: "top-center",
          timeout: 3000,
        });
        return;
      }

      this.isLoading = true;
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        this.username = localStorage.getItem("username");
        const apiUrl =
          this.transactionType === "buy"
            ? "/api/transaction/buy"
            : "/api/transaction/sell";

        // Create the payload
        const payload = {
          username: this.username,
          fund_name: this.name,
          transaction_date: this.transaction_date,
          amount_processed: parseFloat(this.amount_processed),
          processed_nav: parseFloat(this.processed_nav),
          units_processed: parseFloat(this.units_processed),
          transaction_enum: this.transactionEnum,
        };

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        this.showSuccess = true;
        this.toast.success(`✅ ทำรายการสำเร็จ: ${result.message}`, {
          position: "top-center",
          timeout: 3000,
        });

        setTimeout(() => {
          this.$emit("close");
        }, 1000);
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
        this.showError = true;
        this.toast.error("❌ เกิดข้อผิดพลาดในการทำรายการ กรุณาลองอีกครั้ง", {
          position: "top-center",
          timeout: 3000,
        });
      } finally {
        this.isLoading = false;
      }
    },
    confirmCancel() {
      if (this.hasData) {
        this.showConfirmationPopup = true;
        this.confirmationAction = () => {
          this.$emit("close");
        };
      } else {
        // If no data entered, just close
        this.$emit("close");
      }
    },
    confirmChangeTransactionType(type) {
      if (this.transactionType === type) return;

      if (this.hasData) {
        this.showConfirmationPopup = true;
        this.confirmationAction = () => {
          this.clearForm();
          this.transactionType = type;
          this.updateProcessedNav();
        };
      } else {
        this.transactionType = type;
        this.updateProcessedNav();
      }
    },
    clearForm() {
      this.amount_processed = "";
      this.processed_nav = "";
      this.units_processed = "";
      this.transaction_date = new Date().toISOString().split("T")[0];
      this.hasData = false;
    },
    validateNumber(event, field) {
      let value = event.target.value;

      // Remove any negative signs
      if (value.startsWith("-")) {
        value = value.substring(1);
      }

      // Convert to number and ensure it's not negative
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0) {
        this[field] = "";
      } else {
        this[field] = numValue;
      }
    },
    // calculateValues(changedField) {
    //   const nav = parseFloat(this.processed_nav);
    //   if (!nav || nav <= 0) return;

    //   if (
    //     changedField === "amount_processed" &&
    //     this.amount_processed !== "" &&
    //     !isNaN(parseFloat(this.amount_processed)) &&
    //     this.activeField !== "units_processed" // <-- don't overwrite field being typed
    //   ) {
    //     const amount = parseFloat(this.amount_processed);
    //     const units = amount / nav;
    //     this.units_processed = units.toFixed(4);
    //   }

    //   if (
    //     changedField === "units_processed" &&
    //     this.units_processed !== "" &&
    //     !isNaN(parseFloat(this.units_processed)) &&
    //     this.activeField !== "amount_processed" // <-- same here
    //   ) {
    //     const units = parseFloat(this.units_processed);
    //     const amount = units * nav;
    //     this.amount_processed = amount.toFixed(2);
    //   }
    // },
    // calculateValues() {
    //   const nav = parseFloat(this.processed_nav);
    //   const amount = parseFloat(this.amount_processed);
    //   const units = parseFloat(this.units_processed);

    //   if (!nav || nav <= 0) return;

    //   const hasAmount = this.amount_processed !== '' && !isNaN(amount);
    //   const hasUnits = this.units_processed !== '' && !isNaN(units);

    //   // Case 1: amount + nav → calculate units (but not if user is typing units)
    //   if (hasAmount && !hasUnits && this.activeField !== 'units_processed') {
    //     this.units_processed = (amount / nav).toFixed(4);
    //     return;
    //   }

    //   // Case 2: units + nav → calculate amount (but not if user is typing amount)
    //   if (hasUnits && !hasAmount && this.activeField !== 'amount_processed') {
    //     this.amount_processed = (units * nav).toFixed(2);
    //     return;
    //   }

    //   // Case 3: all 3 fields filled → update whichever is not being typed
    //   if (hasAmount && hasUnits) {
    //     if (this.activeField === 'amount_processed') {
    //       this.units_processed = (amount / nav).toFixed(4);
    //     } else if (this.activeField === 'units_processed') {
    //       this.amount_processed = (units * nav).toFixed(2);
    //     }
    //   }
    // },
    calculateValues() {
      const nav = parseFloat(this.processed_nav);
      const amount = parseFloat(this.amount_processed);
      const units = parseFloat(this.units_processed);

      if (!nav || nav <= 0) return;

      const hasAmount = this.amount_processed !== '' && !isNaN(amount);
      const hasUnits = this.units_processed !== '' && !isNaN(units);

      // If user is editing NAV, calculate whichever field can be inferred
      if (this.activeField === 'processed_nav') {
        if (hasUnits && !hasAmount) {
          this.amount_processed = (units * nav).toFixed(2);
          return;
        }

        if (hasAmount && !hasUnits) {
          this.units_processed = (amount / nav).toFixed(4);
          return;
        }

        // If both amount & units are filled, update the one not focused
        if (hasAmount && hasUnits) {
          if (this.activeField !== 'units_processed') {
            this.units_processed = (amount / nav).toFixed(4);
          }
          else if (this.activeField !== 'amount_processed') {
            this.amount_processed = (units * nav).toFixed(2);
          }
        }

        return;
      }

      // Normal logic when editing amount or units
      if (hasAmount && !hasUnits && this.activeField !== 'units_processed') {
        this.units_processed = (amount / nav).toFixed(4);
        return;
      }

      if (hasUnits && !hasAmount && this.activeField !== 'amount_processed') {
        this.amount_processed = (units * nav).toFixed(2);
        return;
      }

      if (hasAmount && hasUnits) {
        if (this.activeField === 'amount_processed') {
          this.units_processed = (amount / nav).toFixed(4);
        } else if (this.activeField === 'units_processed') {
          this.amount_processed = (units * nav).toFixed(2);
        }
      }
    }

  },
};
</script>

<style scoped>
/* ✅ Smooth Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Add these styles */
.absolute {
  position: absolute;
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
  background-color: rgba(0, 0, 0, 0.5);
}

/* เพิ่ม Pulse effect สำหรับปุ่มยืนยัน */
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

button:not(:disabled):hover {
  animation: pulse 1s infinite;
}

/* เพิ่ม transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ปรับแต่ง input focus effects */
input:focus {
  transform: scale(1.02);
  transition: all 0.2s ease;
}

/* เพิ่ม Tooltip styles */
.tooltip {
  cursor: help;
  position: relative;
  display: inline-block;
  margin-left: 4px;
}

.tooltip-text {
  visibility: hidden;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* เพิ่ม Success/Error animations */
@keyframes success {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
    background-color: #10b981;
  }

  100% {
    transform: scale(1);
  }
}

@keyframes error {

  0%,
  100% {
    transform: translateX(0);
  }

  20%,
  60% {
    transform: translateX(-5px);
  }

  40%,
  80% {
    transform: translateX(5px);
  }
}

.success-animation {
  animation: success 0.5s ease-in-out;
}

.error-animation {
  animation: error 0.5s ease-in-out;
}
</style>
