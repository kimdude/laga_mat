<template>
    <section>
        <h1>Välkommen!</h1>
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