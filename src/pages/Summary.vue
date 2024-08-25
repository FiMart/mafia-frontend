<template>
<div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow flex items-center justify-center">
        <h1 class="text-center text-4xl font-bold">{{ fundType }} Summary</h1>
    </main>
    <!-- Add your summary content here -->
</div>
</template>

    
<script>
import Navbar from '@/components/Navbar';
export default {
    components: {
        Navbar
    },
    props: {
        fundType: {
            type: String,
            required: true
        }
    }
};
</script>

    
<style scoped>
/* Add your styles here */
h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
}
</style>
