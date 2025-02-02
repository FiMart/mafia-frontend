<template>
    <div class="min-h-screen flex flex-col">
        <Navbar />
        <div class="mb-10">
        <div class="w-2/3 mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="text-lg py-2 px-5 bg-green-500 text-white text-left font-bold">
                รายได้
            </div>
            <div class="md:col-span-12 px-10 py-5">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">รายได้ต่อเดือน</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">หักค่าใช้จ่าย</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">โบนัสประจำปี</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">หักค่าใช้จ่าย</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">รายได้อื่น ๆ</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">หักค่าใช้จ่าย</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="w-2/3 mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="text-lg py-2 px-5 bg-green-500 text-white text-left font-bold">
                รายการลดหย่อน: ครอบครัว
            </div>
            <div class="md:col-span-15 px-10 py-2">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">สถานะสมรส</label>
                        <div class="flex justify-end gap-2">
                            <p class="">โสด</p>
                            <!-- <p class="">บาท</p> -->
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">ลดหย่อนส่วนบุคคล</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">ลดหย่อนคู่สมรส</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-red-700">ค่าลดหย่อนฝากครรณ์และคลอดบุตร</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-red-700">จำนวนบุตร (x คน)</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-red-700">จำนวนบุตรบุญธรรม (x คน)</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-red-700">ลดหย่อนบิดามารดา (ตนเอง)</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-red-700">ลดหย่อนบิดามารดา (คู่สมรส)</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-red-700">ลดหย่อนผู้พิการหรือทุพลภาพ</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-2/3 mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="text-lg py-2 px-5 bg-green-500 text-white text-left font-bold">
                รายการลดหย่อน: เงินบริจาค
            </div>
            <div class="md:col-span-12 px-10 py-2">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เงินบริจาตทั่วไป</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เงินบริจาคเพื่อการศึกษา</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เงินบริจาคเพื่อการเมือง</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เงินบริจาคเพื่อสังคม</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-2/3 mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="text-lg py-2 px-5 bg-green-500 text-white text-left font-bold">
                รายการลดหย่อน: ประกันชีวิต
            </div>
            <div class="md:col-span-12 px-10 py-2">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เบี้ยประกันชีวิต</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เบี้ยประกันสุขภาพ</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เบี้ยประกันสุขภาพบิดามารดา</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เบี้ยประกันบำนาญ</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-2/3 mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="text-lg py-2 px-5 bg-green-500 text-white text-left font-bold">
                รายการลดหย่อน: อื่น ๆ
            </div>
            <div class="md:col-span-12 px-10 py-2">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">เงินสมทบกองทุนประกันสังคม</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">ค่าใช้จ่ายจากใบเสร็จอิเล็กทรอนิกส์ (e-Donation)</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">ค่าใช้จ่ายท่องเที่ยวเมืองรอง</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">ดอกเบี้ยสินเชื่อเพื่อที่อยู่อาศัย</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block text-sm text-gray-700">ค่าซื้อบ้านใหม่</label>
                        <div class="flex justify-end gap-2">
                            <p class="">15,000.00</p>
                            <p class="">บาท</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
    name: "Abouttax",
    components: {
        Navbar
    }
}
</script>

<style scoped>

</style>
