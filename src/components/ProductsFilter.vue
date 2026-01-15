<template>
    <form class="form" @submit.prevent="filterList">
        <div class="px-4 py-2">
            <select v-model="categoryInp" class="form-select" id="categoryInp">
                <option disabled value="">Välj kategori</option>
                <option v-for="category in props.categoryValues" :value="category">{{ category }}</option>
            </select>
        </div>
        <div class="px-4 py-2">
            <select v-model="labelInp" class="form-select" id="labelInp">
                <option disabled value="">Välj märke</option>
                <option v-for="label in props.labelValues" :value="label">{{ label }}</option>
            </select>
        </div>
        <div class="px-4 py-2">
            <select v-model="statusInp" class="form-select" id="statusInp">
                <option disabled value="">Välj status</option>
                <option value="I lager">I lager</option>
                <option value="Slut">Slut</option>
                <option value="Beställd">Beställd</option>
            </select>
        </div>
        <button type="submit" class="btn btn-warning d-block mx-auto mt-4">Filtrera</button>
    </form>
</template>

<script setup>
    //Imports
    import { ref } from 'vue';

    //Props
    const props = defineProps({
        categoryValues: Array,
        labelValues: Array
    });

    //Emits
    const emit = defineEmits(["userFilters"]);

    //Reactive variables
    const categoryInp = ref("");
    const labelInp = ref("");
    const statusInp = ref("");

    //Sending filters to parent
    const filterList = () => {
        emit("userFilters", categoryInp.value, labelInp.value, statusInp.value);
    }
</script>

<style scoped>
    form {
        border-left: solid 5px #0dcaf0;
    }
</style>