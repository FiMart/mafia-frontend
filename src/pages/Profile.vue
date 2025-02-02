<template>
<div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Tab Headers -->
            <div class="flex border-b">
                <button @click="activeTab = 'profile'" :class="['px-6 py-3', activeTab === 'profile' ? 'border-b-2 border-green-500 text-green-500 font-bold' : 'text-gray-500']">
                    ข้อมูลผู้ใช้
                </button>
                <button @click="activeTab = 'tax'" :class="['px-6 py-3', activeTab === 'tax' ? 'border-b-2 border-green-500 text-green-500 font-bold' : 'text-gray-500']">
                    ข้อมูลภาษี
                </button>
            </div>

            <!-- Profile Content -->
            <div v-if="activeTab === 'profile'" class="p-6">
                <!-- Profile Image & Edit Button -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <img :src="profile.image" alt="Profile Image" class="w-16 h-16 rounded-full border border-gray-300" />
                        <div>
                            <h2 class="text-lg font-semibold">{{ profile.name }}</h2>
                            <p class="text-gray-500">{{ profile.email }}</p>
                        </div>
                    </div>
                    <button v-if="!isEditing" @click="toggleEdit" class="text-white px-4 py-2 rounded-full hover:bg-emerald-600 font-bold bg-green-500 hover:bg-green-600">
                        ✎ แก้ไขโปรไฟล์
                    </button>
                </div>

                <!-- Profile Details -->
                <div class="mt-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 font-bold">ชื่อ-นามสกุล</label>
                            <input type="text" v-model="profile.name" class="w-full border-gray-300 rounded-full p-2" :disabled="!isEditing" />
                        </div>
                        <div>
                            <label class="text-gray-600 font-bold">อีเมล</label>
                            <input type="text" v-model="profile.email" class="w-full border-gray-300 rounded-full p-2" :disabled="!isEditing" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 font-bold">วัน/เดือน/ปีเกิด</label>
                            <input type="text" v-model="profile.dob" class="w-full border-gray-300 rounded-full p-2" :disabled="!isEditing" />
                        </div>
                        <div>
                            <label class="text-gray-600 font-bold">สถานะ</label>
                            <select v-model="profile.status" class="w-full border-gray-300 rounded-full p-2" :disabled="!isEditing">
                                <option value="โสด">โสด</option>
                                <option value="หย่า">หย่า</option>
                                <option value="คู่สมรสมีเงินได้ (แยกยื่น)">คู่สมรสมีเงินได้ (แยกยื่น)</option>
                                <option value="คู่สมรสไม่มีเงินได้">คู่สมรสไม่มีเงินได้</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 font-bold">อาชีพ</label>
                            <select v-model="profile.occupation" class="w-full border-gray-300 rounded-full p-2" :disabled="!isEditing">
                                <option value="นักเรียน/นักศึกษา">นักเรียน/นักศึกษา</option>
                                <option value="พนักงานบริษัท">พนักงานบริษัท</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-gray-600 font-bold">ความเสี่ยงที่รับได้</label>
                            <select v-model="profile.riskLevel" class="w-full border-gray-300 rounded-full p-2" :disabled="!isEditing">
                                <option value="ระดับ 1 เสี่ยงต่ำ">ระดับ 1 เสี่ยงต่ำ</option>
                                <option value="ระดับ 2 เสี่ยงปานกลางค่อนข้างต่ำ">ระดับ 2 เสี่ยงปานกลางค่อนข้างต่ำ</option>
                                <option value="ระดับ 3 เสี่ยงปานกลางค่อนข้างสูง">ระดับ 3 เสี่ยงปานกลางค่อนข้างสูง</option>
                                <option value="ระดับ 4 เสี่ยงสูง">ระดับ 4 เสี่ยงสูง</option>
                                <option value="ระดับ 5 เสี่ยงสูงมาก">ระดับ 5 เสี่ยงสูงมาก</option>
                            </select>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="mt-6 text-center">
                        <button v-if="isEditing" @click="saveProfile" class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 font-bold">
                            ✔ บันทึกข้อมูล
                        </button>
                        <button v-else @click="confirmLogout" class="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 font-bold">
                            ❌ ออกจากระบบ
                        </button>
                    </div>
                    <div v-if="isEditing" class="mt-4">
                        <input type="file" @change="onFileChange" />
                    </div>
                </div>
            </div>

            <!-- Tax Information Content -->
            <div v-if="activeTab === 'tax'" class="p-6">
                <div class="space-y-6">
                    <!-- รายได้ -->
                    <div class="bg-white rounded-lg p-4">
                        <h3 class="text-lg font-bold mb-4 bg-white text-black p-2">รายได้</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">รายได้ต่อเดือน</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.monthlyIncome" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">หักค่าใช้จ่าย</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.monthlyDeduction" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">โบนัสประจำปี</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.yearlyBonus" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">หักค่าใช้จ่าย (โบนัส)</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.bonusDeduction" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">รายได้อื่น ๆ</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.otherIncome" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">หักค่าใช้จ่าย (รายได้อื่น ๆ)</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.otherDeduction" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- รายการลดหย่อนภาษี: ครอบครัว -->
                    <div class="bg-white rounded-lg p-4">
                        <h3 class="text-lg font-bold mb-4 bg-white text-black p-2">รายการลดหย่อนภาษี: ครอบครัว</h3>
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">สถานะสมรส</label>
                                <select v-model="taxInfo.maritalStatus" class="w-full border-gray-300 rounded-full p-2">
                                    <option value="โสด">โสด</option>
                                    <option value="สมรส">สมรส</option>
                                    <option value="หย่า">หย่า</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">ลดหย่อนส่วนบุคคล</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.personalDeduction" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">ลดหย่อนคู่สมรส</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.spouseDeduction" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">ค่าลดหย่อนฝากครรภ์และคลอดบุตร</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.pregnancyDeduction" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">ลดหย่อนบิดามารดา (ตนเอง)</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.selfParentDeduction" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">ลดหย่อนบิดามารดา (คู่สมรส)</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.spouseParentDeduction" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- รายการลดหย่อน: เงินบริจาค -->
                    <div class="bg-white rounded-lg p-4">
                        <h3 class="text-lg font-bold mb-4 bg-white text-black p-2">รายการลดหย่อน: เงินบริจาค</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">เงินบริจาคทั่วไป</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.generalDonation" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">เงินบริจาคเพื่อการศึกษา</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.educationDonation" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">เงินบริจาคเพื่อการเมือง</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.politicalDonation" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">เงินบริจาคเพื่อสังคม</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.socialDonation" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- รายการลดหย่อน: ประกันชีวิต -->
                    <div class="bg-white rounded-lg p-4">
                        <h3 class="text-lg font-bold mb-4 bg-white text-black p-2">รายการลดหย่อน: ประกันชีวิต</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">เบี้ยประกันชีวิต</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.lifeInsurance" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพ</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.healthInsurance" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพบิดามารดา</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.parentHealthInsurance" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">เบี้ยประกันบำนาญ</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.pensionInsurance" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- รายการลดหย่อน: อื่น ๆ -->
                    <div class="bg-white rounded-lg p-4">
                        <h3 class="text-lg font-bold mb-4 bg-white text-black p-2">รายการลดหย่อน: อื่น ๆ</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">เงินสมทบกองทุนประกันสังคม</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.socialSecurity" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">ค่าใช้จ่ายท่องเที่ยวเมืองรอง</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.secondaryTourism" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">ดอกเบี้ยสินเชื่อเพื่อที่อยู่อาศัย</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.houseLoanInterest" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-600 font-bold">ค่าซื้อบ้านใหม่</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.newHouse" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Investment funds section -->
                    <div class="bg-white rounded-lg p-6 mb-6">
                        <h3 class="text-xl font-semibold mb-4">ลดหย่อนภาษีจากการซื้อกองทุน RMF, SSF และ ThaiESG</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- RMF Fund -->
                            <div class="flex flex-col">
                                <label class="font-medium mb-2">ลงทุน RMF ได้สูงสุด</label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        v-model="formData.funds.rmf"
                                        class="w-full p-2 border rounded-full"
                                        placeholder="0.00"
                                    >
                                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                                </div>
                            </div>

                            <div class="flex flex-col">
                                <label class="font-medium mb-2">จำนวนเงินลงทุน RMF</label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        v-model="formData.funds.rmfInvestment"
                                        class="w-full p-2 border rounded-full"
                                        placeholder="0.00"
                                    >
                                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                                </div>
                            </div>

                            <!-- SSF Fund -->
                            <div class="flex flex-col">
                                <label class="font-medium mb-2">ลงทุน SSF ได้สูงสุด</label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        v-model="formData.funds.ssf"
                                        class="w-full p-2 border rounded-full"
                                        placeholder="0.00"
                                    >
                                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                                </div>
                            </div>

                            <div class="flex flex-col">
                                <label class="font-medium mb-2">จำนวนเงินลงทุน SSF</label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        v-model="formData.funds.ssfInvestment"
                                        class="w-full p-2 border rounded-full"
                                        placeholder="0.00"
                                    >
                                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                                </div>
                            </div>

                            <!-- ThaiESG Fund -->
                            <div class="flex flex-col">
                                <label class="font-medium mb-2">ลงทุน ThaiESG ได้สูงสุด</label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        v-model="formData.funds.thaiESG"
                                        class="w-full p-2 border rounded-full"
                                        placeholder="0.00"
                                    >
                                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                                </div>
                            </div>

                            <div class="flex flex-col">
                                <label class="font-medium mb-2">จำนวนเงินลงทุน ThaiESG</label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        v-model="formData.funds.thaiESGInvestment"
                                        class="w-full p-2 border rounded-full"
                                        placeholder="0.00"
                                    >
                                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">บาท</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- เป้าหมายการลดหย่อนภาษีจากการลงทุนในกองทุนรวม -->
                    <div class="bg-white rounded-lg p-4">
                        <h3 class="text-lg font-bold mb-4 bg-white text-black p-2">เป้าหมายการลดหย่อนภาษีจากการลงทุนในกองทุนรวม ปี 25xx</h3>
                        <div class="grid grid-cols-1 gap-4">
                            <div>
                                <label class="text-gray-600 font-bold">เป้าหมายการลดหย่อนภาษี</label>
                                <div class="flex items-center">
                                    <input type="number" v-model="taxInfo.totalInvestmentGoal" class="w-full border-gray-300 rounded-full p-2" />
                                    <span class="ml-2">บาท</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Save Button -->
                    <div class="text-center mt-6">
                        <button @click="saveTaxInfo" class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 font-bold">
                            ✔ บันทึกข้อมูล
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Notifications -->
    <Transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-[-100%] opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showToast" class="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center px-4 py-3 rounded-lg text-white bg-green-500 shadow-lg z-50">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            บันทึกข้อมูลเสร็จสิ้น
        </div>
    </Transition>

    <!-- Logout Confirmation Modal -->
    <Transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showLogoutDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-sm mx-auto">
                <h3 class="text-lg font-medium text-gray-900 mb-4">คุณแน่ใจว่าต้องการออกจากระบบ?</h3>
                <div class="flex justify-center space-x-4 mt-6">
                    <button @click="showLogoutDialog = false" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors">
                        ยกเลิก
                    </button>
                    <button @click="handleLogout" class="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                        ยืนยัน
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
    components: {
        Navbar,
    },
    setup() {
        const router = useRouter()
        const toast = useToast()
        return { router, toast }
    },
    data() {
        return {
            formData: {
                funds: {
                    rmf: '',
                    rmfInvestment: '',
                    ssf: '',
                    ssfInvestment: '',
                    thaiESG: '',
                    thaiESGInvestment: ''
                }
            },
            activeTab: 'profile',
            isEditing: false,
            profile: {
                name: 'Usertest Attendance',
                email: 'user_test@gmail.com',
                image: require('@/assets/icon/profile.png'),
                dob: '21/02/1985',
                status: 'โสด',
                occupation: 'นักเรียน/นักศึกษา',
                riskLevel: 'ระดับ 3 เสี่ยงปานกลางค่อนข้างสูง',
            },
            taxInfo: {
                // รายได้
                monthlyIncome: 0,
                monthlyDeduction: 0,
                yearlyBonus: 0,
                bonusDeduction: 0,
                otherIncome: 0,
                otherDeduction: 0,

                // ครอบครัว
                maritalStatus: 'โสด',
                personalDeduction: 0,
                spouseDeduction: 0,
                pregnancyDeduction: 0,
                selfParentDeduction: 0,
                spouseParentDeduction: 0,

                // เงินบริจาค
                generalDonation: 0,
                educationDonation: 0,
                politicalDonation: 0,
                socialDonation: 0,

                // ประกันชีวิต
                lifeInsurance: 0,
                healthInsurance: 0,
                parentHealthInsurance: 0,
                pensionInsurance: 0,

                // อื่นๆ
                socialSecurity: 0,
                secondaryTourism: 0,
                houseLoanInterest: 0,
                newHouse: 0,

                // เป้าหมายการลดหย่อนภาษีจากการลงทุนในกองทุนรวม
                totalInvestmentGoal: 0
            },
            newProfileImage: null,
            showToast: false,
            showLogoutDialog: false,
            showLogoutToast: false
        };
    },
    methods: {
        toggleEdit() {
            this.isEditing = true;
        },
        confirmLogout() {
            this.showLogoutDialog = true;
        },
        handleLogout() {
            this.showLogoutDialog = false;
            this.showLogoutToast = true;

            this.toast.success('ออกจากระบบเสร็จสิ้น', {
                position: "top-center",
                timeout: 2000,
                toastClassName: "custom-toast-center"
            });

            setTimeout(() => {
                this.router.push('/');
            }, 2000);
        },
        async saveProfile() {
            try {
                if (this.newProfileImage) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.profile.image = e.target.result;
                        this.newProfileImage = null;
                        this.isEditing = false;
                    };
                    reader.readAsDataURL(this.newProfileImage);
                } else {
                    this.isEditing = false;
                }

                this.toast.success('บันทึกข้อมูลสำเร็จ', {
                    position: "top-center",
                    timeout: 3000,
                    toastClassName: "custom-toast-center"
                });

                this.isEditing = false;
            } catch (error) {
                this.toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', {
                    position: "top-center",
                    timeout: 3000,
                    toastClassName: "custom-toast-center"
                });
                console.error(error);
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.newProfileImage = file;
            }
        },
        async saveTaxInfo() {
            try {
                // Add API call here to save tax info
                this.toast.success('บันทึกข้อมูลภาษีสำเร็จ', {
                    position: "top-center",
                    timeout: 3000,
                    toastClassName: "custom-toast-center"
                });
                
                // Switch to profile tab after successful save
                setTimeout(() => {
                    this.activeTab = 'profile';
                }, 3000);
            } catch (error) {
                this.toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', {
                    position: "top-center",
                    timeout: 3000,
                    toastClassName: "custom-toast-center"
                });
            }
        }
    }
};
</script>

<style scoped>
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
