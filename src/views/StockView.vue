<template>
    <!-- Alla produkter -->
    <section class="p-4 mx-4">
        <!-- Search bar -->
        <SearchFilter parent="products" @find="searchProduct"/>

        <h2>Alla produkter</h2>

        <!-- All products -->
        <ProductsTable :shortcut="false" :search-term="product"/>
    </section>
</template>

<script setup>
    //Imports
    import { ref } from 'vue';
    import ProductsTable from '@/components/ProductsTable.vue';
    import SearchFilter from '@/components/SearchFilter.vue';

    //Reactive variables
    const product = ref("");

    //Sending search to child component
    const searchProduct = (searchTerm) => {
        product.value = searchTerm;
        return;
    }

</script>

<style scoped>
    
</style>