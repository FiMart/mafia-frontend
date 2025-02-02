<template>
    <div class="register-page flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
        <div class="register-container bg-white backdrop-blur-sm p-6 rounded-lg shadow-md w-96">
            <div class="flex justify-center mb-6">
                <img src="@/assets/icon/logo1.png" alt="MAFIA Logo" class="h-16" />
            </div>
            <h1 class="text-xl font-semibold text-center mb-6">
                ลงทะเบียนเข้าใช้งาน
            </h1>
            <form @submit.prevent="showSurvey" class="space-y-4">
                <input 
                    v-model="username" 
                    type="text" 
                    placeholder="ชื่อ-นามสกุล" 
                    class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400" 
                />
                <input 
                    v-model="email" 
                    type="email" 
                    placeholder="อีเมล" 
                    class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400" 
                />
                <div class="relative">
                    <input 
                        v-model="password" 
                        :type="showPassword ? 'text' : 'password'" 
                        placeholder="รหัสผ่าน" 
                        class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400" 
                    />
                    <button 
                        type="button" 
                        @click="togglePassword" 
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        <svg 
                            v-if="showPassword" 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-5 w-5" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <svg 
                            v-else 
                            xmlns="http://www.w3.org/2000/svg" 
                            class="h-5 w-5" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"
                        >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                    </button>
                </div>
                <div class="relative">
                    <input 
                        v-model="birthday" 
                        type="date" 
                        placeholder="วัน/เดือน/ปีเกิด" 
                        class="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400" 
                    />
                </div>
                <select 
                    v-model="maritalStatus" 
                    class="input-field w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <option disabled value="">สถานะผู้ใช้งาน</option>
                    <option value="โสด">โสด</option>
                    <option value="สมรส">หย่า</option>
                    <option value="คู่สมรสมีเงินได้">คู่สมรสมีเงินได้ (แยกยื่น)</option>
                    <option value="คู่สมรสไม่มีเงินได้">คู่สมรสไม่มีเงินได้</option>
                </select>
                <select 
                    v-model="userType" 
                    class="input-field w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <option disabled value="">อาชีพ</option>
                    <option value="นักเรียน/นักศึกษา">นักเรียน/นักศึกษา</option>
                    <option value="พนักงานบริษัท">พนักงานบริษัท</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                </select>
                <button 
                    type="submit"
                    class="w-full bg-teal-600 text-white py-2 rounded-full hover:bg-teal-800 transition-colors font-bold"
                >
                    ลงทะเบียน
                </button>
            </form>
            <p class="text-center mt-4 text-sm text-orange-400">
                <span>เป็นสมาชิกอยู่แล้ว? </span>
                <router-link to="/login" class="text-teal-600 hover:underline">เข้าสู่ระบบ</router-link>
            </p>
        </div>
    </div>
    
    <!-- Survey Experience Popup -->
    <transition 
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
        <div 
            v-if="isSurveyVisible" 
            class="survey-popup-wrapper fixed inset-0 flex items-center justify-center z-50"
        >
            <div class="absolute inset-0 bg-black bg-opacity-50"></div>
            <SurveyExPopUp 
                :isVisible="isSurveyVisible"
                :userData="getUserData"
                @confirm="handleSurveyConfirm"
                @close="closeSurvey"
                class="relative"
            />
        </div>
    </transition>
    
    <!-- Toast Notifications -->
    <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-[-100%] opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-if="toast.show"
            :class="[
                'fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center px-4 py-3 rounded-lg text-white shadow-lg z-50',
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            ]"
        >
            <svg
                v-if="toast.type === 'success'"
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                />
            </svg>
            <svg
                v-else
                class="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            {{ toast.message }}
        </div>
    </transition>
    </template>
    
    <script>
    import SurveyExPopUp from '@/components/SurveyExPopUp.vue';
    import { useToast } from 'vue-toastification'
    
    export default {
        name: "Register",
        components: {
            SurveyExPopUp
        },
        setup() {
            const toast = useToast()
            return { toast }
        },
        data() {
            return {
                username: "",
                email: "",
                password: "",
                birthday: "",
                maritalStatus: "",
                userType: "",
                showPassword: false,
                isSurveyVisible: false
            };
        },
        computed: {
            getUserData() {
                return {
                    username: this.username,
                    email: this.email,
                    birthday: this.birthday,
                    maritalStatus: this.maritalStatus,
                    userType: this.userType
                };
            }
        },
        methods: {
            togglePassword() {
                this.showPassword = !this.showPassword;
            },
            validateForm() {
                if (!this.username || !this.email || !this.password || !this.birthday || !this.maritalStatus || !this.userType) {
                    this.toast.error('กรุณากรอกข้อมูลให้ครบ', {
                        position: "top-center",
                        timeout: 3000,
                        toastClassName: "custom-toast-center"
                    });
                    return false;
                }
                return true;
            },
            showSurvey(e) {
                e.preventDefault();
                if (this.validateForm()) {
                    this.isSurveyVisible = true;
                }
            },
            closeSurvey() {
                this.isSurveyVisible = false;
            },
            async handleSurveyConfirm(surveyData) {
                this.closeSurvey();
                try {
                    await this.handleRegister(surveyData);
                } catch (error) {
                    console.error("Registration failed:", error);
                    this.toast.error('เกิดข้อผิดพลาดในการลงทะเบียน', {
                        position: "top-center",
                        timeout: 3000,
                        toastClassName: "custom-toast-center"
                    });
                }
            },
            async handleRegister(surveyData) {
                try {
                    const registrationData = {
                        ...this.getUserData,
                        password: this.password,
                        survey: surveyData
                    };
                    
                    await this.register(registrationData);
                    this.toast.success('ลงทะเบียนสำเร็จ', {
                        position: "top-center",
                        timeout: 2000,
                        toastClassName: "custom-toast-center"
                    });
                } catch (error) {
                    throw error;
                }
            },
            async register(data) {
                // Simulate API call - replace with actual API call
                return new Promise((resolve) => {
                    console.log('Registration data:', data);
                    setTimeout(resolve, 1000);
                });
            },
        },
    };
    </script>
    
    <style>
    .register-page {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/bg0.jpg');
        background-size: cover;
        background-position: center;
        min-height: 100vh;
    }
    
    .input-field {
        width: 100%;
        height: 2.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-bottom: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        color: #374151;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    
    .input-field:focus {
        border-color: #fb923c;
        box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.5);
    }

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