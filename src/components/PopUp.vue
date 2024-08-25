<template>
<div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-[36rem]">
        <!-- Increased width and padding -->
        <div class="flex flex-col items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/2666/2666436.png" alt="Survey Image" class="w-24 h-24 mb-6" /> <!-- Increased image size and margin -->
            <h3 class="text-xl font-semibold mb-6 text-center">
                <!-- Increased font size and margin -->
                โปรดทำแบบสอบถามเกี่ยวกับประสบการณ์การลงทุนในกองทุนรวม
            </h3>
            <p class="mb-8 text-center text-lg">
                <!-- Increased font size and margin -->
                กรุณาตอบให้ตรง มีผลกับการวิเคราะห์กองทุนของผู้ใช้
            </p>
            <ul class="list-disc mb-8 text-left space-y-4">
                <!-- Increased spacing and margin -->
                <li class="flex items-start">
                    <img src="https://cdn-icons-png.flaticon.com/128/14034/14034428.png" alt="Icon" class="w-5 h-5 mr-3 mt-1" /> <!-- Slightly increased icon size -->
                    <span>
                        แบบสอบถามนี้ใช้เวลาทำประมาณ 5-10 นาที และทำแค่เฉพาะครั้งแรกที่สมัครใช้งาน
                    </span>
                </li>
                <li class="flex items-start">
                    <img src="https://t3.ftcdn.net/jpg/01/45/20/02/240_F_145200260_Mlts2v0PtYabB4v5dz1I8hKNCfieJidW.jpg" alt="Icon" class="w-5 h-5 mr-3 mt-1" /> <!-- Slightly increased icon size -->
                    <span>
                        แบบสอบถามนี้ผู้จัดทำได้รวบรวมมาจากแหล่งต่างๆ ถ้าผิดพลาดประการใดผู้จัดทำขออภัยไว้ ณ ที่นี้ด้วยนะครับ
                    </span>
                </li>
            </ul>

            <button @click="confirm" class="w-full px-5 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition text-lg">
                <!-- Increased button padding and font size -->
                ทำแบบประเมิน
            </button>
        </div>
    </div>
</div>
</template>

    
<script>
export default {
    name: 'SurveyPrompt',
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['confirm'],
    methods: {
        confirm() {
            this.$emit('confirm');
        },
    },
};
</script>

    
<style scoped>
/* Add any additional styling here if needed */
</style>
