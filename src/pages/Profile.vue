<template>
<<<<<<< HEAD
  <div class="min-h-screen">
    <Navbar />

    <!-- Update Loading Components -->
    <Loading
      v-if="isLoadingProfile"
      message="กำลังโหลดข้อมูลโปรไฟล์..."
      class="fixed inset-0 bg-black bg-opacity-80 z-50"
    />

    <Loading
      v-if="isSaving"
      message="กำลังบันทึกข้อมูล..."
      class="fixed inset-0 bg-black bg-opacity-80 z-50"
    />

    <Loading
      v-if="isLoggingOut"
      message="กำลังออกจากระบบ..."
      class="fixed inset-0 bg-black bg-opacity-80 z-50"
    />

    <div class="flex justify-center">
      <!-- ✅ Main Container -->
      <div class="w-full max-w-6xl px-6 py-4">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- ✅ Tabs -->
          <div class="flex border-b">
            <button
              @click="activeTab = 'profile'"
              :class="[
                'px-6 py-3 flex-1 text-center',
                activeTab === 'profile'
                  ? 'border-b-2 border-green-500 text-green-500 font-bold'
                  : 'text-gray-500',
              ]"
            >
              ข้อมูลผู้ใช้
            </button>
            <button
              @click="activeTab = 'tax'"
              :class="[
                'px-6 py-3 flex-1 text-center',
                activeTab === 'tax'
                  ? 'border-b-2 border-green-500 text-green-500 font-bold'
                  : 'text-gray-500',
              ]"
            >
              ข้อมูลภาษี
            </button>
          </div>

          <!-- ✅ Profile Section -->
          <div v-if="activeTab === 'profile'" class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img
                  :src="profile.image"
                  alt="Profile Image"
                  class="w-14 h-14 rounded-full border border-gray-300"
                />
                <div>
                  <h2 class="text-lg font-semibold">{{ profile.name }}</h2>
                  <p class="text-gray-500">{{ profile.email }}</p>
                </div>
              </div>
              <button
                v-if="!isEditing"
                @click="toggleEdit"
                class="text-white px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 font-bold"
              >
                ✎ แก้ไขโปรไฟล์
              </button>
            </div>

            <!-- Update Profile Form -->
            <div class="mt-6">
              <div class="bg-gray-100 p-4 mb-6 rounded-lg border-l-4 border-green-500">
                <h3 class="text-lg font-bold text-gray-700">ข้อมูลส่วนตัว</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- User Information Column -->
                <div class="space-y-4">
                  <!-- ✅ ชื่อผู้ใช้ -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">ชื่อผู้ใช้</label>
                    <input
                      type="text"
                      v-model="user_info.username"
                      class="input-field"
                      :disabled="!isEditing"
                    />
                  </div>

                  <!-- ✅ อีเมล -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">อีเมล</label>
                    <input
                      type="email"
                      class="input-field"
                      v-model="user_info.email"
                      :disabled="!isEditing"
                    />
                  </div>

                  <!-- ✅ เบอร์โทรศัพท์ -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">เบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      class="input-field"
                      v-model="user_info.telephone_number"
                      :disabled="!isEditing"
                      pattern="[0-9]{10}"
                      maxlength="10"
                    />
                  </div>
                </div>

                <!-- Additional Information Column -->
                <div class="space-y-4">
                  <!-- ✅ วันเกิด -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">วันเกิด</label>
                    <input
                      type="date"
                      class="input-field"
                      v-model="user_info.birthday"
                      :disabled="!isEditing"
                    />
                  </div>

                  <!-- ✅ อาชีพ -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">อาชีพ</label>
                    <input
                      type="text"
                      class="input-field"
                      v-model="user_info.job"
                      :disabled="!isEditing"
                    />
                  </div>

                  <!-- ✅ ระดับความเสี่ยง -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">ระดับความเสี่ยง</label>
                    <select
                      v-if="isEditing"
                      v-model="user_info.risk_level"
                      class="input-field"
                    >
                      <option :value="1">ต่ำ (1)</option>
                      <option :value="2">ต่ำถึงปานกลาง (2)</option>
                      <option :value="3">ปานกลาง (3)</option>
                      <option :value="4">ปานกลางถึงสูง (4)</option>
                      <option :value="5">สูง (5)</option>
                    </select>
                    <input
                      v-else
                      type="text"
                      class="input-field"
                      :value="getRiskLevelText(user_info.risk_level)"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="mt-6 text-center flex space-x-4 justify-center">
              <button
                v-if="isEditing"
                @click="saveProfile"
                class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 font-bold"
              >
                ✔ บันทึกข้อมูล
              </button>
              <button
                v-if="isEditing"
                @click="cancelEdit"
                class="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 font-bold"
              >
                ❌ ยกเลิก
              </button>
              <button
                v-if="!isEditing"
                @click="confirmLogout"
                class="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 font-bold"
              >
                ❌ ออกจากระบบ
              </button>
            </div>

            <!-- Add Confirmation Popup -->
            <div
              v-if="showLogoutConfirm"
              class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div
                class="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto transform transition-all duration-300 animate-popup"
              >
                <!-- Icon Section -->
                <div class="text-center">
                  <div
                    class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <svg
                      class="w-8 h-8 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-semibold text-gray-900 mb-2">
                    ยืนยันการออกจากระบบ
                  </h3>
                  <p class="text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</p>
                </div>

                <!-- Buttons Section -->
                <div class="flex justify-center space-x-4">
                  <button
                    @click="logout"
                    :disabled="isLoggingOut"
                    class="px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold min-w-[120px]"
                  >
                    <span v-if="isLoggingOut">กำลังออกจากระบบ...</span>
                    <span v-else>ยืนยัน</span>
                  </button>
                  <button
                    @click="showLogoutConfirm = false"
                    :disabled="isLoggingOut"
                    class="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold min-w-[120px]"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ✅ Tax Information Section -->
          <div v-if="activeTab === 'tax'" class="p-6">
            <div class="grid grid-cols-1 gap-6">
              <!-- 🔹 Income Section -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  💰 รายได้ & หักค่าใช้จ่าย
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-gray-600 font-bold">รายได้ต่อเดือน</label>
                    <input type="number" class="input-field" placeholder="50,000" />
                  </div>
                  <div>
                    <label class="text-gray-600 font-bold"
                      >หักค่าใช้จ่าย (สูงสุด 50%)</label
                    >
                    <p class="output-field">25,000</p>
                  </div>
                  <div>
                    <label class="text-gray-600 font-bold">โบนัส</label>
                    <input type="number" class="input-field" placeholder="100,000" />
                  </div>
                  <div>
                    <label class="text-gray-600 font-bold"
                      >หักค่าใช้จ่าย (สูงสุด 50%)</label
                    >
                    <p class="output-field">50,000</p>
                  </div>
                  <div>
                    <label class="text-gray-600 font-bold">รายได้อื่น ๆ</label>
                    <input type="number" class="input-field" placeholder="20,000" />
                  </div>
                  <div>
                    <label class="text-gray-600 font-bold"
                      >หักค่าใช้จ่าย (สูงสุด 50%)</label
                    >
                    <p class="output-field">10,000</p>
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
                  <div>
                    <label class="text-gray-600 font-bold">สถานะสมรส</label>
                    <select class="input-field">
                      <option value="single">โสด</option>
                      <option value="married">สมรส</option>
                      <option value="divorced">หย่า</option>
                    </select>
                  </div>
                  <!-- ✅ ลดหย่อนภาษีส่วนบุคคลและคู่สมรส (อยู่ในแถวเดียวกัน) -->
                  <div class="grid grid-cols-2 gap-4">
                    <!-- ✅ ลดหย่อนส่วนบุคคล -->
                    <div>
                      <label class="text-gray-600 font-bold">ลดหย่อนส่วนบุคคล</label>
                      <p class="output-field">60,000 บาท</p>
                    </div>

                    <!-- ✅ ลดหย่อนคู่สมรส -->
                    <div>
                      <label class="text-gray-600 font-bold">ลดหย่อนคู่สมรส</label>
                      <p class="output-field">60,000 บาท</p>
                    </div>
                  </div>

                  <!-- ✅ จำนวนบุตร (ทั้งหมดในแถวเดียว) -->
                  <div class="grid grid-cols-3 gap-4">
                    <!-- ✅ จำนวนบุตร -->
                    <div>
                      <label class="text-gray-600 font-bold">จำนวนบุตร</label>
                      <input type="number" class="input-field" placeholder="0" />
                    </div>

                    <!-- ✅ จำนวนบุตรที่เกิดหลังปี 2567 -->
                    <div>
                      <label class="text-gray-600 font-bold">บุตรเกิดหลังปี 2567</label>
                      <input type="number" class="input-field" placeholder="0" />
                    </div>

                    <!-- ✅ จำนวนบุตรบุญธรรม -->
                    <div>
                      <label class="text-gray-600 font-bold">จำนวนบุตรบุญธรรม</label>
                      <input type="number" class="input-field" placeholder="0" />
                    </div>
                  </div>

                  <div>
                    <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากบุตร</label>
                    <p class="output-field">30,000 ต่อคน</p>
                  </div>

                  <!-- ✅ จำนวนพ่อแม่ที่ดูแล -->
                  <div>
                    <label class="text-gray-600 font-bold">จำนวนพ่อแม่ที่ดูแล</label>
                    <input type="number" class="input-field" placeholder="0" />
                  </div>
                  <div>
                    <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากพ่อแม่</label>
                    <p class="output-field">30,000 ต่อคน</p>
                  </div>

                  <!-- ✅ จำนวนผู้พิการที่ดูแล -->
                  <div>
                    <label class="text-gray-600 font-bold">จำนวนผู้พิการที่ดูแล</label>
                    <input type="number" class="input-field" placeholder="0" />
                  </div>
                  <div>
                    <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากผู้พิการ</label>
                    <p class="output-field">60,000 ต่อคน</p>
                  </div>
                </div>
              </div>

              <!-- 🔹 Tax Deductions: Insurance & Social Benefits -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  🏥 รายการลดหย่อนภาษี: ประกันและสวัสดิการ
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- ✅ ประกันสังคม -->
                  <div>
                    <label class="text-gray-600 font-bold">เงินสมทบประกันสังคม</label>
                    <input type="number" class="input-field" placeholder="9,000" />
                  </div>

                  <!-- ✅ ประกันชีวิต -->
                  <div>
                    <label class="text-gray-600 font-bold">เบี้ยประกันชีวิต</label>
                    <input type="number" class="input-field" placeholder="100,000" />
                  </div>

                  <!-- ✅ ประกันสุขภาพ -->
                  <div>
                    <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพ</label>
                    <input type="number" class="input-field" placeholder="25,000" />
                  </div>

                  <!-- ✅ ประกันสุขภาพพ่อแม่ -->
                  <div>
                    <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพพ่อแม่</label>
                    <input type="number" class="input-field" placeholder="15,000" />
                  </div>
                  <!-- ✅ ประกันบำนาญ -->
                  <div>
                    <label class="text-gray-600 font-bold">เบี้ยประกันบำนาญ</label>
                    <input type="number" class="input-field" placeholder="200,000" />
                  </div>
                </div>
              </div>

              <!-- 🔹 Tax Deductions: Donations -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  🎗 ลดหย่อนภาษี: เงินบริจาค
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- ✅ บริจาคทั่วไป -->
                  <div>
                    <label class="text-gray-600 font-bold">เงินบริจาคทั่วไป</label>
                    <input type="number" class="input-field" placeholder="50,000" />
                  </div>

                  <!-- ✅ บริจาคเพื่อการศึกษา -->
                  <div>
                    <label class="text-gray-600 font-bold">เงินบริจาคเพื่อการศึกษา</label>
                    <input type="number" class="input-field" placeholder="100,000" />
                  </div>

                  <!-- ✅ บริจาคเพื่อการเมือง -->
                  <div>
                    <label class="text-gray-600 font-bold">เงินบริจาคเพื่อการเมือง</label>
                    <input type="number" class="input-field" placeholder="10,000" />
                  </div>
                </div>
              </div>

              <!-- 🔹 รายการลดหย่อนภาษี: อื่น ๆ -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  📝 รายการลดหย่อนภาษี: อื่น ๆ
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- ✅ ช้อปดีมีคืน (Easy Receipt) -->
                  <div>
                    <label class="text-gray-600 font-bold"
                      >ช้อปดีมีคืน (Easy Receipt)</label
                    >
                    <input type="number" class="input-field" placeholder="50000" />
                  </div>

                  <!-- ✅ ท่องเที่ยวเมืองรอง -->
                  <div>
                    <label class="text-gray-600 font-bold">ท่องเที่ยวเมืองรอง</label>
                    <input type="number" class="input-field" placeholder="15000" />
                  </div>

                  <!-- ✅ ดอกเบี้ยบ้าน -->
                  <div>
                    <label class="text-gray-600 font-bold">ดอกเบี้ยสินเชื่อบ้าน</label>
                    <input type="number" class="input-field" placeholder="100000" />
                  </div>

                  <!-- ✅ ซื้อบ้านใหม่ -->
                  <div>
                    <label class="text-gray-600 font-bold">ค่าซื้อบ้านใหม่</label>
                    <input type="number" class="input-field" placeholder="200000" />
                  </div>

                  <!-- ✅ ค่าฝากครรภ์และคลอดบุตร -->
                  <div>
                    <label class="text-gray-600 font-bold">ค่าฝากครรภ์และคลอดบุตร</label>
                    <input type="number" class="input-field" placeholder="60000" />
                  </div>
                </div>
              </div>
              <!-- 🔹 การลงทุนลดหย่อนภาษี -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  📈 การลงทุนลดหย่อนภาษี
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- ✅ GPF -->
                  <div>
                    <label class="text-gray-600 font-bold"
                      >กองทุนบำเหน็จบำนาญข้าราชการ (GPF)</label
                    >
                    <input type="number" class="input-field" placeholder="15000" />
                  </div>

                  <!-- ✅ SSF -->
                  <div>
                    <label class="text-gray-600 font-bold">SSF</label>
                    <input type="number" class="input-field" placeholder="30000" />
                  </div>

                  <!-- ✅ PVD -->
                  <div>
                    <label class="text-gray-600 font-bold"
                      >กองทุนสำรองเลี้ยงชีพ (PVD)</label
                    >
                    <input type="number" class="input-field" placeholder="20000" />
                  </div>

                  <!-- ✅ RMF -->
                  <div>
                    <label class="text-gray-600 font-bold">RMF</label>
                    <input type="number" class="input-field" placeholder="50000" />
                  </div>

                  <!-- ✅ NSF -->
                  <div>
                    <label class="text-gray-600 font-bold"
                      >กองทุนการออมแห่งชาติ (NSF)</label
                    >
                    <input type="number" class="input-field" placeholder="10000" />
                  </div>

                  <!-- ✅ Thai ESG -->
                  <div>
                    <label class="text-gray-600 font-bold">Thai ESG</label>
                    <input type="number" class="input-field" placeholder="25000" />
                  </div>
                </div>
              </div>

              <!-- Add this after the "การลงทุนลดหย่อนภาษี" section -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  🎯 เป้าหมายการลดหย่อนภาษีของคุณ
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- ยอดรวมการลดหย่อนปัจจุบัน -->
                  <div>
                    <label class="text-gray-600 font-bold"
                      >ยอดรวมการลดหย่อนปัจจุบัน</label
                    >
                    <p class="output-field">฿</p>
                    <div class="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-teal-500 h-2 rounded-full transition-all duration-1000"
                        :style="{
                          width: ``,
                        }"
                      ></div>
                    </div>
                  </div>

                  <!-- เป้าหมายการลดหย่อน -->
                  <div>
                    <label class="text-gray-600 font-bold">เป้าหมายการลดหย่อน</label>
                    <input
                      type="number"
                      v-model="deductionGoal"
                      class="input-field"
                      placeholder="1000000"
                    />
                    <p class="text-sm text-gray-500 mt-2">เหลืออีก ฿</p>
                  </div>

                  <!-- ประหยัดภาษีได้ -->
                  <div>
                    <label class="text-gray-600 font-bold">ประหยัดภาษีได้</label>
                    <p class="output-field">฿</p>
                    <p class="text-sm text-gray-500 mt-2">ของยอดลดหย่อน</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 🔹 Save Tax Info Button -->
            <div class="text-center mt-6">
              <button
                @click="saveTaxInfo"
                class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 font-bold"
              >
                ✔ บันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Loading from "@/components/Loading.vue";
import { useToast } from "vue-toastification";

export default {
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
      // Add loading states
      isLoadingProfile: true,
      isSaving: false,
      isLoggingOut: false,
      showLogoutConfirm: false,
      activeTab: "profile",
      isEditing: false,
      profile: {
        username: "",
        email: "",
        image: require("@/assets/icon/profile.png"),
      },
      user_info: {
        birthday: "",
        email: "",
        job: "",
        risk_level: 0,
        salary: 0.0,
        telephone_number: "",
        username: "",
      },
      taxInfo: {
        monthlyIncome: 0,
        bonus: 0,
        otherIncome: 0,
        maritalStatus: "โสด",
        numChildren: 0,
        rmf: 0,
        ssf: 0,
      },
    };
  },
  methods: {
    async update_profile() {
      const jwtToken = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");
      const endpoint1 = `/api/user/${username}`;

      // Build update_info with only the fields you want to send
      const update_info = {
        username: this.user_info.username,
        birthday: this.user_info.birthday,
        email: this.user_info.email,
        job: this.user_info.job,
        telephone_number: this.user_info.telephone_number,
      };

      const response = await fetch(endpoint1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(update_info),
      });

      if (!response.ok) {
        console.error("Error updating profile:", response.status, response.statusText);
        const errorData = await response.json().catch(() => ({}));
        this.toast.error(
          `การอัพเดตโปรไฟล์ล้มเหลว: ${errorData.message || "เกิดข้อผิดพลาด"}`,
          {
            timeout: 3000,
            position: "top-center",
          }
        );
        return false;
      } else {
        const result = await response.json().catch(() => ({}));
        console.log("Profile updated successfully:", result);
        this.toast.success("อัพเดตข้อมูลโปรไฟล์สำเร็จ", {
          timeout: 2000,
          position: "top-center",
        });
        return true;
      }
    },
    async fetchData() {
      // Fetch the nav API
      const jwtToken = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");
      const endpoint = `/api/user/${username}`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token หมดอายุหรือ invalid
          console.log("Token expired or invalid, please login again.");
          this.toast.error("JWT Token หมดอายุ");
          this.logout();
          return;
          // อาจทำการ redirect ไปหน้า login หรือเรียก refresh token
        } else {
          // จัดการ error ที่ไม่เกี่ยวกับ token
          console.log("Request error:", data);
        }
      }

      const data = await response.json();
      // console.log("Fetched API 1 data:", data1);
      this.user_info = data;

      this.profile.name = this.user_info.username;
      this.profile.email = this.user_info.email;
    },
    toggleEdit() {
      this.isEditing = true;
      this.originalProfile = JSON.parse(JSON.stringify(this.profile));
    },
    async saveProfile() {
      this.isSaving = true;
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.update_profile();
        this.toast.success("บันทึกข้อมูลโปรไฟล์เรียบร้อย!", {
          timeout: 1000,
          position: "top-center",
        });
        this.isEditing = false;
      } catch (error) {
        this.toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        console.error(error);
      } finally {
        this.isSaving = false;
      }
    },
    cancelEdit() {
      this.profile = JSON.parse(JSON.stringify(this.originalProfile));
      this.isEditing = false;
      this.toast.info("ยกเลิกการแก้ไขเรียบร้อย", {
        timeout: 1000,
        position: "top-center",
      });
    },
    async saveTaxInfo() {
      this.isSaving = true;
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.toast.success("บันทึกข้อมูลภาษีเรียบร้อย!", {
          timeout: 1000,
          position: "top-center",
        });
      } catch (error) {
        this.toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลภาษี");
        console.error(error);
      } finally {
        this.isSaving = false;
      }
    },
    confirmLogout() {
      this.showLogoutConfirm = true;
    },
    async logout() {
      this.showLogoutConfirm = false;
      this.isLoggingOut = true;
      try {
        this.toast.warning("กำลังออกจากระบบ...", {
          timeout: 1000,
          position: "top-center",
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Add your logout logic here
        await this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
        this.toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
      } finally {
        this.isLoggingOut = false;
      }
    },
    formatPhoneNumber(event) {
      // Remove any non-numeric characters
      let phone = event.target.value.replace(/\D/g, "");

      // Limit to 10 digits
      phone = phone.substring(0, 10);

      // Update the model with cleaned value
      this.profile.phone = phone;
    },
    validateSalary(event) {
      let salary = event.target.value;
      if (salary < 0) {
        this.profile.salary = 0;
      }
    },
    getRiskLevelText(level) {
      const riskLevels = {
        1: "ต่ำ (1)",
        2: "ต่ำถึงปานกลาง (2)",
        3: "ปานกลาง (3)",
        4: "ปานกลางถึงสูง (4)",
        5: "สูง (5)",
      };
      return riskLevels[level] || `ระดับ ${level}`;
    },
  },
  async mounted() {
    try {
      // Simulate loading profile data
      // await new Promise(resolve => setTimeout(resolve, 1000));
      this.fetchData();
      // Add your profile loading logic here
    } catch (error) {
      console.error("Error loading profile:", error);
      this.toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูลโปรไฟล์");
    } finally {
      this.isLoadingProfile = false;
    }
  },
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
};
</script>

<style scoped>
<<<<<<< HEAD
/* Profile Image Animation */
img {
  transition: transform 0.3s ease;
  border: 3px solid #22c55e;
}

img:hover {
  transform: scale(1.1);
}

/* Input Fields */
.input-field {
  width: 100%;
  border: 2px solid #e2e8f0;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  font-size: 0.95rem;
}

.input-field:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
  outline: none;
  transform: none;
}

.input-field:disabled {
  background-color: #f1f5f9;
  color: #64748b;
  cursor: not-allowed;
}

/* Output Fields */
.output-field {
  width: 100%;
  padding: 8px 12px;
  background-color: #f3f4f6;
  border-radius: 8px;
  text-align: right;
  font-weight: 600;
  color: #374151;
  transition: all 0.3s ease;
  border-left: 4px solid #22c55e;
}

.output-field:hover {
  background-color: #e5e7eb;
}

/* Section styling */
.bg-white {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  transform-origin: center center;
}

.bg-white:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* Remove hover transform effect from form sections */
.form-group {
  position: relative;
  z-index: 1;
}

/* Disable hover effects on the personal information section */
.mt-6 .bg-white {
  transition: box-shadow 0.3s ease;
}

.mt-6 .bg-white:hover {
  transform: none;
}

/* Override card hover animation for form fields container */
.grid.grid-cols-1.md\:grid-cols-2.gap-6 > div {
  margin-bottom: 12px;
  position: relative;
  overflow: visible !important;
}

.grid.grid-cols-1.md\:grid-cols-2.gap-6 > div:hover::before {
  opacity: 0;
}

/* Remove the green line indicator for form field containers */
.space-y-4::before {
  content: none !important;
}

/* Section styling */
.bg-white {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: visible !important; /* Ensure content doesn't get cut off */
  transform-origin: center center;
}

.bg-white:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* Tab design improvements */
.flex.border-b {
  background: linear-gradient(to right, #f9fafb, #f3f4f6);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 4px;
}

/* Section headers */
h3.text-lg.font-bold {
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 10px;
  margin-bottom: 16px;
  color: #1e3a8a;
  font-size: 1.2rem;
}

/* Labels */
.text-gray-600.font-bold {
  margin-bottom: 4px;
  display: block;
  color: #475569;
  font-size: 0.9rem;
}

/* Button enhancements */
button.bg-green-500 {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 4px 6px rgba(22, 163, 74, 0.2);
  transition: all 0.3s ease;
  border: none;
}

button.bg-green-500:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(22, 163, 74, 0.3);
}

button.bg-red-500 {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
}

button.bg-red-500:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(220, 38, 38, 0.3);
}

/* Card grouping */
.grid.grid-cols-1.gap-6 > div {
  margin-bottom: 12px;
  position: relative;
  overflow: visible !important; /* Changed from overflow: hidden to visible */
}

.grid.grid-cols-1.gap-6 > div::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #22c55e, #16a34a);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.grid.grid-cols-1.gap-6 > div:hover::before {
  opacity: 1;
}

/* Fix for container sizing */
.w-full.max-w-6xl {
  overflow: visible !important;
}

/* Fix for any potential transform overflow issues */
.flex.justify-center {
  overflow: visible !important;
  padding-bottom: 2rem; /* Add some bottom padding to account for transforms */
}

/* Progress bar improvements */
.bg-gray-200.rounded-full {
  height: 8px;
  background-color: #e2e8f0;
  overflow: hidden;
}

.bg-teal-500.h-2 {
  height: 8px;
  background: linear-gradient(to right, #14b8a6, #0d9488);
  box-shadow: 0 0 4px rgba(20, 184, 166, 0.4);
}

/* Tab hover effect */
[class*="border-b-2 border-green-500"] {
  position: relative;
}

[class*="border-b-2 border-green-500"]::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #22c55e, #16a34a);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

/* Remove scrollbars */
* {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

*::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Ensure the main container doesn't overflow */
.min-h-screen {
  overflow-x: hidden;
}

/* For iOS devices */
body {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  height: 100%;
=======
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
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
}
</style>
