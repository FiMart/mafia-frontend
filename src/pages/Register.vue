<template>
  <div class="register-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-8">MutuAl Fund Investment Advisor (MAFIA)</h1>
    <div class="register-container bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-semibold mb-6 text-center">Register</h1>
      <input v-model="username" placeholder="Enter Username" class="input mb-4" />
      <input v-model="email" placeholder="Enter Email" class="input mb-4" />
      <input v-model="password" type="password" placeholder="Enter Password" class="input mb-4" />
      <input v-model="confirmPassword" type="password" placeholder="Enter Confirm Password" class="input mb-4" />
      <input v-model="telephoneNumber" placeholder="Enter Telephone Number" class="input mb-4" />
      <div class="gender-container mb-6">
        <label class="gender-label mr-4">
          <input type="radio" v-model="gender" value="Male" class="hidden" />
          <span class="custom-radio"></span>
          Male
        </label>
        <label class="gender-label mr-4">
          <input type="radio" v-model="gender" value="Female" class="hidden" />
          <span class="custom-radio"></span>
          Female
        </label>
        <label class="gender-label">
          <input type="radio" v-model="gender" value="Other" class="hidden" />
          <span class="custom-radio"></span>
          Other
        </label>
      </div>
      <input v-model="birthday" type="date" placeholder="Enter Birthday" class="input mb-6" />
      <button v-on:click="register" class="btn mb-4">Register</button>
      <p class="text-center">
        <router-link to="/login" class="text-blue-500 hover:underline">Already Have Account? Login Here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      telephoneNumber: '',
      gender: '',
      birthday: ''
    }
  },
  methods: {
    register() {
      this.$router.push({name: "Login"});
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
.custom-radio {
  @apply h-4 w-4 rounded-full bg-gray-400 inline-block relative top-0.5 mr-2;
}
input[type="radio"]:checked + .custom-radio {
  @apply bg-black;
}
</style>