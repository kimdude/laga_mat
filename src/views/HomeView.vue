<template>
    <!-- Genvägar -->
    <section class="p-4 mx-2">
        <h1 class="text-center mt-4">Välkommen!</h1>
        <p class="text-center mt-2 pb-4">Vad vill du göra? Ta en genväg:</p>
        <button class="btn btn-info d-block my-4 mx-auto">Sök produkt</button>
        <button class="btn btn-info d-block my-4 mx-auto">Sök inköp</button>
    </section>

    <!-- Innehåll uifrån val av genväg -->
    <section class="p-4 mx-4">
        <div id="shortcut">
            <ProductsTable :shortcut="true"/>
        </div>
    </section>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import ProductsTable from '@/components/ProductsTable.vue';

    //Emits
    const emits = defineEmits(['childCompLogin']);

    onMounted(() => {
        emits('childCompLogin', false);
    });
</script>

<style scoped>
    
</style>