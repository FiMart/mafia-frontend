<template>
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
      </div>
    </div>
  </div>

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
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
  name: 'Navbar',
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
  setup() {
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
    confirmLogout() {
      this.showLogoutDialog = true;
    },
    async handleLogout() {
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
};
</script>

<style scoped>
/* Tailwind CSS custom classes */
.navbar {
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
</style>