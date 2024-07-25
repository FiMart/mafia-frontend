<template>
  <div class="navbar bg-gray-800 text-white flex items-center">
    <img src="https://cdn-icons-png.flaticon.com/128/17015/17015213.png" alt="icon-mafia" class="navbar-icon h-10 mx-2">
    <a href="/" class="nav-link">หน้าแรก</a>
    <a href="dashboard" class="nav-link">ภาพรวมพอร์ต</a>
    <a href="buysell" class="nav-link">จำลองการซื้อ/ขาย</a>
    <a href="abouttax" class="nav-link">เกี่ยวกับภาษี</a>
    <a href="profile" class="nav-link">โปรไฟล์</a>
    <div class="right-links ml-auto flex">
      <a href="login" class="nav-link">เข้าสู่ระบบ</a>
      <a href="register" class="nav-link">ลงทะเบียน</a>
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
