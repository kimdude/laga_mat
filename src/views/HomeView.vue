<template>
    <section>
        <h1 class="text-center mt-4">Välkommen!</h1>
        <p class="text-center mt-2 pb-4">Vad vill du göra? Ta en genväg:</p>
        <button class="btn btn-info d-block my-4 mx-auto">Sök produkt</button>
        <button class="btn btn-info d-block my-4 mx-auto">Sök inköp</button>
    </section>
    <section class="px-4">
        <div id="shortcut"></div>
    </section>
</template>

<script setup>
    import { onMounted } from 'vue';

    //Emits
    const emits = defineEmits(['childCompLogin']);

    onMounted(() => {
        emits('childCompLogin', false);
    });
</script>

<style scoped>
    
</style>