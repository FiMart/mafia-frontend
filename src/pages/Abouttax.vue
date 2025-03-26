<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <div class="flex justify-center">
      <div class="w-full max-w-6xl px-6 py-4">
        <div class="p-6">
          <!-- Add loading component -->
          <Loading v-if="isLoading" message="กำลังคำนวณข้อมูลภาษี..."
            class="fixed inset-0 bg-black bg-opacity-80 z-50" />

          <!-- Show content when not loading -->
          <div v-else class="grid grid-cols-1 gap-6">
            <!-- Header with Edit Button -->
            <!-- <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-white">ข้อมูลภาษี</h2>
              <button
                v-if="!isEditingTax"
                @click="toggleTaxEdit"
                class="text-white px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 font-bold transition-all duration-300"
              >
                ✎ แก้ไขข้อมูลภาษี
              </button>
            </div> -->

            <!-- 🔹 Income Section -->
            <div class="bg-white rounded-lg p-4 shadow-md">
              <h3 class="text-lg font-bold mb-4 text-gray-900">
                💰 รายได้ & หักค่าใช้จ่าย
              </h3>
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="text-gray-600 font-bold">รายได้ต่อเดือน</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.monthly_income" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="รายได้ต่อเดือน" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.monthly_income) }}
                    </p>
                  </template>
                </div>
                <div>
                  <label class="text-gray-600 font-bold">โบนัส</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.bonus_income" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="โบนัส" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.bonus_income) }}
                    </p>
                  </template>
                </div>
                <div>
                  <label class="text-gray-600 font-bold">รายได้อื่น ๆ</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.additional_income" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="รายได้อื่น ๆ" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.additional_income) }}
                    </p>
                  </template>
                </div>
              </div>
            </div>

            <!-- 🔹 Family Tax Deductions -->
            <div class="bg-white rounded-lg p-4 shadow-md">
              <h3 class="text-lg font-bold mb-4 text-gray-900">
                👨‍👩‍👧‍👦 รายการลดหย่อนภาษี: ครอบครัว
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <!-- ✅ สถานะสมรส -->
                <!-- ✅ ลดหย่อนภาษีส่วนบุคคลและคู่สมรส -->
                <div class="grid grid-cols-2 gap-4">
                  <!-- ✅ ลดหย่อนส่วนบุคคล -->
                  <div>
                    <label class="text-gray-600 font-bold">ลดหย่อนส่วนบุคคล</label>
                    <template v-if="isEditingTax">
                      <input v-model="taxInfo.personal_deduction" type="number"
                        class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="ลดหย่อนส่วนบุคคล" />
                    </template>
                    <template v-else>
                      <p class="output-field">
                        {{ formatDisplayValue(taxInfo.personal_deduction) }}
                      </p>
                    </template>
                  </div>
                  <!-- ✅ ลดหย่อนคู่สมรส -->
                  <div>
                    <label class="text-gray-600 font-bold">ลดหย่อนคู่สมรส</label>
                    <template v-if="isEditingTax">
                      <input v-model="taxInfo.marital_deduction" type="number"
                        class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="ลดหย่อนคู่สมรส" />
                    </template>
                    <template v-else>
                      <p class="output-field">
                        {{ formatDisplayValue(taxInfo.marital_deduction) }}
                      </p>
                    </template>
                  </div>
                </div>
                <div>
                  <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากบุตร</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.child_deduction" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="ลดหย่อนภาษีจากบุตร" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.child_deduction) }}
                    </p>
                  </template>
                </div>

                <!-- ✅ ค่าฝากครรภ์และคลอดบุตร -->
                <div>
                  <label class="text-gray-600 font-bold">ค่าฝากครรภ์และคลอดบุตร</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.prenatal_deduction" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="ค่าฝากครรภ์และคลอดบุตร" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.prenatal_deduction) }}
                    </p>
                  </template>
                </div>

                <!-- ✅ จำนวนพ่อแม่ที่ดูแล -->
                <div>
                  <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากพ่อแม่</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.parent_deduction" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="ลดหย่อนภาษีจากพ่อแม่" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.parent_deduction) }}
                    </p>
                  </template>
                </div>

                <!-- ✅ จำนวนผู้พิการที่ดูแล -->
                <div>
                  <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากผู้พิการ</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.disable_deduction" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="ลดหย่อนภาษีจากผู้พิการ" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.disable_deduction) }}
                    </p>
                  </template>
                </div>
              </div>
            </div>

            <!-- 🔹 Tax Deductions: Insurance & Social Benefits -->
            <div class="bg-white rounded-lg p-4 shadow-md">
              <h3 class="text-lg font-bold mb-4 text-gray-900">
                🏥 รายการลดหย่อนภาษี: ประกันและสวัสดิการ
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-gray-600 font-bold">เบี้ยประกันชีวิต</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.general_life_insurance" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="เบี้ยประกันชีวิต" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.general_life_insurance) }}
                    </p>
                  </template>
                </div>
                <div>
                  <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพ</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.self_life_insurance" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="เบี้ยประกันสุขภาพ" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.self_life_insurance) }}
                    </p>
                  </template>
                </div>
                <div>
                  <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพพ่อแม่</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.parent_life_insurance" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="เบี้ยประกันสุขภาพพ่อแม่" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.parent_life_insurance) }}
                    </p>
                  </template>
                </div>
                <div>
                  <label class="text-gray-600 font-bold">เบี้ยประกันบำนาญ</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.pension_life_insurance" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="เบี้ยประกันบำนาญ" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.pension_life_insurance) }}
                    </p>
                  </template>
                </div>
              </div>
            </div>

            <!-- 🔹 รายการลดหย่อนภาษี: อื่น ๆ -->
            <div class="bg-white rounded-lg p-4 shadow-md">
              <h3 class="text-lg font-bold mb-4 text-gray-900">
                📝 รายการลดหย่อนภาษี: อื่น ๆ
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <!-- ✅ ช้อปดีมีคืน -->
                <div>
                  <label class="text-gray-600 font-bold">ช้อปดีมีคืน (Easy Receipt)</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.easy_receipt" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="ช้อปดีมีคืน (Easy Receipt)" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.easy_receipt) }}
                    </p>
                  </template>
                </div>

                <!-- ✅ ดอกเบี้ยบ้าน -->
                <div>
                  <label class="text-gray-600 font-bold">ดอกเบี้ยสินเชื่อบ้าน</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.housing_interest" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="ดอกเบี้ยสินเชื่อบ้าน" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.housing_interest) }}
                    </p>
                  </template>
                </div>

                <!-- ✅ ซื้อบ้านใหม่ -->
                <div>
                  <label class="text-gray-600 font-bold">ค่าซื้อบ้านใหม่</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.new_housing" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="ค่าซื้อบ้านใหม่" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.new_housing) }}
                    </p>
                  </template>
                </div>
              </div>
            </div>

            <!-- 🔹 Tax Deductions: Donations -->
            <div class="bg-white rounded-lg p-4 shadow-md">
              <h3 class="text-lg font-bold mb-4 text-gray-900">
                🎗 ลดหย่อนภาษี: เงินบริจาค
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-gray-600 font-bold">เงินบริจาคทั่วไป</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.general_donation" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="เงินบริจาคทั่วไป" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.general_donation) }}
                    </p>
                  </template>
                </div>
                <div>
                  <label class="text-gray-600 font-bold">เงินบริจาคเพื่อการศึกษา</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.education_donation" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="เงินบริจาคเพื่อการศึกษา" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.education_donation) }}
                    </p>
                  </template>
                </div>
              </div>
            </div>

            <!-- 🔹 การลงทุนลดหย่อนภาษี -->
            <div class="bg-white rounded-lg p-4 shadow-md">
              <h3 class="text-lg font-bold mb-4 text-gray-900">📈 การลงทุนลดหย่อนภาษี</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-gray-600 font-bold">วิสาหกิจเพื่อสังคม
                  </label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.social_enterprise" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="เงินสมทบประกันสังคม" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.social_enterprise) }}
                    </p>
                  </template>
                </div>
                <!-- ✅ GPF -->
                <div>
                  <label class="text-gray-600 font-bold">กองทุนบำเหน็จบำนาญข้าราชการ (GPF)</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.pension_fund" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="กองทุนบำเหน็จบำนาญข้าราชการ (GPF)" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.pension_fund) }}
                    </p>
                  </template>
                </div>

                <!-- ✅ PVD -->
                <div>
                  <label class="text-gray-600 font-bold">กองทุนสำรองเลี้ยงชีพ (PVD)</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.provident_fund" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="กองทุนสำรองเลี้ยงชีพ (PVD)" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.provident_fund) }}
                    </p>
                  </template>
                </div>

                <!-- ✅ RMF -->
                <div>
                  <label class="text-gray-600 font-bold">RMF</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.rmf_fund" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="RMF" />
                  </template>
                  <template v-else>
                    <p class="output-field">{{ formatDisplayValue(taxInfo.rmf_fund) }}</p>
                  </template>
                </div>

                <!-- ✅ NSF -->
                <div>
                  <label class="text-gray-600 font-bold">กองทุนการออมแห่งชาติ (NSF)</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.national_saving_fund" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="กองทุนการออมแห่งชาติ (NSF)" />
                  </template>
                  <template v-else>
                    <p class="output-field">
                      {{ formatDisplayValue(taxInfo.national_saving_fund) }}
                    </p>
                  </template>
                </div>

                <!-- ✅ Thai ESG -->
                <div>
                  <label class="text-gray-600 font-bold">Thai ESG</label>
                  <template v-if="isEditingTax">
                    <input v-model="taxInfo.thai_esg" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="Thai ESG" />
                  </template>
                  <template v-else>
                    <p class="output-field">{{ formatDisplayValue(taxInfo.thai_esg) }}</p>
                  </template>
                </div>
              </div>
            </div>

            <!-- Replace the tax deduction goal section -->
            <div class="bg-white rounded-lg p-4 shadow-md">
              <h3 class="text-lg font-bold mb-4 text-gray-900">
                🎯 สรุปผลการคำนวณภาษี
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <!-- Replace the ประหยัดภาษีได้ section -->
                <div>
                  <label class="text-gray-600 font-bold">เงินได้รวม</label>
                  <p class="output-field">฿{{ formatNumber(taxInfo.total_income) }}</p>
                  <!-- <p class="text-sm text-gray-500 mt-2">
                    {{ Math.round((taxSavings / currentDeductions) * 100) }}%
                    ของยอดลดหย่อน
                  </p> -->
                </div>
                <!-- ยอดรวมการลดหย่อนปัจจุบัน -->
                <div>
                  <label class="text-gray-600 font-bold">ยอดรวมการลดหย่อนปัจจุบัน</label>
                  <p class="output-field">฿{{ formatNumber(taxInfo.total_deduction) }}</p>
                  <!-- <div class="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-teal-500 h-2 rounded-full transition-all duration-1000"
                      :style="{ width: `${(currentDeductions / deductionGoal) * 100}%` }"
                    ></div>
                  </div> -->
                </div>

                <!-- เป้าหมายการลดหย่อน -->
                <div>
                  <label class="text-gray-600 font-bold">เงินได้สุทธิ</label>
                  <template v-if="isEditingTax">
                    <input v-model="deductionGoal" type="number"
                      class="input-field w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="เป้าหมายการลดหย่อน" />
                  </template>
                  <template v-else>
                    <p class="output-field">฿{{ formatNumber(taxInfo.taxable_income) }}</p>
                  </template>
                  <!-- <p class="text-sm text-gray-500 mt-2">
                    เงินได้รวม ฿{{ formatNumber(taxInfo.taxable_income) }}
                  </p> -->
                </div>

                <!-- Replace the ประหยัดภาษีได้ section -->
                <div>
                  <label class="text-gray-600 font-bold">ภาษีที่ต้องจ่าย</label>
                  <p class="output-field">฿{{ formatNumber(usertax) }}</p>
                  <!-- <p class="text-sm text-gray-500 mt-2">
                    {{ Math.round((taxSavings / currentDeductions) * 100) }}%
                    ของยอดลดหย่อน
                  </p> -->
                </div>
              </div>
            </div>

            <!-- Add save/cancel buttons at the bottom -->
            <!-- <div class="text-center mt-6 flex justify-center space-x-4">
              <button
                v-if="isEditingTax"
                @click="saveTaxInfo"
                class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 font-bold"
              >
                ✔ บันทึกข้อมูล
              </button>
              <button
                v-if="isEditingTax"
                @click="cancelTaxEdit"
                class="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 font-bold"
              >
                ❌ ยกเลิก
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { useToast } from "vue-toastification";

export default {
  name: "Abouttax",
  components: {
    Navbar,
    Loading,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      isLoading: false,
      isSaving: false,
      usertax: 0,
      taxInfo: {
        monthly_income: 0,
        bonus_income: 0,
        additional_income: 0,
        personal_deduction: 0,
        marital_deduction: 0,
        child_deduction: 0,
        parent_deduction: 0,
        disable_deduction: 0,
        social_enterprise: 0,
        general_life_insurance: 0,
        self_life_insurance: 0,
        parent_life_insurance: 0,
        pension_life_insurance: 0,
        general_donation: 0,
        education_donation: 0,
        easy_receipt: 0,
        housing_interest: 0,
        new_housing: 0,
        prenatal_deduction: 0,
        pension_fund: 0,
        provident_fund: 0,
        rmf_fund: 0,
        national_saving_fund: 0,
        thai_esg: 0,
        total_deduction: 0,
        total_income: 0,
        taxable_income: 0,
        year: 0,
        username: "",
      },
      currentDeductions: 0, // Sum of all deductions
      deductionGoal: 0, // Target deduction amount with default value
      taxSavings: 0, // Estimated tax savings
      isEditingTax: false,
      originalTaxInfo: null,
      originalDeductionGoal: null,
    };
  },
  computed: {
    // Add computed property to calculate currentDeductions
    // calculatedDeductions() {
    //   const info = this.taxInfo;
    //   return (
    //     parseFloat(info.personal_deduction || 0) +
    //     parseFloat(info.marital_deduction || 0) +
    //     parseFloat(info.child_deduction || 0) +
    //     parseFloat(info.parent_deduction || 0) +
    //     parseFloat(info.disable_deduction || 0) +
    //     parseFloat(info.social_enterprise || 0) +
    //     parseFloat(info.general_life_insurance || 0) +
    //     parseFloat(info.self_life_insurance || 0) +
    //     parseFloat(info.parent_life_insurance || 0) +
    //     parseFloat(info.pension_life_insurance || 0) +
    //     parseFloat(info.general_donation || 0) +
    //     parseFloat(info.education_donation || 0) +
    //     parseFloat(info.easy_receipt || 0) +
    //     parseFloat(info.housing_interest || 0) +
    //     parseFloat(info.new_housing || 0) +
    //     parseFloat(info.prenatal_deduction || 0) +
    //     parseFloat(info.pension_fund || 0) +
    //     parseFloat(info.provident_fund || 0) +
    //     parseFloat(info.rmf_fund || 0) +
    //     parseFloat(info.national_saving_fund || 0) +
    //     parseFloat(info.thai_esg || 0)
    //   );
    // },
  },
  watch: {
    // Watch for changes in taxInfo to recalculate deductions
    // taxInfo: {
    //   handler() {
    //     // this.calculateTotalDeductions();
    //   },
    //   deep: true,
    // },

  },
  methods: {
    // Add method to calculate tax
    async fetchTaxGoal() {
      // Retrieve JWT token and username from localStorage
      const authToken = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");

      // API Endpoint
      const apiUrl = `/api/tax/user/${username}`;
      try {
        if (!authToken) {
          console.error("No JWT token found in localStorage!");
          return;
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
          this.usertax = data[0].users_tax;
          // console.log(data[0].users_tax);
        }
      } catch (error) {
        console.error("Error fetching tax goal:", error);
        this.toast.error("ไม่สามารถดึงข้อมูลเป้าหมายภาษี");
      }
    },
    async fetchTaxInfo() {
      this.isLoading = true;
      // Retrieve JWT token and username from localStorage
      const authToken = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");

      // API Endpoint
      const apiUrl = `/api/deduction/${username}/2025`;
      try {
        if (!authToken) {
          console.error("No JWT token found in localStorage!");
          this.isLoading = false;
          return;
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
          this.taxInfo = data;
          // this.calculateTotalDeductions();
        }
      } catch (error) {
        console.error("Error fetching tax info:", error);
        this.toast.error("ไม่สามารถดึงข้อมูลภาษี");
      } finally {
        this.isLoading = false;
      }
    },
    async calculateTax() {
      this.isLoading = true;
      try {
        // Calculate annual income
        const annualIncome =
          parseFloat(this.taxInfo.monthly_income || 0) * 12 +
          parseFloat(this.taxInfo.bonus_income || 0) +
          parseFloat(this.taxInfo.additional_income || 0);

        // Update total income
        this.taxInfo.total_income = annualIncome;

        // Calculate taxable income (income - deductions)
        this.taxInfo.taxable_income = Math.max(0, annualIncome - this.currentDeductions);

        // Calculate tax savings based on progressive tax brackets (simplified)
        this.calculateTaxSavings();
      } catch (error) {
        console.error("Error calculating tax:", error);
        this.toast.error("เกิดข้อผิดพลาดในการคำนวณภาษี");
      } finally {
        this.isLoading = false;
      }
    },
    formatNumber(num) {
      if (num === undefined || num === null) return "0";
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDisplayValue(value) {
      if (value === undefined || value === null) return "0";
      return `฿${this.formatNumber(value)}`;
    },
    calculateTotalDeductions() {
      // Update currentDeductions with the sum of all deductions
      this.currentDeductions = this.calculatedDeductions;

      // Update total deductions in taxInfo
      this.taxInfo.total_deduction = this.currentDeductions;

      // Calculate tax savings
      this.calculateTaxSavings();
    },
    calculateTaxSavings() {
      // Simplified tax saving calculation - can be enhanced with actual tax brackets
      // This is a basic progressive tax calculation for Thailand
      const income = this.taxInfo.total_income - this.currentDeductions;
      let tax = 0;

      // Progressive tax calculation using a different approach
      if (income > 5000000) {
        tax += (income - 5000000) * 0.35;
      }
      if (income > 2000000) {
        tax += (Math.min(income, 5000000) - 2000000) * 0.3;
      }
      if (income > 1000000) {
        tax += (Math.min(income, 2000000) - 1000000) * 0.25;
      }
      if (income > 750000) {
        tax += (Math.min(income, 1000000) - 750000) * 0.2;
      }
      if (income > 500000) {
        tax += (Math.min(income, 750000) - 500000) * 0.15;
      }
      if (income > 300000) {
        tax += (Math.min(income, 500000) - 300000) * 0.1;
      }
      if (income > 150000) {
        tax += (Math.min(income, 300000) - 150000) * 0.05;
      }

      // Calculate tax savings as approximately 20% of deductions (simplified)
      this.taxSavings = Math.round(this.currentDeductions * 0.2);
    },
    toggleTaxEdit() {
      this.isEditingTax = true;
      // Store original values
      this.originalTaxInfo = JSON.parse(JSON.stringify(this.taxInfo));
      this.originalDeductionGoal = this.deductionGoal;
    },
    async saveTaxInfo() {
      this.isSaving = true;
      try {
        const authToken = localStorage.getItem("jwtToken");
        const username = localStorage.getItem("username");

        // Update the API with new tax information
        const deductionResponse = await fetch(`/api/deduction/${username}/2025`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.taxInfo),
        });

        if (!deductionResponse.ok) {
          throw new Error(`HTTP error! Status: ${deductionResponse.status}`);
        }

        // Update the deduction goal
        const goalResponse = await fetch(`/api/tax/user/${username}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deduction_goal: this.deductionGoal }),
        });

        if (!goalResponse.ok) {
          throw new Error(`HTTP error! Status: ${goalResponse.status}`);
        }

        this.isEditingTax = false;
        this.toast.success("บันทึกข้อมูลภาษีเรียบร้อย!", {
          timeout: 1000,
          position: "top-center",
        });

        // Refresh data
        await this.fetchTaxInfo();
      } catch (error) {
        this.toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลภาษี");
        console.error(error);
      } finally {
        this.isSaving = false;
      }
    },
    cancelTaxEdit() {
      this.taxInfo = JSON.parse(JSON.stringify(this.originalTaxInfo));
      this.deductionGoal = this.originalDeductionGoal;
      this.isEditingTax = false;
      this.calculateTotalDeductions(); // Recalculate tax savings
      this.toast.info("ยกเลิกการแก้ไขข้อมูลภาษี", {
        timeout: 1000,
        position: "top-center",
      });
    },
  },
  mounted() {
    this.fetchTaxInfo();
    this.fetchTaxGoal();
  },
};
</script>

<style scoped>
/* Card Style */
.bg-white {
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.bg-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Output Field Style */
.output-field {
  width: 100%;
  padding: 6px;
  background-color: #f3f4f6;
  border-radius: 6px;
  text-align: right;
  font-weight: bold;
  color: #374151;
  transition: all 0.2s ease;
}

.output-field:hover {
  background-color: #e5e7eb;
  transform: scale(1.02);
}

/* Section Header Style */
h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1f2937;
  transition: all 0.2s ease;
}

/* Simple Emoji Float */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

/* Apply animation to emojis in headers */
h3>*:first-child {
  display: inline-block;
  animation: float 2s ease-in-out infinite;
}

/* Label Hover Effect */
.text-gray-600 {
  transition: color 0.2s ease;
}

.text-gray-600:hover {
  color: #2563eb;
}

/* Loading Fade Effect */
.bg-opacity-80 {
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s ease;
}

/* Add these to your existing styles */
.stat-card {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

/* Animation for numbers */
@keyframes number-increment {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card p {
  animation: number-increment 0.5s ease-out forwards;
}

/* Progress bar animation */
.bg-teal-500 {
  transition: width 1s ease-in-out;
}

/* Hover effect for cards */
.stat-card:hover h3 {
  color: #0d9488;
  /* Tailwind's teal-600 color */
}

/* Edit Button Animation */
button {
  transform: translateY(0);
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
}

/* ...existing styles... */

.input-field {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  box-shadow: 0 0 0 2px #2dd4bf;
  border-color: transparent;
  transform: scale(1.02);
}

.input-field:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

/* Add animation for transitioning between edit/view modes */
.input-field,
.output-field {
  transition: all 0.3s ease;
}
</style>
