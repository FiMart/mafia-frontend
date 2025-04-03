<template>
    <div class="surveytax-page flex items-center justify-center min-h-screen">
        <!-- Update Loading Components -->
        <Loading v-if="isSubmitting" message="กำลังบันทึกข้อมูล..." class="fixed inset-0 bg-black bg-opacity-80 z-50" />

        <Loading v-if="isCalculating" message="กำลังคำนวณภาษี..." class="fixed inset-0 bg-black bg-opacity-80 z-50" />

        <Loading v-if="isNavigating" message="กำลังโหลดขั้นตอนถัดไป..."
            class="fixed inset-0 bg-black bg-opacity-80 z-50" />

        <!-- Modal Popup -->

        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
            <!-- Overlay -->
            <div class="fixed inset-0 bg-black opacity-50"></div>

            <!-- Modal Content -->
            <div class="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative z-10">
                <!-- Header with Icon -->
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold flex items-center justify-center gap-2">
                        📊 <span>ผลการคำนวณภาษี</span>
                    </h3>
                </div>

                <!-- Tax Info Sections -->
                <div class="space-y-3">
                    <div class="flex justify-between bg-gray-100 px-4 py-2 rounded-lg">
                        <span class="text-gray-600 font-medium">ค่าลดหย่อนทั้งหมด:</span>
                        <span class="text-blue-600 font-bold">{{ formatNumber(modalTotalDeduction) }} บาท</span>
                    </div>

                    <div class="flex justify-between bg-gray-100 px-4 py-2 rounded-lg">
                        <span class="text-gray-600 font-medium">รายได้สุทธิ:</span>
                        <span class="text-green-600 font-bold">{{ formatNumber(modalTaxableIncome) }} บาท</span>
                    </div>

                    <div class="flex justify-between items-center bg-red-100 px-4 py-2 rounded-lg">
                        <span class="text-red-600 font-bold flex items-center gap-1">💰 ภาษีที่ต้องจ่าย:</span>
                        <span class="text-red-600 font-bold">{{ formatNumber(modalTaxAmount) }} บาท</span>
                        <!-- <span class="text-red-600 font-bold">500 บาท</span> -->
                    </div>
                </div>
                <!-- Close Button -->
                <div class="flex justify-center mt-6">
                    <button @click="closeModal" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                        ปิด
                    </button>
                </div>
            </div>
        </div>



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
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
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
                <h3 class="text-lg font-bold mb-4 text-center">💰 รายได้</h3>
                <div class="bg-white rounded-lg p-4 shadow-md">
                    <div class="grid grid-cols-1 gap-4">
                        <!-- รายได้ต่อเดือน -->
                        <div>
                            <label class="text-gray-600 font-bold">รายได้ต่อเดือน</label>
                            <div class="relative">
                                <input v-model="tax_info2025.monthly_income" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                        </div>

                        <!-- โบนัส -->
                        <div>
                            <label class="text-gray-600 font-bold">โบนัส</label>
                            <div class="relative">
                                <input v-model="tax_info2025.bonus_income" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                        </div>

                        <!-- รายได้อื่นๆ -->
                        <div>
                            <label class="text-gray-600 font-bold">รายได้อื่น ๆ</label>
                            <div class="relative">
                                <input v-model="tax_info2025.additional_income" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 2: Family Deductions -->
            <div v-if="currentStep === 2">
                <h3 class="text-lg font-bold mb-6 text-center">👨‍👩‍👧‍👦 รายการลดหย่อนภาษี: ครอบครัว</h3>
                <div class="bg-white rounded-lg p-6 shadow-md">
                    <div class="grid grid-cols-1 gap-6">
                        <!-- สถานะสมรส -->
                        <div class="mb-4">
                            <div class="w-full mx-auto">
                                <label class="text-gray-600 font-bold text-base mb-1 block">สถานะสมรส</label>
                                <select v-model="tax_info2025.marital_status"
                                    class="w-full px-3 py-2 border rounded-full text-gray-700">
                                    <option value="single">โสด</option>
                                    <option value="married">สมรส</option>
                                </select>
                                <div>
                                    <label class="text-gray-600 font-bold">ค่าฝากครรภ์และคลอดบุตร</label>
                                    <div class="relative">
                                        <input v-model="tax_info2025.prenatal_expense" type="number" min="0"
                                            @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                            class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- จำนวนบุตร และตัวเลือกอื่น ๆ -->
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label class="p-2 text-white-600 font-bold">จำนวนบุตร</label>
                                <select v-model="totalChildren"
                                    class="w-full px-3 py-2 border rounded-full text-gray-700">
                                    <option v-for="n in 10" :key="n" :value="n - 1">{{ n - 1 }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="p-2 text-white-600 font-bold">จำนวนบุตรที่เกิดหลัง 2561</label>
                                <select v-model="childrenAfter2018"
                                    class="w-full px-3 py-2 border rounded-full text-gray-700">
                                    <option v-for="n in 10" :key="n" :value="n - 1">{{ n - 1 }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="p-2 text-white-600 font-bold">จำนวนบุตรบุญธรรม</label>
                                <select v-model="adoptedChildren"
                                    class="w-full px-3 py-2 border rounded-full text-gray-700">
                                    <option v-for="n in 10" :key="n" :value="n - 1">{{ n - 1 }}</option>
                                </select>
                            </div>
                        </div>

                        <!-- จำนวนพ่อแม่ที่ดูแลและผู้พิการที่ดูแล -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">จำนวนพ่อแม่ที่ดูแล</label>
                                <select v-model="tax_info2025.number_of_parents"
                                    class="w-full px-3 py-2 border rounded-full text-gray-700">
                                    <option v-for="n in 5" :key="n - 1" :value="n - 1">{{ n - 1 }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">จำนวนผู้พิการที่ดูแล</label>
                                <select v-model="tax_info2025.has_disabled_person"
                                    class="w-full px-3 py-2 border rounded-full text-gray-700">
                                    <option :value="false">ไม่มี</option>
                                    <option :value="true">มี</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 3: Insurance and Benefits -->
            <div v-if="currentStep === 3">
                <h3 class="text-lg font-bold mb-4 text-center">🏥 รายการลดหย่อนภาษี: ประกันและสวัสดิการ</h3>
                <div class="bg-white rounded-lg p-4 shadow-md">
                    <div class="grid grid-cols-2 gap-4">
                        <!-- เงินสมทบประกันสังคม -->
                        <!-- <div>
                            <label class="text-gray-600 font-bold">เงินสมทบประกันสังคม</label>
                            <div class="relative">
                                <input v-model="tax_info2025.social_security" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 9,000 บาท</p>
                        </div> -->

                        <!-- เบี้ยประกันชีวิต -->
                        <div>
                            <label class="text-gray-600 font-bold">เบี้ยประกันชีวิต</label>
                            <div class="relative">
                                <input v-model="tax_info2025.general_life_insurance" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 100,000 บาท</p>
                        </div>

                        <!-- เบี้ยประกันสุขภาพ -->
                        <div>
                            <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพ</label>
                            <div class="relative">
                                <input v-model="tax_info2025.self_life_insurance" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 25,000 บาท</p>
                        </div>

                        <!-- เบี้ยประกันสุขภาพพ่อแม่ -->
                        <div>
                            <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพพ่อแม่</label>
                            <div class="relative">
                                <input v-model="tax_info2025.parent_life_insurance" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 15,000 บาท</p>
                        </div>

                        <!-- เบี้ยประกันบำนาญ -->
                        <div>
                            <label class="text-gray-600 font-bold">เบี้ยประกันบำนาญ</label>
                            <div class="relative">
                                <input v-model="tax_info2025.pension_life_insurance" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 200,000 บาท</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 4: Other Deductions -->
            <div v-if="currentStep === 4">
                <h3 class="text-lg font-bold mb-4 text-center">📝 รายการลดหย่อนภาษี: อื่น ๆ</h3>
                <div class="bg-white rounded-lg p-4 shadow-md">
                    <div class="grid grid-cols-2 gap-4">
                        <!-- ช้อปดีมีคืน -->
                        <div>
                            <label class="text-gray-600 font-bold">ช้อปดีมีคืน (Easy Receipt)</label>
                            <div class="relative">
                                <input v-model="tax_info2025.easy_receipt" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 50,000 บาท</p>
                        </div>

                        <!-- ดอกเบี้ยสินเชื่อบ้าน -->
                        <div>
                            <label class="text-gray-600 font-bold">ดอกเบี้ยสินเชื่อบ้าน</label>
                            <div class="relative">
                                <input v-model="tax_info2025.housing_interest" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 100,000 บาท</p>
                        </div>

                        <!-- ซื้อบ้านใหม่ -->
                        <div>
                            <label class="text-gray-600 font-bold">ค่าซื้อบ้านใหม่</label>
                            <div class="relative">
                                <input v-model="tax_info2025.new_housing" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 200,000 บาท</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 5: Donations -->
            <div v-if="currentStep === 5">
                <h3 class="text-lg font-semibold mb-4 text-center">เงินบริจาค</h3>
                <div class="grid grid-cols-1 gap-4">
                    <!-- บริจาคทั่วไป -->
                    <div>
                        <label class="text-gray-600 font-bold">บริจาคทั่วไป</label>
                        <div class="relative">
                            <input v-model="tax_info2025.general_donation" type="number" min="0"
                                @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 50,000 บาท</p>
                    </div>

                    <!-- บริจาคเพื่อการศึกษา -->
                    <div>
                        <label class="text-gray-600 font-bold">บริจาคเพื่อการศึกษา</label>
                        <div class="relative">
                            <input v-model="tax_info2025.education_donation" type="number" min="0"
                                @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 15,000 บาท</p>
                    </div>
                </div>
            </div>

            <!-- Step 6: Investment Tax Deductions -->
            <div v-if="currentStep === 6">
                <h3 class="text-lg font-bold mb-4 text-center">📈 การลงทุนลดหย่อนภาษี</h3>
                <div class="bg-white rounded-lg p-4 shadow-md">
                    <div class="grid grid-cols-2 gap-4">
                        <!-- วิสาหกิจเพื่อสังคม -->
                        <div>
                            <label class="text-gray-600 font-bold">วิสาหกิจเพื่อสังคม</label>
                            <div class="relative">
                                <input v-model="tax_info2025.social_enterprise" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                        </div>
                        <!-- กองทุนบำเหน็จบำนาญ (GPF) -->
                        <div>
                            <label class="text-gray-600 font-bold">กองทุนบำเหน็จบำนาญข้าราชการ (GPF)</label>
                            <div class="relative">
                                <input v-model="tax_info2025.pension_fund" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                        </div>
                        <!-- กองทุนสำรองเลี้ยงชีพ (PVD) -->
                        <div>
                            <label class="text-gray-600 font-bold">กองทุนสำรองเลี้ยงชีพ (PVD)</label>
                            <div class="relative">
                                <input v-model="tax_info2025.provident_fund" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                        </div>
                        <!-- RMF -->
                        <div>
                            <label class="text-gray-600 font-bold">RMF</label>
                            <div class="relative">
                                <input v-model="tax_info2025.rmf_fund" type="number" min="0" @keydown="allowOnlyNumericAndDecimal"
                                    @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 30% ของเงินได้</p>
                        </div>
                        <!-- กองทุนการออมแห่งชาติ (NSF) -->
                        <div>
                            <label class="text-gray-600 font-bold">กองทุนการออมแห่งชาติ (NSF)</label>
                            <div class="relative">
                                <input v-model="tax_info2025.national_saving_fund" type="number" min="0"
                                    @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                        </div>
                        <!-- Thai ESG -->
                        <div>
                            <label class="text-gray-600 font-bold">Thai ESG</label>
                            <div class="relative">
                                <input v-model="tax_info2025.thai_esg" type="number" min="0" @keydown="allowOnlyNumericAndDecimal"
                                    @paste="checkPaste" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 30% ของเงินได้</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-6 flex justify-center space-x-4">
                <button v-if="currentStep > 1" @click="prevStep" :disabled="isNavigating"
                    class="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 disabled:opacity-50">
                    ย้อนกลับ
                </button>
                <button @click="currentStep === steps.length ? submitForm() : handleStepNext()"
                    :disabled="isNavigating || isCalculating || isSubmitting" :class="[
                        'text-white px-6 py-2 rounded-full disabled:opacity-50',
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
import { ref } from 'vue'
import Loading from '@/components/Loading.vue'

export default {
    components: {
        Loading
    },
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
            isSubmitting: false,
            isCalculating: false,
            isNavigating: false,
            currentStep: 1,
            highestStep: 1,
            steps: ['รายรับ', 'ลดหย่อนครอบครัว', 'ประกัน', 'ลดหย่อนอื่น ๆ', 'เงินบริจาค', , 'กองทุนอื่นๆ'],
            totalChildren: 0,
            childrenAfter2018: 0,
            adoptedChildren: 0,
            // ตัวแปรสำหรับ modal
            showModal: false,
            modalTaxableIncome: null,
            modalTotalDeduction: null,
            modalTaxAmount: null,
            tax_info2025: {
                // รายรับ
                monthly_income: 0,       // float
                bonus_income: 0,                // float
                additional_income: 0,         // float

                // สถานะครอบครัว
                marital_status: "single",         // MaritalStatus (ค่าเริ่มต้น 0)
                // num_children: 0,            // int
                children: [],
                number_of_parents: 0,              // int
                has_disabled_person: false,  // int

                // ประกันและสวัสดิการ
                general_life_insurance: 0,
                // social_security: 0,             // float
                self_life_insurance: 0,              // float
                // health_insurance: 0,            // float
                parent_life_insurance: 0,     // float
                pension_life_insurance: 0,           // float

                // กองทุนและการลงทุน
                social_enterprise: 0,     // float
                thai_esg: 0,              // float
                rmf_fund: 0,                   // float
                // ssf: 0,                   // float
                provident_fund: 0,                   // float
                pension_fund: 0,                   // float
                national_saving_fund: 0,                   // float

                // เงินบริจาค
                general_donation: 0,      // float
                education_donation: 0,    // float
                // political_donation: 0,    // float

                // มาตรการภาษีหัก
                easy_receipt: 0,          // float
                // secondary_tourism: 0,     // float

                // ลดหย่อนที่อยู่อาศัย
                housing_interest: 0,     // float
                new_housing: 0,        // float

                // ค่าใช้จ่ายครรภ์มารดา
                prenatal_expense: 0      // float
            },
        }
    },
    computed: {
        isPastStep() {
            return (step) => {
                if (step === this.currentStep) return true;
                return step < this.currentStep && step <= this.highestStep;
            }
        },
        computedChildren() {
            const total = this.totalChildren;
            const bornAfter = this.childrenAfter2018;
            const adopted = this.adoptedChildren;
            const childrenArray = [];
            for (let i = 0; i < total; i++) {
                childrenArray.push({
                    birth_after_2018: i < bornAfter, // สมมุติว่า children ที่ index ต่ำสุดถือว่าเกิดหลัง 2561
                    is_adopted: i < adopted        // สมมุติว่า children ที่ index ต่ำสุดถือว่าบุญธรรม
                });
            }
            return childrenArray;
        },
    },
    methods: {
        allowOnlyNumericAndDecimal(e) {
            const allowedKeys = [
                "Backspace", "Tab", "Delete", "ArrowLeft", "ArrowRight", "Home", "End",
            ];

            const isNumber = /^[0-9]$/.test(e.key);
            const isDot = e.key === ".";

            // ไม่ให้พิมพ์ . ซ้ำ
            const alreadyHasDot = e.target.value.includes(".");

            if (
                !isNumber &&
                !allowedKeys.includes(e.key) &&
                !(isDot && !alreadyHasDot)
            ) {
                e.preventDefault();
            }
        },
        checkPaste(e) {
            const pasted = (e.clipboardData || window.clipboardData).getData("text");
            if (!/^\d*\.?\d*$/.test(pasted)) {
                e.preventDefault();
            }
        },
        formatNumber(value) {
            return Number(value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },
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
            this.isSubmitting = true;
            const jwtToken = localStorage.getItem('jwtToken');
            const username = localStorage.getItem('username');

            // หากมีการอัปเดต children ก่อนส่งข้อมูล ให้ทำที่นี่
            // เช่น:  หรือวิธีที่คุณต้องการ
            this.tax_info2025.children = this.computedChildren;
            try {
                const response = await fetch(`/api/tax-2025/calculate/${username}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify(this.tax_info2025) // แปลงเป็น JSON string
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                localStorage.setItem('marital_status', this.tax_info2025.marital_status);
                localStorage.setItem('children', this.totalChildren);
                localStorage.setItem('childernAfter2018', this.childrenAfter2018);
                localStorage.setItem('adoptedChildren', this.adoptedChildren);
                localStorage.setItem('number_of_parents', this.tax_info2025.number_of_parents);
                localStorage.setItem('has_disabled_person', this.tax_info2025.has_disabled_person);
                const data = await response.json();
                const taxable_income = data.calculations.taxable_income;
                const total_deduction = data.calculations.total_deduction;
                const final_tax = data.calculations.tax_calculation.final_tax;

                // อัปเดตข้อมูลใน modal
                this.modalTaxableIncome = taxable_income;
                this.modalTotalDeduction = total_deduction;
                this.modalTaxAmount = final_tax;
                this.showModal = true;

            } catch (error) {
                this.toast.error('เกิดข้อผิดพลาดระหว่างการส่งข้อมูล', {
                    position: "top-center",
                    timeout: 1000,
                    toastClassName: "custom-toast-center"
                });
            } finally {
                this.isSubmitting = false;
            }
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
        async handleStepNext() {
            this.isNavigating = true;
            try {
                // ให้ไปขั้นตอนถัดไปได้เลยโดยไม่ต้องตรวจสอบ
                this.nextStep();
            } finally {
                this.isNavigating = false;
            }
        },
        closeModal() {
            this.showModal = false;
            this.router.push('/home');
        },
    },
}
</script>

<style scoped>
/* Background Style */
.surveytax-page {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
}

/* Basic Input Styles */
input[type="text"],
input[type="number"],
select {
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
select:focus {
    border-color: #319795;
    outline: none;
}

/* Step Indicator */
.past-step {
    color: #22c55e;
    font-weight: bold;
}

/* Basic Button Animation */
button {
    transition: all 0.3s ease;
}

button:not(:disabled):hover {
    transform: translateY(-2px);
}

button:not(:disabled):active {
    transform: translateY(0);
}

/* Loading Background */
.bg-opacity-80 {
    background-color: rgba(0, 0, 0, 0.9) !important;
}

/* Basic Toast Styling */
.custom-toast-center {
    margin: 0 auto !important;
    text-align: center !important;
}

/* Basic Loading Animation */
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
