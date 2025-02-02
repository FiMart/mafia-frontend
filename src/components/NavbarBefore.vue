<template>
  <div class="navbar sticky top-0 bg-[#243447] text-white flex items-center justify-between px-4 h-14">
    <!-- โลโก้ -->
    <div class="flex items-center">
      <img src="@/assets/icon/logo.png" alt="icon-mafia" class="navbar-icon h-10 mr-4">    
    </div>

    <!-- ลิงก์ด้านขวา -->
    <div class="flex items-center space-x-4">
      <!-- ปุ่มเข้าสู่ระบบ -->
      <a href="login" class="text-white font-semibold hover:bg-white hover:text-gray-900 px-5 py-2 rounded-md transition duration-200 text-sm">เข้าสู่ระบบ</a>
      <!-- ปุ่มสมัครใช้งาน -->
      <a href="register" class="bg-orange-400 text-white font-semibold px-4 py-2 rounded-md transition duration-200 text-sm hover:text-black hover:bg-white">
        สมัครใช้งาน
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarBefore',
}
</script>

<style scoped>
.navbar {
  background-color: #243447; /* สีพื้นหลังตามภาพ */
}
</style>