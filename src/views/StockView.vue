<template>
    <!-- Alla produkter -->
    <section class="p-4 mx-4">
        <!-- Search bar -->
        <SearchFilter parent="products" @find="searchProduct"/>

        <!-- Buttons for filter and add -->
        <div class="container-float">
            <div class="row">
                <h2 class="col">Lager</h2>
                <img src="../assets/images/plus_icon.svg" class="col-1 p-1" title="Lägg till produkt" @click="toggleAddProduct">
                <img src="../assets/images/filter_icon.svg" class="col-1 p-1" title="Filtrera produkter" @click="toggleFilter">   
            </div>
        </div>

        <!-- Filters -->        
        <ProductsFilter v-if="displayFilters" class="my-4 pt-2 pb-3" :category-values="categorySelect" :label-values="labelSelect" @user-filters="filter"/>

        <!-- Form to add product -->
         <ProductForm v-if="displayAdd" class="my-4 pt-2 pb-3"/>

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
    import ProductForm from '@/components/ProductForm.vue';

    //Reactive variables
    const product = ref("");
    const displayFilters = ref(false);
    const displayAdd = ref(false);
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

    //Toggling filter
    const toggleFilter = () => {
        if(displayFilters.value === false) {
            displayFilters.value = true;
            displayAdd.value = false;
        } else {
            displayFilters.value = false;
        }
    }

    //Toggling add product
    const toggleAddProduct = () => {
        if(displayAdd.value === false) {
            displayAdd.value = true;
            displayFilters.value = false;
        } else {
            displayAdd.value = false;
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