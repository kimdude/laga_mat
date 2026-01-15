<template>
    <!-- Alla produkter -->
    <section class="p-4 mx-4">
        <!-- Search bar -->
        <SearchFilter parent="products" @find="searchProduct"/>

        <!-- Buttons for filter and add -->
        <div class="container-float">
            <div class="row">
                <h2 class="col">Lager</h2>
                <img src="../assets/images/plus_icon.svg" class="col-1 p-1" title="Lägg till produkt" @click="addProduct">
                <img src="../assets/images/filter_icon.svg" class="col-1 p-1" title="Filtrera produkter" @click="toggleFilter">   
            </div>
        </div>

        <!-- Filters -->        
        <ProductsFilter v-if="displayFilters" class="my-4" :category-values="categorySelect" :label-values="labelSelect" @user-filters="filter"/>

        <!-- All products -->
        <ProductsTable class="my-4":shortcut="false" :search-term="product" :filters="userFilter" @filter-options="createFilter"/>
    </section>
</template>

<script setup>
    //Imports
    import { ref } from 'vue';
    import ProductsTable from '@/components/ProductsTable.vue';
    import SearchFilter from '@/components/SearchFilter.vue';
    import ProductsFilter from '@/components/ProductsFilter.vue';

    //Reactive variables
    const product = ref("");
    const displayFilters = ref(false);
    const categorySelect = ref([]);
    const labelSelect = ref([]);
    const userFilter = ref({
        category: "",
        label: "",
        status: ""
    });

    //Sending search to child component
    const searchProduct = (searchTerm) => {
        product.value = searchTerm;
        return;
    }

    //Adding product
    const addProduct = () => {
        console.log("Lägg till produkt är under utveckling...");
    }

    //Filtering products
    const toggleFilter = () => {
        if(displayFilters.value === false) {
            displayFilters.value = true;
        } else {
            displayFilters.value = false
        }
    }

    //Setting filter values
    const createFilter = (categories, labels) => {
        categorySelect.value = categories.value;
        labelSelect.value = labels.value;
    }

    //Applying user filter
    const filter = (category, label, status) => {
        userFilter.value = { category, label, status }
        toggleFilter();
    }

</script>

<style scoped>
    img {
        width: 35px;
    }

    img:hover {
        cursor: pointer;
    }
</style>