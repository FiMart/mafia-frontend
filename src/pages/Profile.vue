<template>
<div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow flex items-center justify-center">
        <h1 class="text-3xl font-bold">หน้าโปรไฟล์</h1>
    </main>
</div>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
    name: "Profile",
    components: {
        Navbar
    }
}
</script>

<style scoped>

</style>
