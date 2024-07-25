<template>
  <div class="login-page flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-8 text-center">MutuAl Fund Investment Advisor (MAFIA)</h1>
    <div class="login-container bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-semibold mb-4 text-center">Login</h1>
      <input v-model="username" placeholder="Enter Username" class="input mb-4" />
      <input v-model="password" placeholder="Enter Password" class="input mb-6" type="password" />
      <button v-on:click="login" class="btn mb-4">Login</button>
      <p class="text-center">
        <router-link to="/register" class="text-blue-500 hover:underline">Don't Have Account? Register Here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$router.push({name: "Home"});
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
