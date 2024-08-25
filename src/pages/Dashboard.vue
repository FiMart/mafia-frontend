<template>
<div class="min-h-screen flex flex-col">
    <Navbar />
    <div class="flex-grow flex items-center justify-center">
        <div class="w-full max-w-7xl">
            <h1 class="text-3xl font-bold">ภาพรวมแดชบอร์ด</h1>
            <!-- Top section for the total value -->
            <FundCard :title="totalCard.title" :changePercentage="totalCard.changePercentage" :amount="totalCard.amount" :changeAmount="totalCard.changeAmount" :leftColor="totalCard.leftColor" cardSize="w-full h-32 mb-16" @card-clicked="handleCardClick" />

            <!-- Grid layout for 6 cards -->
            <div class="grid grid-cols-3 gap-8">
                <FundCard v-for="(card, index) in cards" :key="index" :title="card.title" :changePercentage="card.changePercentage" :amount="card.amount" :changeAmount="card.changeAmount" :leftColor="card.leftColor" cardSize="w-full h-32" @card-clicked="handleCardClick" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar';
import FundCard from '@/components/FundCard.vue';
import {
    useRouter,
    useRoute
} from 'vue-router';

export default {
    name: "Dashboard",
    components: {
        Navbar,
        FundCard
    },
    data() {
        return {
            totalCard: {
                title: 'Grand Total',
                changePercentage: 0.79,
                amount: 85668.00,
                changeAmount: 668.50,
                leftColor: 'bg-metal',
            },
            cards: [{
                    title: 'Mixed funds',
                    changePercentage: 2,
                    amount: 200000,
                    changeAmount: 4000,
                    leftColor: 'bg-green-500'
                },
                {
                    title: 'Equity funds',
                    changePercentage: -1,
                    amount: 150000,
                    changeAmount: -1500,
                    leftColor: 'bg-yellow-500'
                },
                {
                    title: 'Fixed Income funds',
                    changePercentage: 3,
                    amount: 300000,
                    changeAmount: 9000,
                    leftColor: 'bg-red-500'
                },
                {
                    title: 'Alternative Investments',
                    changePercentage: 4,
                    amount: 250000,
                    changeAmount: 10000,
                    leftColor: 'bg-purple-500'
                },
                {
                    title: 'Retirement Mutual funds',
                    changePercentage: -2,
                    amount: 100000,
                    changeAmount: -2000,
                    leftColor: 'bg-indigo-500'
                },
                {
                    title: 'Super Saving funds',
                    changePercentage: 1,
                    amount: 180000,
                    changeAmount: 1800,
                    leftColor: 'bg-pink-500'
                },
                {
                    title: 'Thailand ESG funds',
                    changePercentage: 1,
                    amount: 180000,
                    changeAmount: 1800,
                    leftColor: 'bg-midnight'
                },
                {
                    title: 'Money Market funds',
                    changePercentage: 1,
                    amount: 180000,
                    changeAmount: 1800,
                    leftColor: 'bg-bermuda'
                },
            ],
        };
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const handleCardClick = (cardTitle) => {
            const currentPath = route.fullPath;

            // If the current path starts with /summary, replace the path with the new fund type
            if (currentPath.startsWith('/summary')) {
                router.replace({
                    name: 'Summary',
                    params: {
                        fundType: cardTitle
                    }
                });
            } else {
                router.push({
                    name: 'Summary',
                    params: {
                        fundType: cardTitle
                    }
                });
            }
        };

        return {
            handleCardClick,
        };
    }
};
</script>
