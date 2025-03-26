<template>
  <!-- Remove the wrapper div and place navbar at root level -->
  <!-- Loading Overlay -->
  <Loading
    v-if="isLoading"
    message="กำลังดำเนินการ..."
    class="fixed inset-0 bg-black bg-opacity-90 z-50"
  />

  <!-- Fixed sticky navbar with proper styling -->
  <div
    class="navbar fixed top-0 left-0 right-0 bg-gradient-to-r from-[#243447] to-[#2C4058] text-white flex items-center justify-between px-4 h-14 shadow-md z-40"
  >
    <!-- โลโก้ -->
    <div class="flex items-center">
      <img src="@/assets/icon/logo.png" alt="icon-mafia" class="navbar-icon h-10 mr-4" />
    </div>

    <!-- ลิงก์ด้านขวา -->
    <div class="flex items-center space-x-4">
      <!-- ปุ่มเข้าสู่ระบบ -->
      <button
        @click="handleLogin"
        :disabled="isLoading"
        class="text-white font-semibold hover:bg-white hover:text-gray-900 px-5 py-2 rounded-md transition duration-200 text-sm disabled:opacity-50"
      >
        เข้าสู่ระบบ
      </button>
      <!-- ปุ่มสมัครใช้งาน -->
      <button
        @click="handleRegister"
        :disabled="isLoading"
        class="bg-orange-400 text-white font-semibold px-4 py-2 rounded-md transition duration-200 text-sm hover:text-black hover:bg-white disabled:opacity-50"
      >
        สมัครใช้งาน
      </button>
    </div>
  </div>

  <!-- Add spacer to prevent content from being hidden under navbar -->
  <div class="h-14"></div>
</template>

<script>
import Loading from "./Loading.vue";

export default {
  name: "NavbarBefore",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      try {
        await this.$router.push("/login");
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async handleRegister() {
      this.isLoading = true;
      try {
        await this.$router.push("/register");
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Changed to fixed positioning to ensure it works */
.navbar {
  background-color: #243447; /* Fallback color */
  background-image: linear-gradient(
    to right,
    #243447,
    #2c4058
  ); /* Gradient matching Navbar.vue */
  transition: all 0.3s ease;
  position: fixed; /* Changed from sticky to fixed */
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 40;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Enhanced shadow */
}

/* Add this to ensure the navbar stays on top */
:deep(body) {
  padding-top: 0; /* Remove any top padding that might push the navbar down */
  margin-top: 0;
}

/* Remove the relative positioning from container since we removed it */
/* .navbar-container {
  width: 100%;
  position: relative;
} */

/* Rest of your styles remain unchanged */
.navbar-icon {
  transition: transform 0.3s ease;
}

.navbar-icon:hover {
  transform: scale(1.1);
}

button {
  transition: all 0.3s ease;
}

button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:not(:disabled):active {
  transform: translateY(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fixed {
  position: fixed;
  animation: fadeIn 0.3s ease-out;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
