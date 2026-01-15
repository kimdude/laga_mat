<template>
    <!-- Alla beställningar -->
    <section class="p-4 mx-4">
        <SearchFilter parent="orders" @find="searchOrder"/>

        <h2>Alla inköp</h2>

        <OrderTable class="my-4" :searchTerm="order"/>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    import OrderTable from '@/components/OrderTable.vue';
    import SearchFilter from '@/components/SearchFilter.vue';

    const order = ref("");

    //Setting search term
    const searchOrder = (searchTerm) => {
        order.value = searchTerm;
        return;
    }
    
</script>

<style scoped>
    
</style>