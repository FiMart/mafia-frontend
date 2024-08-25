<template>
  <div class="login-page flex flex-col items-center justify-center h-screen bg-green-500">
    <div class="login-container bg-white p-8 rounded shadow-md w-96">
      <img src="@/assets/logo1.png" alt="icon-mafia" class="navbar-icon h-20  mx-2">
      <h1 class="text-2xl font-semibold mb-4 text-center">Login</h1>
      <input v-model="username" placeholder="Enter Username" class="input mb-4" />
      <input v-model="password" placeholder="Enter Password" class="input mb-6" type="password" />
      <button v-on:click="showPopup = true" class="btn mb-4">Login</button>
      <p class="text-center">
        <router-link to="/register" class="text-green-500 hover:underline">Don't Have Account? Register Here</router-link>
      </p>
    </div>
    
    <PopUp
      v-if="showPopup"
      :isVisible="showPopup"
      title="โปรดทำแบบสอบถามเกี่ยวกับประสบการณ์การลงทุนในกองทุนรวมจำนวน 10 ข้อ"
      message="กรุณาตอบให้ตรง มีผลกับการวิเคราะห์กองทุนให้กับผู้ใช"
      @close="showPopup = false"
      @confirm="login"
    />
  </div>
</template>

<script>
import PopUp from '@/components/PopUp.vue';

export default {
  name: "Login",
  components: {
    PopUp,
  },
  data() {
    return {
      username: '',
      password: '',
      showPopup: false,
    }
  },
  methods: {
    login() {
      this.showPopup = false;
      this.$router.push({ name: "Home" });
    }
  }
}
</script>

<style>
/* Tailwind CSS custom classes */
.input {
  @apply w-full h-10 px-4 border border-gray-300 rounded;
}
.btn {
  @apply w-full h-10 bg-green-500 text-white rounded hover:bg-green-600;
}
</style>
