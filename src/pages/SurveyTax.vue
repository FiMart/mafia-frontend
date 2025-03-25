<template>
<<<<<<< HEAD
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
            <div class="bg-white rounded-lg shadow-lg p-6 relative z-10 w-11/12 max-w-md">
                <h3 class="text-xl font-bold mb-4 text-center">ผลการคำนวณภาษี</h3>
                <p class="mb-4">
                    <span class="font-bold">ค่าลดหย่อนทั้งหมด:</span>
                    {{ modalTotalDeduction }} บาท
                </p>
                <p class="mb-2">
                    <span class="font-bold">รายได้สุทธิ:</span>
                    {{ modalTaxableIncome }} บาท
                </p>
                <div class="flex justify-center">
                    <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                        ปิด
                    </button>
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
                </div>
            </div>
        </div>

<<<<<<< HEAD

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
                                <input v-model="tax_info2025.monthly_income" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                        </div>

                        <!-- โบนัส -->
                        <div>
                            <label class="text-gray-600 font-bold">โบนัส</label>
                            <div class="relative">
                                <input v-model="tax_info2025.bonus_income" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                        </div>

                        <!-- รายได้อื่นๆ -->
                        <div>
                            <label class="text-gray-600 font-bold">รายได้อื่น ๆ</label>
                            <div class="relative">
                                <input v-model="tax_info2025.additional_income" type="number" inputmode="numeric"
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
                                    class="w-full px-3 py-2 border rounded-full text-base">
                                    <option value="single">โสด</option>
                                    <option value="married">สมรส</option>
                                </select>
                                <div>
                                    <label class="text-gray-600 font-bold">ค่าฝากครรภ์และคลอดบุตร</label>
                                    <div class="relative">
                                        <input v-model="tax_info2025.pregnancy_expense" type="number"
                                            inputmode="numeric" class="w-full px-3 py-2 border rounded-full pr-12"
                                            placeholder="0.00" />
                                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- จำนวนบุตร และตัวเลือกอื่น ๆ -->
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">จำนวนบุตร</label>
                                <select v-model="totalChildren" class="w-full px-3 py-2 border rounded-full">
                                    <option v-for="n in 10" :key="n" :value="n - 1">{{ n - 1 }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">จำนวนบุตรที่เกิดหลัง 2561</label>
                                <select v-model="childrenAfter2018" class="w-full px-3 py-2 border rounded-full">
                                    <option v-for="n in 10" :key="n" :value="n - 1">{{ n - 1 }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">จำนวนบุตรบุญธรรม</label>
                                <select v-model="adoptedChildren" class="w-full px-3 py-2 border rounded-full">
                                    <option v-for="n in 10" :key="n" :value="n - 1">{{ n - 1 }}</option>
                                </select>
                            </div>
                        </div>

                        <!-- จำนวนพ่อแม่ที่ดูแลและผู้พิการที่ดูแล -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">จำนวนพ่อแม่ที่ดูแล</label>
                                <select v-model="tax_info2025.num_parents" class="w-full px-3 py-2 border rounded-full">
                                    <option v-for="n in 5" :key="n - 1" :value="n - 1">{{ n - 1 }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">จำนวนผู้พิการที่ดูแล</label>
                                <select v-model="tax_info2025.has_disabled_person"
                                    class="w-full px-3 py-2 border rounded-full">
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
                        <div>
                            <label class="text-gray-600 font-bold">เงินสมทบประกันสังคม</label>
                            <div class="relative">
                                <input v-model="tax_info2025.social_security" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 9,000 บาท</p>
                        </div>

                        <!-- เบี้ยประกันชีวิต -->
                        <div>
                            <label class="text-gray-600 font-bold">เบี้ยประกันชีวิต</label>
                            <div class="relative">
                                <input v-model="tax_info2025.general_life_insurance" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 100,000 บาท</p>
                        </div>

                        <!-- เบี้ยประกันสุขภาพ -->
                        <div>
                            <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพ</label>
                            <div class="relative">
                                <input v-model="tax_info2025.self_life_insurance" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 25,000 บาท</p>
                        </div>

                        <!-- เบี้ยประกันสุขภาพพ่อแม่ -->
                        <div>
                            <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพพ่อแม่</label>
                            <div class="relative">
                                <input v-model="tax_info2025.parent_life_insurance" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 15,000 บาท</p>
                        </div>

                        <!-- เบี้ยประกันบำนาญ -->
                        <div>
                            <label class="text-gray-600 font-bold">เบี้ยประกันบำนาญ</label>
                            <div class="relative">
                                <input v-model="tax_info2025.pension_life_insurance" type="number" inputmode="numeric"
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
                                <input v-model="tax_info2025.easy_receipt" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 50,000 บาท</p>
                        </div>

                        <!-- ดอกเบี้ยสินเชื่อบ้าน -->
                        <div>
                            <label class="text-gray-600 font-bold">ดอกเบี้ยสินเชื่อบ้าน</label>
                            <div class="relative">
                                <input v-model="tax_info2025.housing_interest" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 100,000 บาท</p>
                        </div>

                        <!-- ซื้อบ้านใหม่ -->
                        <div>
                            <label class="text-gray-600 font-bold">ค่าซื้อบ้านใหม่</label>
                            <div class="relative">
                                <input v-model="tax_info2025.new_house_cost" type="number" inputmode="numeric"
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
                            <input v-model="tax_info2025.general_donation" type="number" inputmode="numeric"
                                class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 50,000 บาท</p>
                    </div>

                    <!-- บริจาคเพื่อการศึกษา -->
                    <div>
                        <label class="text-gray-600 font-bold">บริจาคเพื่อการศึกษา</label>
                        <div class="relative">
                            <input v-model="tax_info2025.education_donation" type="number" inputmode="numeric"
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
                                <input v-model="tax_info2025.social_enterprise" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                        </div>
                        <!-- กองทุนบำเหน็จบำนาญ (GPF) -->
                        <div>
                            <label class="text-gray-600 font-bold">กองทุนบำเหน็จบำนาญข้าราชการ (GPF)</label>
                            <div class="relative">
                                <input v-model="tax_info2025.pension_fund" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                        </div>
                        <!-- กองทุนสำรองเลี้ยงชีพ (PVD) -->
                        <div>
                            <label class="text-gray-600 font-bold">กองทุนสำรองเลี้ยงชีพ (PVD)</label>
                            <div class="relative">
                                <input v-model="tax_info2025.provident_fund" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                        </div>
                        <!-- RMF -->
                        <div>
                            <label class="text-gray-600 font-bold">RMF</label>
                            <div class="relative">
                                <input v-model="tax_info2025.rmf_fund" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 30% ของเงินได้</p>
                        </div>
                        <!-- กองทุนการออมแห่งชาติ (NSF) -->
                        <div>
                            <label class="text-gray-600 font-bold">กองทุนการออมแห่งชาติ (NSF)</label>
                            <div class="relative">
                                <input v-model="tax_info2025.national_saving_fund" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                        </div>
                        <!-- Thai ESG -->
                        <div>
                            <label class="text-gray-600 font-bold">Thai ESG</label>
                            <div class="relative">
                                <input v-model="tax_info2025.thai_esg" type="number" inputmode="numeric"
                                    class="w-full px-3 py-2 border rounded-full pr-12" placeholder="0.00" />
                                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 30% ของเงินได้</p>
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
                        </div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD

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
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
</template>

<script>
import {
    useRouter
} from 'vue-router';
import { useToast } from 'vue-toastification'
<<<<<<< HEAD
import { ref } from 'vue'
import Loading from '@/components/Loading.vue'

export default {
    components: {
        Loading
    },
=======

export default {
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
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
<<<<<<< HEAD
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
            tax_info2025: {
                // รายรับ
                monthly_income: 0,       // float
                bonus_income: 0,                // float
                additional_income: 0,         // float

                // สถานะครอบครัว
                marital_status: "",         // MaritalStatus (ค่าเริ่มต้น 0)
                // num_children: 0,            // int
                children: [],
                num_of_parents: 0,              // int
                has_disabled_person: false,  // int

                // ประกันและสวัสดิการ
                general_life_insurance: 0,
                social_security: 0,             // float
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
                new_house_cost: 0,        // float

                // ค่าใช้จ่ายครรภ์มารดา
                prenatal_expense: 0      // float
            },
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        }
    },
    computed: {
        isPastStep() {
            return (step) => {
                if (step === this.currentStep) return true;
                return step < this.currentStep && step <= this.highestStep;
            }
        },
<<<<<<< HEAD
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

=======
        annualIncome() {
            return this.calculateTotalIncome();
        }
    },
    methods: {
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
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
<<<<<<< HEAD
            this.isSubmitting = true;
            const jwtToken = localStorage.getItem('jwtToken');
            const username = localStorage.getItem('username');

            // หากมีการอัปเดต children ก่อนส่งข้อมูล ให้ทำที่นี่
            // เช่น: this.tax_info2025.children = this.computedChildren; หรือวิธีที่คุณต้องการ

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

                const data = await response.json();
                const taxable_income = data.calculations.taxable_income;
                const total_deduction = data.calculations.total_deduction;

                // อัปเดตข้อมูลใน modal
                this.modalTaxableIncome = taxable_income;
                this.modalTotalDeduction = total_deduction;
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
=======
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

>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        handleStep1Next() {
            const validation = this.validateIncome();
            if (validation.isValid) {
                this.nextStep();
            } else {
                // Handle validation error
                this.showError('กรุณากรอกข้อมูลให้ถูกต้อง');
            }
        },
<<<<<<< HEAD
=======

>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        showError(message) {
            // Add error handling logic here
            console.error(message);
        },
<<<<<<< HEAD
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
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
}
</script>

<style scoped>
<<<<<<< HEAD
/* Background Style */
=======
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
.surveytax-page {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
}

<<<<<<< HEAD
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
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
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
