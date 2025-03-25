<template>
<<<<<<< HEAD
  <!-- Changed from sticky to fixed with proper class for consistency -->
  <div
    class="navbar fixed top-0 left-0 right-0 bg-gradient-to-r from-[#243447] to-[#2C4058] text-white flex items-center px-4 h-14 w-full z-50 shadow-md"
  >
    <!-- Loading overlay remains unchanged -->
    <Loading
      v-if="isLoading"
      message="กำลังออกจากระบบ..."
      class="fixed inset-0 bg-black bg-opacity-80 z-[60] flex items-center justify-center"
    />

    <!-- Logo remains unchanged -->
    <router-link to="/home">
      <img src="@/assets/icon/logo.png" alt="icon-mafia" class="navbar-icon h-10 mr-4" />
    </router-link>

    <!-- Navigation links remain unchanged -->
    <a href="home" class="nav-link font-bold relative group">
      หน้าแรก
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
      ></span>
    </a>
    <a href="dashboard" class="nav-link font-bold relative group">
      ภาพรวมพอร์ต
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
      ></span>
    </a>
    <a href="transaction" class="nav-link font-bold relative group">
      ประวัติซื้อขาย
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
      ></span>
    </a>
    <a href="summary" class="nav-link font-bold relative group">
      สรุปผล
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
      ></span>
    </a>
    <a href="about-tax" class="nav-link font-bold relative group">
      เกี่ยวกับภาษี
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
      ></span>
    </a>

    <!-- Spacer remains unchanged -->
    <div class="flex-grow"></div>

    <!-- Only keep the profile dropdown -->
    <div class="relative" v-click-outside="closeDropdown">
      <img
        src="@/assets/icon/profile.png"
        alt="profile"
        class="h-8 w-8 rounded-full cursor-pointer transform transition-all duration-300 hover:scale-110 hover:ring-2 hover:ring-white"
        @click="toggleDropdown"
      />
      <!-- Rest of the profile dropdown remains unchanged -->
      <div
        v-if="dropdownVisible"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2 z-50 animate-slideIn"
      >
        <!-- User Info Section -->
        <div class="px-4 py-2 border-b border-gray-200">
          <div class="text-sm font-medium text-gray-900">{{ userInfo.name }}</div>
          <div class="text-sm text-gray-500">{{ userInfo.email }}</div>
        </div>
        <!-- Menu Items -->
        <a
          href="profile"
          class="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
          >โปรไฟล์</a
        >
        <a
          href="about-us"
          class="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
          >เกี่ยวกับเรา</a
        >
        <button
          @click="confirmLogout"
          class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white"
        >
          ออกจากระบบ
        </button>
=======
  <div class="navbar bg-[#243447] text-white flex items-center px-4 h-14 sticky top-0">
    <!-- โลโก้ -->
    <router-link to="/home">
      <img src="@/assets/icon/logo.png" alt="icon-mafia" class="navbar-icon h-10 mr-4">
    </router-link>

    <!-- ลิงก์เมนู -->
    <a href="home" class="nav-link font-bold">หน้าแรก</a>
    <a href="dashboard" class="nav-link font-bold">ภาพรวมพอร์ต</a>
    <a href="about-tax" class="nav-link font-bold">เกี่ยวกับภาษี</a>
    
    <!-- ช่องว่างระหว่างลิงก์ซ้ายและขวา -->
    <div class="flex-grow"></div>
    
    <!-- ไอคอนแจ้งเตือนและโปรไฟล์ -->
    <div class="flex items-center space-x-4">
      <button class="relative" @click="toggleNotificationDropdown">
        <img src="@/assets/icon/notification.png" 
             alt="notifications" 
             class="h-6 w-6 transition duration-200 ease-in-out transform hover:scale-110">
        <span v-if="notifications.length" 
              class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
          {{ notifications.length }}
        </span>
        <div v-if="notificationDropdownVisible" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <!-- Header -->
          <div class="bg-green-500 text-white px-4 py-2 font-semibold">
            การแจ้งเตือน
          </div>
          <!-- Notification Content -->
          <div class="py-2">
            <div v-if="notifications.length">
              <a v-for="notification in notifications" 
                 :key="notification.id" 
                 href="/notifications" 
                 class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                {{ notification.message }}
              </a>
            </div>
            <div v-else class="block px-4 py-2 text-gray-800">
              ยังไม่มีการแจ้งเตือนตอนนี้
            </div>
          </div>
        </div>
      </button>
      <div class="relative" v-click-outside="closeDropdown">
        <img src="@/assets/icon/profile.png" 
             alt="profile" 
             class="h-8 w-8 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
             @click="toggleDropdown">
        <div v-if="dropdownVisible" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
          <!-- User Info Section -->
          <div class="px-4 py-2 border-b border-gray-200">
            <div class="text-sm font-medium text-gray-900">{{ userInfo.name }}</div>
            <div class="text-sm text-gray-500">{{ userInfo.email }}</div>
          </div>
          <!-- Menu Items -->
          <a href="profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white">โปรไฟล์</a>
          <button @click="confirmLogout" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white">ออกจากระบบ</button>
        </div>
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
      </div>
    </div>
  </div>

<<<<<<< HEAD
  <!-- Add spacer div to prevent content from being hidden under the navbar -->
  <div class="h-14"></div>

  <!-- Logout Confirmation Dialog -->
  <div
    v-if="showLogoutDialog"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
    >
      <!-- Icon Section -->
      <div class="text-center mb-6">
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
        <h3 class="text-xl font-semibold text-gray-900 mb-2">ยืนยันการออกจากระบบ</h3>
        <p class="text-gray-600">คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</p>
      </div>

      <!-- Buttons Section -->
      <div
        class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
      >
        <button
          @click="handleLogout"
          :disabled="isLoading"
          class="w-full sm:w-auto px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span class="text-sm font-semibold">ออกจากระบบ</span>
        </button>
        <button
          @click="showLogoutDialog = false"
          :disabled="isLoading"
          class="w-full sm:w-auto px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span class="text-sm font-semibold">ยกเลิก</span>
=======
  <!-- Logout Confirmation Dialog -->
  <div v-if="showLogoutDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl text-center">
      <h3 class="text-lg font-semibold mb-4">ยืนยันการออกจากระบบ</h3>
      <p>คุณแน่ใจว่าต้องการออกจากระบบ?</p>
      <div class="mt-4 flex justify-end space-x-3">
        <button @click="showLogoutDialog = false" 
                class="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
          ยกเลิก
        </button>
        <button @click="handleLogout" 
                class="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
          ออกจากระบบ
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
        </button>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { useToast } from "vue-toastification";
import Loading from "./Loading.vue";

export default {
  name: "Navbar",
  components: {
    Loading,
  },
  directives: {
    "click-outside": {
      mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
=======
import { useToast } from 'vue-toastification'

export default {
  name: 'Navbar',
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
<<<<<<< HEAD
        document.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
=======
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
      },
    },
  },
  setup() {
<<<<<<< HEAD
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      isLoading: false,
      dropdownVisible: false,
      showLogoutDialog: false,
      showToast: false,
      userInfo: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    update_profile() {
      this.userInfo.name = localStorage.getItem("username");
      this.userInfo.email = localStorage.getItem("email");
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
=======
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      dropdownVisible: false,
      notificationDropdownVisible: false,
      notifications: [], // Add your notifications here
      showLogoutDialog: false,
      showToast: false,
      userInfo: {
        name: 'Usertest Attendance',
        email: 'user_test@gmail.com'
      }
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    toggleNotificationDropdown() {
      this.notificationDropdownVisible = !this.notificationDropdownVisible;
    },
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
    confirmLogout() {
      this.showLogoutDialog = true;
    },
    async handleLogout() {
<<<<<<< HEAD
      this.isLoading = true;
      try {
        // Logout logic
        this.showLogoutDialog = false;
        this.toast.success("ออกจากระบบเสร็จสิ้น", {
          timeout: 1000,
          position: "top-center",
          toastClassName: "custom-toast-center",
        });

        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate logout process

        // Redirect or clear session
        this.$router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
        this.toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      // Perform any logout logic here, such as clearing tokens or user data
      this.$router.push("/");
    },
    closeDropdown() {
      this.dropdownVisible = false;
    },
  },
  mounted() {
    this.update_profile();
  },
=======
      // Logout logic
      this.showLogoutDialog = false;
      this.toast.success('ออกจากระบบเสร็จสิ้น', {
        timeout: 2000,
        position: "top-center",
        toastClassName: "custom-toast-center"
      })
      
      setTimeout(() => {
        this.showToast = false;
        // Redirect or clear session
        this.$router.push('/');
      }, 3000);
    },
    logout() {
      // Perform any logout logic here, such as clearing tokens or user data
      this.$router.push('/');
    },
    closeDropdown() {
      this.dropdownVisible = false;
    }
  }
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
};
</script>

<style scoped>
/* Tailwind CSS custom classes */
.navbar {
<<<<<<< HEAD
  background-color: #243447;
  position: fixed !important; /* Force fixed positioning */
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 50 !important; /* Ensure high z-index */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.nav-link {
  position: relative;
  color: white;
  text-align: center;
  padding: 1.25rem 1rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-1px);
=======
  background-color: #243447; /* สีฟ้าเข้มใกล้เคียงในภาพ */
}

.nav-link {
    color: white;
    text-align: center;
    padding: 1.25rem 1rem;
    font-size: 0.875rem;
    transition: background-color 0.2s, color 0.2s;
  }
  .nav-link:hover {
    background-color: #ffffff;
    color: #1a202c;
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hover-effect {
  transition: all 0.2s ease-in-out;
}
.hover-effect:hover {
  transform: scale(1.1);
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
<<<<<<< HEAD

/* สำหรับ dropdowns */
.dropdown-content {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* ปรับแต่ง stacking context */
.relative {
  position: relative;
  z-index: 50;
}

/* Add styles for loading overlay */
.bg-opacity-80 {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Add new animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.2s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

/* Enhanced nav link styles */
.nav-link {
  position: relative;
  color: white;
  text-align: center;
  padding: 1.25rem 1rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-1px);
}

/* Enhanced dropdown styles */
.dropdown-content {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease-in-out;
}

/* Gradient animation for navbar */
.navbar {
  background-size: 200% 200%;
  animation: gradientMove 10s ease infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Enhanced hover effects for buttons */
button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Add margin to main content */
:deep(main) {
  margin-top: 0; /* Remove top margin since we have spacer */
  padding-top: 0; /* Remove padding */
}

/* Enhance shadow on scroll */
.navbar.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
=======
</style>
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
