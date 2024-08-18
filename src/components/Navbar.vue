<template>
  <div class="navbar bg-slate-700 text-white flex items-center">
    <img src="@/assets/logo.png" alt="icon-mafia" class="navbar-icon h-10 mx-2">
    <a href="/" class="nav-link font-bold">หน้าแรก</a>
    <a href="dashboard" class="nav-link font-bold">ภาพรวมพอร์ต</a>
    <a href="buysell" class="nav-link font-bold">จำลองการซื้อ/ขาย</a>
    <a href="abouttax" class="nav-link font-bold">เกี่ยวกับภาษี</a>
    <a href="profile" class="nav-link font-bold">โปรไฟล์</a>
    <div class="right-links ml-auto flex">
      <a href="login" class="nav-link font-bold">เข้าสู่ระบบ</a>
      <a href="register" class="nav-link font-bold">ลงทะเบียน</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
/* Tailwind CSS custom classes */
.nav-link {
  @apply text-white text-center px-4 py-3 text-sm hover:bg-gray-200 hover:text-gray-900 transition duration-200;
}
</style>
