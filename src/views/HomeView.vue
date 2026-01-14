<template>
    <!-- Genvägar -->
    <section class="p-4 mx-2">
        <h1 class="text-center mt-4">Välkommen!</h1>
        <p class="text-center mt-2 pb-4">Vad vill du göra? Ta en genväg:</p>

        <!-- Buttons to access shortcuts -->
        <button class="btn btn-info d-block my-4 mx-auto" @click="switchShortcut('searchProduct')">Sök produkt</button>
        <button class="btn btn-info d-block my-4 mx-auto" @click="switchShortcut('searchOrder')">Sök inköp</button>
    </section>

    <!-- Innehåll uifrån val av genväg -->
    <section class="p-4 mx-4">
        <div id="shortcut">
            <h2 class="mb-4">{{ title }}</h2>

            <!-- Search bar -->
            <SearchFilter v-if="displayed === 'searchProduct' || displayed === 'searchOrder'" :parent="searchFor" @find="search"/>

            <!-- Low stock products -->
            <ProductsTable :shortcut="true" :search-term="searchFor"/>
        </div>
    </section>
</template>

<script setup>
    //Imports
    import { ref, onMounted } from 'vue';
    import ProductsTable from '@/components/ProductsTable.vue';
    import SearchFilter from '@/components/SearchFilter.vue';

    //Emits
    const emits = defineEmits(['childCompLogin']);
    
    //Reactive variables
    const title = ref("Få i lager");
    const displayed = ref("lowStock");
    const searchFor = ref("");

    onMounted(() => {
        emits('childCompLogin', false);
    });

    //Sending search to child component
    const search = (searchTerm) => {

        if(displayed.value === "searchProduct") {
            console.log("Söker produkt..")
            searchFor.value = searchTerm;
            return;
        } else {
            console.log("under utveckling...")
        }
    }


    //Setting variables to switch between shortcuts
    const switchShortcut = (access) => {
        if(access === "searchProduct" && displayed.value !== "searchProduct") {
            title.value = "Sök produkt";
            displayed.value = "searchProduct";
            searchFor.value = "products";

        } else if(access === "searchOrder" && displayed.value !== "searchOrder") {
            title.value = "Sök inköp";
            displayed.value = "searchOrder";
            searchFor.value = "orders";

        } else {
            title.value = "Få i lager";
            displayed.value = "lowStock";
            searchFor.value = "";
        }
    }

</script>

<style scoped>
    
</style>