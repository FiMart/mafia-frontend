<template>
<div class="surveytax-page flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
            <img src="@/assets/icon/logo1.png" alt="MAFIA Logo" class="h-12" />
        </div>

        <!-- Title -->
        <div class="text-center mb-6">
            <h2 class="text-xl font-semibold mb-2">แบบสอบถามข้อมูลภาษี</h2>
            <p class="text-gray-600">เพื่อนำไปคำนวณภาษีเงินได้บุคคลธรรมดาประจำปี</p>
        </div>

        <!-- Progress Steps -->
        <div class="flex justify-center mb-6">
            <div class="flex items-center">
                <template v-for="(step, index) in steps" :key="index">
                    <div class="flex items-center">
                        <div :class="[
                  'w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm',
                  isPastStep(index + 1) ? 'bg-green-500' : 'bg-gray-300'
                ]">
                            <template v-if="index + 1 < currentStep">
                                <!-- Checkmark for completed steps -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </template>
                            <template v-else>
                                {{ index + 1 }}
                            </template>
                        </div>
                        <div v-if="index < steps.length - 1" :class="[
                  'w-14 h-0.5',
                  isPastStep(index + 2) ? 'bg-green-500' : 'bg-gray-300'
                ]"></div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Step 1: Income -->
        <div v-if="currentStep === 1">
            <h3 class="text-lg font-semibold mb-4 text-center">รายได้</h3>
            <div class="grid grid-cols-2 gap-6">
                <!-- Left Column - Income -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 mb-2">รายได้ต่อเดือน</label>
                        <div class="relative">
                            <input v-model="formData.income.monthly" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">โบนัสประจำปี</label>
                        <div class="relative">
                            <input v-model="formData.income.bonus" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">รายได้อื่น ๆ</label>
                        <div class="relative">
                            <input v-model="formData.income.other" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Expenses -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 mb-2">ค่าใช้จ่าย</label>
                        <div class="relative">
                            <input v-model="formData.expenses.monthly" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">ค่าใช้จ่าย</label>
                        <div class="relative">
                            <input v-model="formData.expenses.bonus" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">ค่าใช้จ่าย</label>
                        <div class="relative">
                            <input v-model="formData.expenses.other" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Step 2: Family Deductions -->
        <div v-if="currentStep === 2">
            <h3 class="text-lg font-semibold mb-4 text-center">รายการลดหย่อนภาษี: ครอบครัว</h3>
            <div class="space-y-4">
                <!-- Marital Status -->
                <div class="flex items-center space-x-4">
                    <label class="w-32 text-gray-700">สถานะสมรส</label>
                    <select v-model="formData.familyDeductions.maritalStatus" class="flex-1 px-3 py-2 border rounded-full">
                        <option value="โสด">โสด</option>
                        <option value="สมรส">สมรส</option>
                        <option value="คู่สมรสมีเงินได้ (แยกยื่น)">คู่สมรสมีเงินได้ (แยกยื่น)</option>
                        <option value="คู่สมรสไม่มีเงินได้">คู่สมรสไม่มีเงินได้</option>
                    </select>
                </div>

                <!-- Self Parent Deductions -->
                <div class="space-y-2">
                    <div class="flex space-x-4">
                        <label class="w-32 text-gray-700">ลดหย่อนบิดา-มารดา (ตนเอง)</label>
                        <div class="flex items-center space-x-4">
                            <label class="inline-flex items-center">
                                <input type="checkbox" v-model="formData.familyDeductions.selfParentFather" class="form-checkbox">
                                <span class="ml-2">บิดา</span>
                            </label>
                            <label class="inline-flex items-center">
                                <input type="checkbox" v-model="formData.familyDeductions.selfParentMother" class="form-checkbox">
                                <span class="ml-2">มารดา</span>
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="w-32"></div>
                        <div class="relative flex-1">
                            <input v-model="formData.familyDeductions.selfParentDeduction" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>

                <!-- Spouse Parent Deductions -->
                <div class="space-y-2">
                    <div class="flex space-x-4">
                        <label class="w-32 text-gray-700">ลดหย่อนบิดา-มารดา (คู่สมรส)</label>
                        <div class="flex items-center space-x-4">
                            <label class="inline-flex items-center">
                                <input type="checkbox" v-model="formData.familyDeductions.spouseParentFather" class="form-checkbox">
                                <span class="ml-2">บิดา</span>
                            </label>
                            <label class="inline-flex items-center">
                                <input type="checkbox" v-model="formData.familyDeductions.spouseParentMother" class="form-checkbox">
                                <span class="ml-2">มารดา</span>
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="w-32"></div>
                        <div class="relative flex-1">
                            <input v-model="formData.familyDeductions.spouseParentDeduction" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>

                <!-- Children Count -->
                <div class="flex items-center space-x-4">
                    <label class="w-32 text-gray-700">จำนวนบุตร</label>
                    <div class="flex items-center space-x-2 flex-1">
                        <select v-model="formData.familyDeductions.childrenCount" class="w-20 px-3 py-2 border rounded-full">
                            <option v-for="n in 10" :key="n" :value="n-1">{{ n-1 }}</option>
                        </select>
                        <span class="w-8">คน</span>
                        <div class="relative flex-1">
                            <input v-model="formData.familyDeductions.childrenDeduction" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>

                <!-- Disabled Person Support -->
                <div class="flex items-center space-x-4">
                    <label class="w-32 text-gray-700">ลดหย่อนคนพิการ/ทุพพลภาพ</label>
                    <div class="flex items-center space-x-2 flex-1">
                        <select v-model="formData.familyDeductions.disabledPersonCount" class="w-20 px-3 py-2 border rounded-full">
                            <option v-for="n in 10" :key="n" :value="n-1">{{ n-1 }}</option>
                        </select>
                        <span class="w-8">คน</span>
                        <div class="relative flex-1">
                            <input v-model="formData.familyDeductions.disabledPersonDeduction" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Step 3: Donations -->
        <div v-if="currentStep === 3">
            <h3 class="text-lg font-semibold mb-4 text-center">รายการลดหย่อนภาษี: เงินบริจาค</h3>
            <div class="space-y-4">
                <!-- General Donation -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคทั่วไป</label>
                    <div class="relative flex-1">
                        <input v-model="formData.donations.general" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Education Donation -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคเพื่อการศึกษา</label>
                    <div class="relative flex-1">
                        <input v-model="formData.donations.education" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Political Donation -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคเพื่อการเมือง</label>
                    <div class="relative flex-1">
                        <input v-model="formData.donations.political" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Social Enterprise Donation -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคกิจการเพื่อสังคม</label>
                    <div class="relative flex-1">
                        <input v-model="formData.donations.social" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Step 4: Insurance -->
        <div v-if="currentStep === 4">
            <h3 class="text-lg font-semibold mb-4 text-center">รายการลดหย่อนภาษี: เบี้ยประกัน</h3>
            <div class="space-y-4">
                <!-- Life Insurance -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เบี้ยประกันชีวิต</label>
                    <div class="relative flex-1">
                        <input v-model="formData.insurance.life" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Health Insurance -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เบี้ยประกันสุขภาพ</label>
                    <div class="relative flex-1">
                        <input v-model="formData.insurance.health" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Pension Insurance -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เบี้ยประกันบำนาญ</label>
                    <div class="relative flex-1">
                        <input v-model="formData.insurance.pension" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Parent Health Insurance -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เบี้ยประกันสุขภาพบิดามารดา</label>
                    <div class="relative flex-1">
                        <input v-model="formData.insurance.parentHealth" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Step 5: Other Funds -->
        <div v-if="currentStep === 5">
            <h3 class="text-lg font-semibold mb-4 text-center">รายการลดหย่อนภาษี: กองทุนอื่นๆ</h3>
            <div class="space-y-4">
                <!-- General Funds -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคทั่วไป</label>
                    <div class="relative flex-1">
                        <input v-model="formData.funds.general" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Education Funds -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคเพื่อการศึกษา</label>
                    <div class="relative flex-1">
                        <input v-model="formData.funds.education" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Political Funds -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคเพื่อการเมือง</label>
                    <div class="relative flex-1">
                        <input v-model="formData.funds.political" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Social Enterprise Funds -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคกิจการเพื่อสังคม</label>
                    <div class="relative flex-1">
                        <input v-model="formData.funds.social" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>

                <!-- Business Funds -->
                <div class="flex items-center space-x-4">
                    <label class="w-48 text-gray-700">เงินบริจาคกิจการ</label>
                    <div class="relative flex-1">
                        <input v-model="formData.funds.business" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Step 6: Tax Withholding and Investment Funds -->
        <div v-if="currentStep === 6">
            <h3 class="text-lg font-semibold mb-4 text-center">สรุปภาพรวมการลดหย่อนภาษีของผู้ใช้
            </h3>
            <div class="flex justify-between items-center mb-6">
                <div class="text-lg font-semibold">รวมเงินได้สุทธิ</div>
                <div class="text-lg">0 บาท</div>
            </div>
            <div class="flex justify-between items-center mb-8">
                <div class="text-lg font-semibold">ภาษีที่ต้องจ่าย</div>
                <div class="text-lg">0 บาท</div>
            </div>

            <!-- Investment funds section title -->
            <h3 class="text-lg font-semibold text-center mb-8">
                ลดหย่อนภาษีจากการซื้อกองทุน RMF, SSF และ ThaiESG
            </h3>

            <div class="space-y-6">
                <!-- RMF Fund -->
                <div class="space-y-4">
                    <div class="flex items-center space-x-4">
                        <label class="w-48 text-gray-700">ลงทุน RMF ได้สูงสุด</label>
                        <div class="relative flex-1">
                            <input v-model="formData.funds.rmf" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <label class="w-48 text-gray-700">จำนวนเงินลงทุน RMF</label>
                        <div class="relative flex-1">
                            <input v-model="formData.funds.rmfInvestment" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>

                <!-- SSF Fund -->
                <div class="space-y-4">
                    <div class="flex items-center space-x-4">
                        <label class="w-48 text-gray-700">ลงทุน SSF ได้สูงสุด</label>
                        <div class="relative flex-1">
                            <input v-model="formData.funds.ssf" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <label class="w-48 text-gray-700">จำนวนเงินลงทุน SSF</label>
                        <div class="relative flex-1">
                            <input v-model="formData.funds.ssfInvestment" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>

                <!-- ThaiESG Fund -->
                <div class="space-y-4">
                    <div class="flex items-center space-x-4">
                        <label class="w-48 text-gray-700">ลงทุน ThaiESG ได้สูงสุด</label>
                        <div class="relative flex-1">
                            <input v-model="formData.funds.thaiESG" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <label class="w-48 text-gray-700">จำนวนเงินลงทุน ThaiESG</label>
                        <div class="relative flex-1">
                            <input v-model="formData.funds.thaiESGInvestment" type="text" inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                    </div>
                </div>

                <!-- Tax Summary -->
                <div class="mt-8 p-4 bg-gray-50 rounded-lg">
                    <div class="flex justify-between items-center mb-4">
                        <span class="font-semibold text-gray-700">เหลือภาษีที่ต้องจ่าย</span>
                        <span class="text-xl font-bold text-black">{{ calculateRemainingTax() }} บาท</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="mt-6 flex justify-center space-x-4">
            <button v-if="currentStep > 1" @click="prevStep" class="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500">
                ย้อนกลับ
            </button>
            <button @click="currentStep === steps.length ? submitForm() : handleStep1Next()" :class="[
            'text-white px-6 py-2 rounded-full',
            currentStep === steps.length ? 'bg-green-500 hover:bg-green-600' : 'bg-teal-600 hover:bg-teal-700'
          ]">
                {{ currentStep === steps.length ? 'ส่งข้อมูล' : 'ต่อไป' }}
            </button>
        </div>
    </div>
</div>
</template>

<script>
import {
    useRouter
} from 'vue-router';
import { useToast } from 'vue-toastification'

export default {
    setup() {
        const router = useRouter();
        const toast = useToast();
        return {
            router,
            toast
        };
    },
    data() {
        return {
            currentStep: 1,
            highestStep: 1,
            steps: ['รายรับ', 'ลดหย่อนครอบครัว', 'เงินบริจาค', 'ประกัน', 'กองทุนอื่นๆ', 'ภาษีหัก'],
            formData: {
                income: {
                    monthly: '', // รายได้ต่อเดือน
                    bonus: '', // โบนัสประจำปี
                    other: '', // รายได้อื่นๆ
                    social: '', // เงินประกันสังคม
                    government: '', // กองทุนข้าราชการ
                    provident: '', // กองทุนสำรองเลี้ยงชีพ
                    overtime: '', // ค่าล่วงเวลา
                    welfare: '' // สวัสดิการ
                },
                expenses: {
                    monthly: '', // ค่าใช้จ่ายทั่วไป
                    bonus: '', // ค่าใช้จ่ายพิเศษ
                    other: '', // ค่าใช้จ่ายอื่นๆ
                    standard: '100000', // ค่าใช้จ่ายมาตรฐาน
                    actual: '' // ค่าใช้จ่ายตามจริง
                },
                familyDeductions: {
                    maritalStatus: 'โสด',
                    personalDeduction: '60000', // ค่าลดหย่อนส่วนตัว
                    spouseDeduction: '', // ค่าลดหย่อนคู่สมรส
                    selfParentFather: false,
                    selfParentMother: false,
                    selfParentDeduction: '',
                    spouseParentFather: false,
                    spouseParentMother: false,
                    spouseParentDeduction: '',
                    childrenCount: 0,
                    childrenDeduction: '',
                    childEducation: '', // ค่าการศึกษาบุตร
                    childSupport: '', // อุปการะเลี้ยงดูบุตร
                    pregnancyDeduction: '', // ค่าฝากครรภ์/คลอดบุตร
                    disabledPersonCount: 0,
                    disabledPersonDeduction: '',
                    elderlySupport: '' // อุปการะเลี้ยงดูผู้สูงอายุ
                },
                donations: {
                    general: '', // เงินบริจาคทั่วไป
                    education: '', // เงินบริจาคเพื่อการศึกษา
                    political: '', // เงินบริจาคเพื่อการเมือง
                    social: '', // เงินบริจาคกิจการเพื่อสังคม
                },
                insurance: {
                    life: '', // ประกันชีวิต
                    health: '', // ประกันสุขภาพ
                    pension: '', // ประกันแบบบำนาญ
                    parentHealth: '', // ประกันสุขภาพบิดามารดา
                    socialSecurity: '' // ประกันสังคม
                },
                funds: {
                    rmf: '', // กองทุน RMF
                    ssf: '', // กองทุน SSF
                    pvd: '', // กองทุนสำรองเลี้ยงชีพ
                    gpf: '', // กองทุนบำเหน็จบำนาญข้าราชการ
                    teacherAid: '', // กองทุนช่วยครู
                    nationalSavings: '', // กองทุนการออมแห่งชาติ
                    pension: '', // กองทุนเพื่อการเกษียณ
                    general: '', // เงินบริจาคทั่วไป
                    education: '', // เงินบริจาคเพื่อการศึกษา
                    political: '', // เงินบริจาคเพื่อการเมือง
                    social: '', // เงินบริจาคกิจการเพื่อสังคม
                    business: '',
                    rmf: '',
                    rmfInvestment: '',
                    ssf: '',
                    ssfInvestment: '',
                    thaiESG: '',
                    thaiESGInvestment: '',
                    pvd: '',
                    gpf: '',
                    teacherAid: '',
                    nationalSavings: '',
                    pension: '',
                    general: '',
                    education: '',
                    political: '',
                    social: '',
                    business: '' // เงินบริจาคกิจการ
                },
                loans: {
                    homeLoanInterest: '', // ดอกเบี้ยบ้าน
                    homeLoanPrincipal: '', // เงินต้นบ้าน
                    evCarLoan: '' // เงินกู้รถยนต์ไฟฟ้า
                },
                taxWithheld: '' // ภาษีหัก ณ ที่จ่าย
            }
        }
    },
    computed: {
        isPastStep() {
            return (step) => {
                if (step === this.currentStep) return true;
                return step < this.currentStep && step <= this.highestStep;
            }
        },
        annualIncome() {
            return this.calculateTotalIncome();
        }
    },
    methods: {
        nextStep() {
            if (this.currentStep < this.steps.length) {
                // Data persists when moving forward
                this.currentStep++;
                this.highestStep = Math.max(this.highestStep, this.currentStep);
            }
        },
        prevStep() {
            if (this.currentStep > 1) {
                // Data persists when moving backward
                this.currentStep--;
            }
        },
        async submitForm() {
            try {
                // Your existing form submission logic here
                // ...

                // Show success toast with centered position
                this.toast.success('กรอกข้อมูลเสร็จสิ้น', {
                    timeout: 2000,
                    position: "top-center",
                    toastClassName: "custom-toast-center",
                });

                // Redirect after 2 seconds
                setTimeout(() => {
                    this.router.push('/home');
                }, 2000);

            } catch (error) {
                this.toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', {
                    position: "top-center",
                    toastClassName: "custom-toast-center",
                });
            }
        },
        resetForm() {
            this.currentStep = 1;
            this.highestStep = 1;
            this.isSubmitted = false;
            // Reset form data to initial state
            this.formData = {
                income: {
                    monthly: '',
                    bonus: '',
                    other: ''
                },
                expenses: {
                    monthly: '',
                    bonus: '',
                    other: ''
                },
                familyDeductions: {
                    maritalStatus: 'โสด',
                    selfParentFather: false,
                    selfParentMother: false,
                    selfParentDeduction: '',
                    spouseParentFather: false,
                    spouseParentMother: false,
                    spouseParentDeduction: '',
                    childrenCount: 0,
                    childrenDeduction: '',
                    disabledPersonCount: 0,
                    disabledPersonDeduction: ''
                },
                donations: {
                    general: '',
                    education: '',
                    political: '',
                    social: ''
                },
                insurance: {
                    life: '',
                    health: ''
                },
                funds: {
                    rmf: '',
                    ssf: ''
                },
                taxWithheld: ''
            };
        },
        validateIncome() {
            // Validate all income fields are filled correctly
            const income = this.formData.income;
            return {
                isValid: true,
                monthly: this.validateNumber(income.monthly),
                bonus: this.validateNumber(income.bonus),
                other: this.validateNumber(income.other),
                social: this.validateNumber(income.social),
                government: this.validateNumber(income.government),
                provident: this.validateNumber(income.provident),
                overtime: this.validateNumber(income.overtime),
                welfare: this.validateNumber(income.welfare)
            };
        },

        validateNumber(value) {
            return !isNaN(parseFloat(value)) && value >= 0;
        },

        calculateTotalIncome() {
            const income = this.formData.income;
            return (parseFloat(income.monthly) || 0) * 12 +
                (parseFloat(income.bonus) || 0) +
                (parseFloat(income.other) || 0) +
                (parseFloat(income.overtime) || 0) +
                (parseFloat(income.welfare) || 0);
        },

        handleStep1Next() {
            const validation = this.validateIncome();
            if (validation.isValid) {
                this.nextStep();
            } else {
                // Handle validation error
                this.showError('กรุณากรอกข้อมูลให้ถูกต้อง');
            }
        },

        showError(message) {
            // Add error handling logic here
            console.error(message);
        },
        calculateRemainingTax() {
            // Implement your tax calculation logic here
            const totalIncome = this.calculateTotalIncome();
            const totalDeductions = this.calculateTotalDeductions();
            const totalInvestments = this.calculateTotalInvestment();

            // This is a placeholder calculation - adjust according to your tax rules
            const taxableIncome = Math.max(0, totalIncome - totalDeductions - totalInvestments);
            // Implement progressive tax calculation here
            return (0).toLocaleString();
        },

        calculateTotalInvestment() {
            const rmf = parseFloat(this.formData.funds.rmfInvestment) || 0;
            const ssf = parseFloat(this.formData.funds.ssfInvestment) || 0;
            const thaiESG = parseFloat(this.formData.funds.thaiESGInvestment) || 0;
            return (rmf + ssf + thaiESG).toLocaleString();
        },

        calculateTotalDeductions() {
            // Implement calculation of all deductions here
            return 0;
        },

        validateFunds() {
            const funds = this.formData.funds;
            return {
                isValid: true,
                rmf: this.validateNumber(funds.rmf),
                rmfInvestment: this.validateNumber(funds.rmfInvestment),
                ssf: this.validateNumber(funds.ssf),
                ssfInvestment: this.validateNumber(funds.ssfInvestment),
                thaiESG: this.validateNumber(funds.thaiESG),
                thaiESGInvestment: this.validateNumber(funds.thaiESGInvestment)
            };
        }
    }
}
</script>

<style scoped>
.surveytax-page {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
}

.past-step {
    color: green;
    font-weight: bold;
}

/* Add custom styles for form elements */
.form-checkbox {
    height: 1rem;
    width: 1rem;
    color: #319795;
    /* text-teal-600 */
    border-radius: 0.25rem;
    /* rounded */
    border-color: #D1D5DB;
    /* border-gray-300 */
}

.form-checkbox:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(50, 138, 138, 0.5);
    /* ring-teal-500 */
}

/* Optional: Add hover effects for interactivity */
.form-checkbox:hover {
    cursor: pointer;
}

/* Ensure consistent input styling */
input[type="text"]:focus,
input[type="number"]:focus,
select:focus {
    box-shadow: 0 0 0 2px rgba(50, 138, 138, 0.5);
    /* ring-teal-500 */
    border-color: #319795;
    /* teal-500 */
    outline: none;
}
</style>

<style>
.custom-toast-center {
    margin: 0 auto !important;
    text-align: center !important;
}

.Vue-Toastification__container.top-center {
    top: 50% !important;
    transform: translateY(-50%) !important;
    left: 0;
    right: 0;
    margin: 0 auto;
}
</style>
