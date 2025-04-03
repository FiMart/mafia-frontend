<template>
  <div class="min-h-screen">
    <Navbar />

    <!-- Update Loading Components -->
    <Loading v-if="isLoadingProfile" message="กำลังโหลดข้อมูลโปรไฟล์..."
      class="fixed inset-0 bg-black bg-opacity-80 z-50" />

    <Loading v-if="isSaving" message="กำลังบันทึกข้อมูล..." class="fixed inset-0 bg-black bg-opacity-80 z-50" />

    <Loading v-if="isLoggingOut" message="กำลังออกจากระบบ..." class="fixed inset-0 bg-black bg-opacity-80 z-50" />

    <div class="flex justify-center">
      <!-- ✅ Main Container -->
      <div class="w-full max-w-6xl px-6 py-4">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- ✅ Tabs -->
          <div class="flex border-b">
            <button @click="activeTab = 'profile'" :class="[
              'px-6 py-3 flex-1 text-center',
              activeTab === 'profile'
                ? 'border-b-2 border-green-500 text-green-500 font-bold'
                : 'text-gray-500',
            ]">
              ข้อมูลผู้ใช้
            </button>
            <button @click="activeTab = 'tax'" :class="[
              'px-6 py-3 flex-1 text-center',
              activeTab === 'tax'
                ? 'border-b-2 border-green-500 text-green-500 font-bold'
                : 'text-gray-500',
            ]">
              ข้อมูลภาษี
            </button>
          </div>

          <!-- ✅ Profile Section -->
          <div v-if="activeTab === 'profile'" class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img :src="profile.image" alt="Profile Image" class="w-14 h-14 rounded-full border border-gray-300" />
                <div>
                  <h2 class="text-lg font-semibold">{{ profile.name }}</h2>
                  <p class="text-gray-500">{{ profile.email }}</p>
                </div>
              </div>
              <button v-if="!isEditing" @click="toggleEdit"
                class="text-white px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 font-bold">
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
                    <input type="text" v-model="user_info.username" class="input-field" :disabled="!isEditing" />
                  </div>

                  <!-- ✅ อีเมล -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">อีเมล</label>
                    <input type="email" class="input-field" v-model="user_info.email" :disabled="!isEditing" />
                  </div>

                  <!-- ✅ เบอร์โทรศัพท์ -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">เบอร์โทรศัพท์</label>
                    <input type="tel" class="input-field" v-model="user_info.telephone_number" :disabled="!isEditing"
                      pattern="[0-9]{10}" maxlength="10" />
                  </div>
                </div>

                <!-- Additional Information Column -->
                <div class="space-y-4">
                  <!-- ✅ วันเกิด -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">วันเกิด</label>
                    <input type="date" class="input-field" v-model="user_info.birthday" :disabled="!isEditing" />
                  </div>

                  <!-- ✅ อาชีพ -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">อาชีพ</label>
                    <input type="text" class="input-field" v-model="user_info.job" :disabled="!isEditing" />
                  </div>

                  <!-- ✅ ระดับความเสี่ยง -->
                  <div class="form-group">
                    <label class="text-gray-600 font-bold">ระดับความเสี่ยง</label>
                    <select v-if="isEditing" v-model="user_info.risk_level" class="input-field">
                      <option :value="1">ต่ำ (1)</option>
                      <option :value="2">ต่ำถึงปานกลาง (2)</option>
                      <option :value="3">ปานกลาง (3)</option>
                      <option :value="4">ปานกลางถึงสูง (4)</option>
                      <option :value="5">สูง (5)</option>
                    </select>
                    <input v-else type="text" class="input-field" :value="getRiskLevelText(user_info.risk_level)"
                      disabled />
                  </div>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="mt-6 text-center flex space-x-4 justify-center">
              <button v-if="isEditing" @click="saveProfile"
                class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 font-bold">
                ✔ บันทึกข้อมูล
              </button>
              <button v-if="isEditing" @click="cancelEdit"
                class="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 font-bold">
                ❌ ยกเลิก
              </button>
              <button v-if="!isEditing" @click="confirmLogout"
                class="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 font-bold">
                ❌ ออกจากระบบ
              </button>
            </div>

            <!-- Add Confirmation Popup -->
            <div v-if="showLogoutConfirm"
              class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                class="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto transform transition-all duration-300 animate-popup">
                <!-- Icon Section -->
                <div class="text-center">
                  <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                      </path>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-semibold text-gray-900 mb-2">
                    ยืนยันการออกจากระบบ
                  </h3>
                  <p class="text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</p>
                </div>

                <!-- Buttons Section -->
                <div class="flex justify-center space-x-4">
                  <button @click="logout" :disabled="isLoggingOut"
                    class="px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold min-w-[120px]">
                    <span v-if="isLoggingOut">กำลังออกจากระบบ...</span>
                    <span v-else>ยืนยัน</span>
                  </button>
                  <button @click="showLogoutConfirm = false" :disabled="isLoggingOut"
                    class="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold min-w-[120px]">
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
                  💰 รายได้
                </h3>
                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label class="text-gray-600 font-bold">รายได้ต่อเดือน</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.monthly_income"
                      :placeholder="taxInfo?.monthly_income || 'กรุณากรอกข้อมูล'" />
                  </div>
                  <!-- <div>
                    <label class="text-gray-600 font-bold"
                      >หักค่าใช้จ่าย (สูงสุด 50%)</label
                    >
                    <p class="output-field">25,000</p>
                  </div> -->
                  <div>
                    <label class="text-gray-600 font-bold">โบนัส</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.bonus_income"
                      :placeholder="taxInfo?.bonus_income || 'กรุณากรอกข้อมูล'" />
                  </div>
                  <!-- <div>
                    <label class="text-gray-600 font-bold"
                      >หักค่าใช้จ่าย (สูงสุด 50%)</label
                    >
                    <p class="output-field">50,000</p>
                  </div> -->
                  <div>
                    <label class="text-gray-600 font-bold">รายได้อื่น ๆ</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.additional_income"
                      :placeholder="taxInfo?.additional_income || 'กรุณากรอกข้อมูล'" />
                  </div>
                  <!-- <div>
                    <label class="text-gray-600 font-bold"
                      >หักค่าใช้จ่าย (สูงสุด 50%)</label
                    >
                    <p class="output-field">10,000</p>
                  </div> -->
                </div>
              </div>

              <!-- 🔹 Family Tax Deductions -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  👨‍👩‍👧‍👦 รายการลดหย่อนภาษี: ครอบครัว
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="grid grid-cols-2 gap-4">
                    <!-- ✅ สถานะสมรส -->
                    <div>
                      <label class="text-gray-600 font-bold">สถานะสมรส</label>
                      <select class="input-field" v-model="tax_info2025.marital_status">
                        <option value="single">โสด</option>
                        <option value="married">สมรส</option>
                      </select>
                    </div>
                    <!-- ✅ ค่าฝากครรภ์และคลอดบุตร -->
                    <div>
                      <label class="text-gray-600 font-bold">ค่าฝากครรภ์และคลอดบุตร</label>
                      <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                        class="input-field" v-model="tax_info2025.prenatal_expense"
                        :placeholder="taxInfo?.prenatal_deduction || 'กรุณากรอกข้อมูล'" />
                    </div>
                  </div>
                  <!-- ✅ ลดหย่อนภาษีส่วนบุคคลและคู่สมรส (อยู่ในแถวเดียวกัน) -->
                  <!-- <div class="grid grid-cols-2 gap-4"> -->
                  <!-- ✅ ลดหย่อนส่วนบุคคล -->
                  <!-- <div>
                      <label class="text-gray-600 font-bold">ลดหย่อนส่วนบุคคล</label>
                      <p class="output-field">60,000 บาท</p>
                    </div> -->

                  <!-- ✅ ลดหย่อนคู่สมรส -->
                  <!-- <div>
                      <label class="text-gray-600 font-bold">ลดหย่อนคู่สมรส</label>
                      <p class="output-field">60,000 บาท</p>
                    </div> -->
                  <!-- </div> -->

                  <!-- ✅ จำนวนบุตร (ทั้งหมดในแถวเดียว) -->
                  <div class="grid grid-cols-3 gap-4">
                    <!-- ✅ จำนวนบุตร -->
                    <div>
                      <label class="px-1 text-white-600 font-bold">จำนวนบุตร</label>
                      <input v-model="totalChildren" type="number" min="0" @keydown="allowOnlyNumericAndDecimal"
                        @paste="checkPaste" class="text-gray-600 input-field" placeholder="0" />
                    </div>

                    <!-- ✅ จำนวนบุตรที่เกิดหลังปี 2567 -->
                    <div>
                      <label class="px-1 text-white-600 font-bold">บุตรเกิดหลังปี 2567</label>
                      <input v-model="childrenAfter2018" type="number" min="0" @keydown="allowOnlyNumericAndDecimal"
                        @paste="checkPaste" class="text-gray-600 input-field" placeholder="0" />
                    </div>

                    <!-- ✅ จำนวนบุตรบุญธรรม -->
                    <div>
                      <label class="px-1 text-white-600 font-bold">จำนวนบุตรบุญธรรม</label>
                      <input v-model="adoptedChildren" type="number" min="0" @keydown="allowOnlyNumericAndDecimal"
                        @paste="checkPaste" class="text-gray-600 input-field" placeholder="0" />
                    </div>
                  </div>

                  <!-- <div>
                    <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากบุตร</label>
                    <p class="output-field">30,000 ต่อคน</p>
                  </div> -->

                  <!-- ✅ จำนวนพ่อแม่ที่ดูแล -->
                  <div>
                    <label class="text-gray-600 font-bold">จำนวนพ่อแม่ที่ดูแล</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.number_of_parents" placeholder="0" />
                  </div>
                  <!-- <div>
                    <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากพ่อแม่</label>
                    <p class="output-field">30,000 ต่อคน</p>
                  </div> -->

                  <!-- ✅ จำนวนผู้พิการที่ดูแล -->
                  <div>
                    <label class="text-gray-600 font-bold">จำนวนผู้พิการที่ดูแล</label>
                    <select v-model="tax_info2025.has_disabled_person" class="input-field">
                      <option :value="false">ไม่มี</option>
                      <option :value="true">มี</option>
                    </select>
                  </div>
                  <!-- <div>
                    <label class="text-gray-600 font-bold">ลดหย่อนภาษีจากผู้พิการ</label>
                    <p class="output-field">60,000 ต่อคน</p>
                  </div> -->
                </div>
              </div>

              <!-- 🔹 Tax Deductions: Insurance & Social Benefits -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  🏥 รายการลดหย่อนภาษี: ประกันและสวัสดิการ
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- ✅ ประกันสังคม -->
                  <!-- <div>
                    <label class="text-gray-600 font-bold">เงินสมทบประกันสังคม</label>
                    <input type="number" class="input-field" v-model="tax_info2025.social_security"
                      :placeholder="taxInfo?.social_enterprise || 'กรุณากรอกข้อมูล'" />
                  </div> -->

                  <!-- ✅ ประกันชีวิต -->
                  <div>
                    <label class="text-gray-600 font-bold">เบี้ยประกันชีวิต</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.general_life_insurance"
                      :placeholder="taxInfo?.general_life_insurance || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 100,000 บาท</p>
                  </div>

                  <!-- ✅ ประกันสุขภาพ -->
                  <div>
                    <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพ</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.self_life_insurance"
                      :placeholder="taxInfo?.self_life_insurance || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 25,000 บาท</p>
                  </div>

                  <!-- ✅ ประกันสุขภาพพ่อแม่ -->
                  <div>
                    <label class="text-gray-600 font-bold">เบี้ยประกันสุขภาพพ่อแม่</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.parent_life_insurance"
                      :placeholder="taxInfo?.parent_life_insurance || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 15,000 บาท</p>
                  </div>
                  <!-- ✅ ประกันบำนาญ -->
                  <div>
                    <label class="text-gray-600 font-bold">เบี้ยประกันบำนาญ</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.pension_life_insurance"
                      :placeholder="taxInfo?.pension_life_insurance || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 200,000 บาท</p>
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
                    <label class="text-gray-600 font-bold">ช้อปดีมีคืน (Easy Receipt)</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.easy_receipt"
                      :placeholder="taxInfo?.easy_receipt || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 50,000 บาท</p>
                  </div>

                  <!-- ✅ ดอกเบี้ยบ้าน -->
                  <div>
                    <label class="text-gray-600 font-bold">ดอกเบี้ยสินเชื่อบ้าน</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.housing_interest"
                      :placeholder="taxInfo?.housing_interest || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 100,000 บาท</p>
                  </div>

                  <!-- ✅ ซื้อบ้านใหม่ -->
                  <div>
                    <label class="text-gray-600 font-bold">ค่าซื้อบ้านใหม่</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.new_house_cost"
                      :placeholder="taxInfo?.new_housing || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 200,000 บาท</p>
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
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.general_donation"
                      :placeholder="taxInfo?.general_donation || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 50,000 บาท</p>
                  </div>

                  <!-- ✅ บริจาคเพื่อการศึกษา -->
                  <div>
                    <label class="text-gray-600 font-bold">เงินบริจาคเพื่อการศึกษา</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.education_donation"
                      :placeholder="taxInfo?.education_donation || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 15,000 บาท</p>
                  </div>
                </div>
              </div>
              <!-- 🔹 การลงทุนลดหย่อนภาษี -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  📈 การลงทุนลดหย่อนภาษี
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-gray-600 font-bold">วิสาหกิจเพื่อสังคม</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.social_enterprise"
                      :placeholder="taxInfo?.pension_fund || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                  </div>
                  <!-- ✅ GPF -->
                  <div>
                    <label class="text-gray-600 font-bold">กองทุนบำเหน็จบำนาญข้าราชการ (GPF)</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.pension_fund"
                      :placeholder="taxInfo?.pension_fund || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                  </div>

                  <!-- ✅ PVD -->
                  <div>
                    <label class="text-gray-600 font-bold">กองทุนสำรองเลี้ยงชีพ (PVD)</label>
                    <input type="number" min="0" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.provident_fund"
                      :placeholder="taxInfo?.provident_fund || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                  </div>

                  <!-- ✅ RMF -->
                  <div>
                    <label class="text-gray-600 font-bold">RMF</label>
                    <input v-model="tax_info2025.rmf_fund" type="number" min="0" @keydown="allowOnlyNumericAndDecimal"
                      @paste="checkPaste" class="input-field" :placeholder="taxInfo?.rmf_fund || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 30% ของเงินได้</p>
                  </div>

                  <!-- ✅ NSF -->
                  <div>
                    <label class="text-gray-600 font-bold">กองทุนการออมแห่งชาติ (NSF)</label>
                    <input type="number" min="0" step="0.01" @keydown="allowOnlyNumericAndDecimal" @paste="checkPaste"
                      class="input-field" v-model="tax_info2025.national_saving_fund"
                      :placeholder="taxInfo?.national_saving_fund || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้ตามที่จ่ายจริง</p>
                  </div>

                  <!-- ✅ Thai ESG -->
                  <div>
                    <label class="text-gray-600 font-bold">Thai ESG</label>
                    <input v-model="tax_info2025.thai_esg" type="number" min="0" @keydown="allowOnlyNumericAndDecimal"
                      @paste="checkPaste" class="input-field" :placeholder="taxInfo?.thai_esg || 'กรุณากรอกข้อมูล'" />
                    <p class="text-sm text-gray-500 mt-1">ลดหย่อนได้สูงสุด 30% ของเงินได้</p>
                  </div>
                </div>
              </div>

              <!-- Add this after the "การลงทุนลดหย่อนภาษี" section -->
              <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-lg font-bold mb-4 text-gray-900">
                  🎯 สรุปผลการคำนวณภาษีปัจจุบัน
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <!-- ประหยัดภาษีได้ -->
                  <div>
                    <label class="text-gray-600 font-bold">เงินได้รวม</label>
                    <p class="output-field">{{ formatNumber(taxInfo.total_income.toLocaleString("th-TH", {
                      minimumFractionDigits:
                        2, maximumFractionDigits: 2
                    })) }} บาท</p>
                    <!-- <p class="text-sm text-gray-500 mt-2">ของยอดลดหย่อน</p> -->
                  </div>
                  <!-- ยอดรวมการลดหย่อนปัจจุบัน -->
                  <div>
                    <label class="text-gray-600 font-bold">ยอดรวมการลดหย่อนปัจจุบัน</label>
                    <p class="output-field">{{ formatNumber(taxInfo.total_deduction.toLocaleString("th-TH", {
                      minimumFractionDigits:
                        2, maximumFractionDigits: 2
                    })) }} บาท</p>
                    <!-- <div class="mt-2 bg-gray-200 rounded-full h-2">
                      <div class="bg-teal-500 h-2 rounded-full transition-all duration-1000" :style="{
                        width: ``,
                      }"></div>
                    </div> -->
                  </div>

                  <!-- เป้าหมายการลดหย่อน -->
                  <div>
                    <label class="text-gray-600 font-bold">เงินได้สุทธิ</label>
                    <p class="output-field">{{ formatNumber(taxInfo.taxable_income.toLocaleString("th-TH", {
                      minimumFractionDigits:
                        2, maximumFractionDigits: 2
                    })) }} บาท</p>
                    <!-- <p class="text-sm text-gray-500 mt-2">เหลืออีก ฿</p> -->
                  </div>

                  <!-- ประหยัดภาษีได้ -->
                  <div>
                    <label class="text-gray-600 font-bold">ภาษีที่ต้องจ่าย</label>
                    <p class="output-field">{{ formatNumber(usertax.toLocaleString("th-TH", {
                      minimumFractionDigits:
                        2, maximumFractionDigits: 2
                    })) }} บาท</p>
                    <!-- <p class="text-sm text-gray-500 mt-2">ของยอดลดหย่อน</p> -->
                  </div>
                </div>
              </div>
            </div>

            <!-- 🔹 Save Tax Info Button -->
            <div class="text-center mt-6">
              <button @click="saveTaxInfo"
                class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 font-bold">
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
      usertax: 0,
      totalChildren: 0,
      childrenAfter2018: 0,
      adoptedChildren: 0,
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
        new_house_cost: 0,        // float ***

        // ค่าใช้จ่ายครรภ์มารดา
        prenatal_expense: 0      // float
      },
    };
  },
  computed: {
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
    formatNumber(num) {
      if (num === undefined || num === null) return "0";
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
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
      // Retrieve JWT token and username from localStorage
      const authToken = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");

      // API Endpoint
      const apiUrl = `/api/deduction/${username}/2025`;

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

          this.taxInfo = data;
          const infoKeys = Object.keys(this.taxInfo);
          const taxKeys = Object.keys(this.tax_info2025);

          taxKeys.forEach((key) => {
            if (infoKeys.includes(key)) {
              const value = this.taxInfo[key];
              // ตรวจสอบว่า value เป็นตัวเลข หรือสามารถแปลงเป็นตัวเลขได้
              if (!isNaN(value) && value !== null && value !== '') {
                this.tax_info2025[key] = Number(value);
              } else {
                this.tax_info2025[key] = value; // ถ้าไม่ใช่ตัวเลข (boolean, array, string ฯลฯ) ให้เก็บตามเดิม
              }
            }
          });
          // this.calculateTotalDeductions();
        }
      } catch (error) {
        console.error("Error fetching tax info:", error);
        this.toast.error("ไม่สามารถดึงข้อมูลภาษี");
      } finally {
        // this.isLoading = false;
      }
    },
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

      const jwtToken = localStorage.getItem('jwtToken');
      const username = localStorage.getItem('username');
      try {
        // Simulate API call
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        this.tax_info2025.children = this.computedChildren;

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
        this.toast.success("บันทึกข้อมูลภาษีเรียบร้อย!", {
          timeout: 1000,
          position: "top-center",
        });
        await this.fetchTaxInfo();
        await this.fetchTaxGoal();
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
        localStorage.clear();
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
      await this.fetchData();
      await this.fetchTaxInfo();
      await this.fetchTaxGoal();
      this.tax_info2025.prenatal_expense = parseFloat(this.taxInfo.prenatal_deduction);
      this.totalChildren = parseInt(localStorage.getItem('children')) || 0;
      this.childrenAfter2018 = parseInt(localStorage.getItem('childernAfter2018')) || 0;
      this.adoptedChildren = parseInt(localStorage.getItem('adoptedChildren')) || 0;

      this.tax_info2025.number_of_parents = parseInt(localStorage.getItem('number_of_parents')) || 0;
      this.tax_info2025.has_disabled_person = localStorage.getItem('has_disabled_person') === 'true';
      this.tax_info2025.marital_status = localStorage.getItem('marital_status') || 'single';
      // Add your profile loading logic here
    } catch (error) {
      console.error("Error loading profile:", error);
      this.toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูลโปรไฟล์");
    } finally {
      this.isLoadingProfile = false;
    }
  },
};
</script>

<style scoped>
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
.grid.grid-cols-1.md\:grid-cols-2.gap-6>div {
  margin-bottom: 12px;
  position: relative;
  overflow: visible !important;
}

.grid.grid-cols-1.md\:grid-cols-2.gap-6>div:hover::before {
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
  overflow: visible !important;
  /* Ensure content doesn't get cut off */
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
.grid.grid-cols-1.gap-6>div {
  margin-bottom: 12px;
  position: relative;
  overflow: visible !important;
  /* Changed from overflow: hidden to visible */
}

.grid.grid-cols-1.gap-6>div::before {
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

.grid.grid-cols-1.gap-6>div:hover::before {
  opacity: 1;
}

/* Fix for container sizing */
.w-full.max-w-6xl {
  overflow: visible !important;
}

/* Fix for any potential transform overflow issues */
.flex.justify-center {
  overflow: visible !important;
  padding-bottom: 2rem;
  /* Add some bottom padding to account for transforms */
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
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

*::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
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
}
</style>
