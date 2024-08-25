<template>
<div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow flex items-center justify-center">
        <h1 class="text-3xl font-bold">หน้าแรกของเว็บ</h1>
    </main>
</div>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
    name: "Home",
    components: {
        Navbar
    }
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
